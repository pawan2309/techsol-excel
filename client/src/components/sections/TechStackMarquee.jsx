import React, { useRef } from 'react';
import { Database, Server, Hexagon, CloudCog, ShieldCheck, Box, Workflow, MonitorPlay, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const technologies = [
  { name: 'Distributed Systems', icon: <Hexagon size={24} color="#00daf3" /> },
  { name: 'Cloud-Native Infrastructure', icon: <CloudCog size={24} color="#dab9ff" /> },
  { name: 'Real-Time Data Streams', icon: <Database size={24} color="#00daf3" /> },
  { name: 'Scalable Microservices', icon: <Server size={24} color="#dab9ff" /> },
  { name: 'Interactive 3D Experiences', icon: <MonitorPlay size={24} color="#00daf3" /> },
  { name: 'Automated CI/CD Pipelines', icon: <Workflow size={24} color="#dab9ff" /> },
  { name: 'Zero-Trust Security Models', icon: <ShieldCheck size={24} color="#00daf3" /> },
  { name: 'Edge Computing', icon: <Cpu size={24} color="#dab9ff" /> },
];

const TechStackMarquee = () => {
  const containerRef = useRef(null);
  
  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Starts when top enters viewport, ends when bottom leaves
  });

  // Map scroll progress (0 to 1) to horizontal movement (0% to -50%)
  // -50% works because we duplicate the items once, so -50% means it scrolled exactly one full set.
  const xBase = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  // Apply spring for smooth interpolation
  const x = useSpring(xBase, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <section 
      ref={containerRef}
      style={{ 
        background: '#0e0e0f', 
        padding: '40px 0', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <style>
        {`
          .marquee-container {
            display: flex;
            width: fit-content;
            cursor: grab;
          }
          .marquee-container:active {
            cursor: grabbing;
          }
          .tech-badge {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 1rem 2rem;
            margin: 0 1rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 50px;
            backdrop-filter: blur(10px);
            white-space: nowrap;
            font-weight: 500;
            color: #cfc2d9;
            transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
            user-select: none;
            will-change: transform, box-shadow;
          }
          .tech-badge:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(0, 218, 243, 0.5);
            color: #fff;
            box-shadow: 0 0 20px rgba(0, 218, 243, 0.2);
            transform: translateY(-2px);
          }
          .marquee-fade-left {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 150px;
            background: linear-gradient(to right, #0e0e0f, transparent);
            z-index: 10;
            pointer-events: none;
          }
          .marquee-fade-right {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 150px;
            background: linear-gradient(to left, #0e0e0f, transparent);
            z-index: 10;
            pointer-events: none;
          }
          .marquee-row-2 {
            display: none;
          }
        `}
      </style>

      <div className="marquee-fade-left"></div>
      
      {/* Scroll-driven horizontal motion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        <motion.div 
          className="marquee-container"
          style={{ x }}
        >
          {/* Row 1: Even items */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={`r1-${index}`} className="tech-badge">
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]) }}
          className="marquee-container marquee-row-2"
        >
          {/* Row 2: Shifted by 4 items so it shows different content than Row 1 */}
          {[...technologies.slice(4), ...technologies.slice(0, 4), ...technologies.slice(4), ...technologies.slice(0, 4)].map((tech, index) => (
            <div key={`r2-${index}`} className="tech-badge">
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="marquee-fade-right"></div>
    </section>
  );
};

export default TechStackMarquee;
