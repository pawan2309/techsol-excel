import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

const DNATheme = () => {
  const group = useRef();
  const { mouse } = useThree();
  
  const particleCount = 24;
  const helixRadius = 1.8;
  const helixHeight = 8;
  const step = 0.5;

  // Pre-calculate positions for performance
  const strands = useMemo(() => {
    const s1 = [];
    const s2 = [];
    const bridges = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = i * step;
      const y = (i / particleCount) * helixHeight - helixHeight / 2;
      
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;

      s1.push({ pos: [x1, y, z1], id: `s1-${i}` });
      s2.push({ pos: [x2, y, z2], id: `s2-${i}` });
      
      if (i % 2 === 0) {
        bridges.push({ 
            pos: [0, y, 0], 
            rot: [0, -angle, Math.PI / 2], 
            scale: [1, helixRadius * 2, 1],
            id: `b-${i}` 
        });
      }
    }
    return { s1, s2, bridges };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (group.current) {
      // Constant elegant rotation
      group.current.rotation.y += delta * 0.25;
      
      // Interactive Parallax
      const targetRotationX = mouse.y * 0.2;
      const targetRotationZ = -mouse.x * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotationZ, 0.05);
    }
  });

  return (
    <group ref={group}>
      {/* Strand 1: Refractive Glass Crystals */}
      {strands.s1.map((p) => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <MeshTransmissionMaterial 
            backside
            samples={2}
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#00daf3"
            emissive="#00daf3"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Strand 2: Violet Core Crystals */}
      {strands.s2.map((p) => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <MeshTransmissionMaterial 
            backside
            samples={2}
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#dab9ff"
            emissive="#8f00ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Data Bridges: Cyber-organic connecting bars */}
      {strands.bridges.map((b) => (
        <mesh key={b.id} position={b.pos} rotation={b.rot} scale={b.scale}>
          <cylinderGeometry args={[0.03, 0.03, 1, 12]} />
          <MeshDistortMaterial 
            speed={2} 
            distort={0.2} 
            radius={1} 
            color="#4d4356" 
            emissive="#00daf3" 
            emissiveIntensity={0.15}
            transparent
            opacity={0.8}
            roughness={0}
          />
        </mesh>
      ))}
    </group>
  );
};

const DNAHelix = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}>
      <Canvas 
        camera={{ position: [0, 0, 7.5], fov: 40 }} 
        dpr={1} 
        performance={{ min: 0.5 }}
        gl={{ 
            antialias: false,
            toneMapping: THREE.ReinhardToneMapping,
            outputEncoding: THREE.sRGBEncoding
        }}
      >
        <color attach="background" args={['#1c1b1c']} />
        
        {/* Cinematic Ambient Atmosphere */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00daf3" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8f00ff" />
        
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <DNATheme />
        </Float>

        {/* Cinematic Post-Processing Pass */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.2} 
            radius={0.4} 
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default DNAHelix;
