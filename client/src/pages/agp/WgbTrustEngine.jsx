import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WgbTrustEngine = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <section className="wgb-trust-engine" style={{ position: 'sticky', top: '10vh', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
          <div className="wgb-badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
            The Solution
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '1rem 0' }}>
            The Trust Engine
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
            A holistic ecosystem designed to turn strangers into high-paying clients through compounding trust.
          </p>
        </div>

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Card 1: Content */}
          <motion.div 
            style={{ 
              position: 'absolute',
              background: '#111', 
              padding: '3rem', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              width: '100%',
              maxWidth: '600px',
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.3], [0, -50]),
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.95]),
            }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--wgb-primary)', marginBottom: '1rem' }}>01. Content</h3>
            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6 }}>
              We build your authority on LinkedIn with high-leverage content that educates your market, shifts their beliefs, and positions you as the undeniable category leader.
            </p>
          </motion.div>

          {/* Card 2: Ads */}
          <motion.div 
            style={{ 
              position: 'absolute',
              background: '#111', 
              padding: '3rem', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              width: '100%',
              maxWidth: '600px',
              opacity: useTransform(scrollYProgress, [0.2, 0.35, 0.55, 0.65], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.2, 0.35, 0.65], [50, 0, -50]),
              scale: useTransform(scrollYProgress, [0.2, 0.35, 0.65], [0.95, 1, 0.95]),
            }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--wgb-primary)', marginBottom: '1rem' }}>02. Ads</h3>
            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6 }}>
              We amplify your best content and offers to your exact Ideal Customer Profile using highly targeted LinkedIn & Meta ad campaigns, ensuring you stay top-of-mind.
            </p>
          </motion.div>

          {/* Card 3: Outbound */}
          <motion.div 
            style={{ 
              position: 'absolute',
              background: '#111', 
              padding: '3rem', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              width: '100%',
              maxWidth: '600px',
              opacity: useTransform(scrollYProgress, [0.55, 0.7, 1], [0, 1, 1]),
              y: useTransform(scrollYProgress, [0.55, 0.7], [50, 0]),
              scale: useTransform(scrollYProgress, [0.55, 0.7], [0.95, 1]),
            }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--wgb-primary)', marginBottom: '1rem' }}>03. Outbound</h3>
            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Once trust is established and intent is shown, we use personalized, value-driven outbound infrastructure to start conversations and book qualified meetings.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WgbTrustEngine;
