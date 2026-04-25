import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Layers, Code, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: 1,
    title: 'Discovery & Strategy',
    description: 'Deep dive into your operational constraints, business goals, and current infrastructure to design a bulletproof roadmap.',
    icon: <Compass size={32} color="#00daf3" />
  },
  {
    id: 2,
    title: 'Architecture Design',
    description: 'Crafting highly scalable, fault-tolerant ecosystems mapping exact data flows, microservices, and security paradigms.',
    icon: <Layers size={32} color="#dab9ff" />
  },
  {
    id: 3,
    title: 'Agile Implementation',
    description: 'Surgical code execution with rigorous automated testing, CI/CD pipelines, and zero-downtime deployment strategies.',
    icon: <Code size={32} color="#00daf3" />
  },
  {
    id: 4,
    title: 'Global Scale & Optimization',
    description: 'Continuous monitoring, load balancing, and proactive AI-driven performance tuning for worldwide availability.',
    icon: <Globe size={32} color="#dab9ff" />
  }
];

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow line animation tracing down
      gsap.fromTo(lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Fade and slide in cards
      const cards = gsap.utils.toArray('.process-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      style={{ 
        padding: '120px 0', 
        background: '#0a0a0b', 
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span style={{ color: '#dab9ff' }}>Methodology</span></h2>
          <p style={{ color: '#cfc2d9', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            A rigorous, battle-tested approach to engineering enterprise digital transformation.
          </p>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Background vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateX(-50%)',
            zIndex: 0
          }}></div>
          
          {/* Animated glowing neon line */}
          <div ref={lineRef} style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #00daf3, #dab9ff)',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px rgba(0, 218, 243, 0.5)',
            zIndex: 1
          }}></div>

          {/* Process Steps */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={step.id} 
                  className="process-card"
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    marginBottom: '4rem',
                    gap: '3rem'
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ flex: 1, textAlign: isEven ? 'right' : 'left' }}
                  >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#fff' }}>
                      <span style={{ color: 'rgba(255,255,255,0.2)', marginRight: '10px', fontSize: '1.2rem' }}>0{step.id}</span>
                      {step.title}
                    </h3>
                    <p style={{ color: '#a398b0', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </motion.div>

                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#131315',
                    border: '2px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 3
                  }}>
                    {step.icon}
                  </div>

                  <div style={{ flex: 1 }}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
