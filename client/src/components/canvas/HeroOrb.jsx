import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const group = useRef();
  const pointsRef = useRef();
  const { clock } = useThree();

  const particleCount = 4500;
  
  const [positions, origPositions, velocities] = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const orig = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      let u = Math.random();
      let v = Math.random();
      let theta = 2 * Math.PI * u;
      let phi = Math.acos(2 * v - 1);
      
      let r = (2 + 3 * Math.cbrt(Math.random())); // radius 2 to 5
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);

      p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = z;
      orig[i * 3] = x; orig[i * 3 + 1] = y; orig[i * 3 + 2] = z;
      vel[i * 3] = 0; vel[i * 3 + 1] = 0; vel[i * 3 + 2] = 0;
    }
    return [p, orig, vel];
  }, []);

  // Pre-allocate math objects to memory to entirely avoid browser Garbage Collection stutter bugs during mouse movement
  const localRay = useMemo(() => new THREE.Ray(), []);
  const inverseMatrix = useMemo(() => new THREE.Matrix4(), []);
  const vParticle = useMemo(() => new THREE.Vector3(), []);
  const vClosest = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    
    if (group.current) {
        // Slow rotation physics on the particle cloud
        group.current.rotation.y += delta * 0.1;
        group.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
        group.current.updateMatrixWorld();
        
        // TRUE 3D MOUSE MAPPING API:
        // Convert the 2D mouse position off the screen into a 3D line-of-sight laser in World Space
        state.raycaster.setFromCamera(state.mouse, state.camera);
        // Invert that laser into the local space of the rotating group, so tracking is completely 1:1 pixel perfect
        inverseMatrix.copy(group.current.matrixWorld).invert();
        localRay.copy(state.raycaster.ray).applyMatrix4(inverseMatrix);
    }

    if (pointsRef.current) {
       const positionsAttribute = pointsRef.current.geometry.attributes.position;
       const posArray = positionsAttribute.array;

       for(let i = 0; i < particleCount; i++) {
           const i3 = i * 3;
           
           let px = posArray[i3]; let py = posArray[i3 + 1]; let pz = posArray[i3 + 2];
           let ox = origPositions[i3]; let oy = origPositions[i3 + 1]; let oz = origPositions[i3 + 2];

           // Perfect pixel-accurate distance to mouse pointer line-of-sight via 3D Raycasting
           vParticle.set(px, py, pz);
           let distSq = localRay.distanceSqToPoint(vParticle);

           // MAGNETIZE PHYSICS
           let pullRadius = 3.0; // Magnet field size
           if (distSq < pullRadius) {
               // Find the exact mathematical coordinate on the laser-pointer ray closest to this specific particle
               localRay.closestPointToPoint(vParticle, vClosest);
               
               let force = (pullRadius - distSq) / pullRadius;
               // Physically pull the particle perfectly onto the mouse ray from wherever it is in 3D (-dx, -dy, -dz)
               velocities[i3] -= (px - vClosest.x) * force * 0.04;
               velocities[i3+1] -= (py - vClosest.y) * force * 0.04;
               velocities[i3+2] -= (pz - vClosest.z) * force * 0.04;
           }

           // Universal Spring force (pulls particles back to their original mathematical constellation structure)
           velocities[i3] += (ox - px) * 0.02;
           velocities[i3+1] += (oy - py) * 0.02;
           velocities[i3+2] += (oz - pz) * 0.02;

           // Universal Friction to prevent infinite bouncing
           velocities[i3] *= 0.88;
           velocities[i3+1] *= 0.88;
           velocities[i3+2] *= 0.88;

           // Apply momentum to final XYZ geometry
           posArray[i3] += velocities[i3];
           posArray[i3+1] += velocities[i3+1];
           posArray[i3+2] += velocities[i3+2];
       }

       // Instruct graphic card to render new position buffer
       positionsAttribute.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#dab9ff" 
          size={0.035} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          opacity={0.8} 
        />
      </Points>
      {/* Central optical glow core */}
      <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial color="#00daf3" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const HeroOrb = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 1.2, 8], fov: 75 }} dpr={1} performance={{ min: 0.5 }}>
        <fog attach="fog" args={['#131314', 5, 20]} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};

export default HeroOrb;
