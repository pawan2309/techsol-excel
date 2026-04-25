import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WgbHero = () => {
  return (
    <section className="wgb-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="wgb-badge">B2B Growth Agency</div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Engineering predictable <br />
        <span style={{ color: 'var(--wgb-primary)' }}>B2B growth</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        We help founders generate trust & revenue through our holistic Trust Engine: Content, Ads & Outbound.
      </motion.p>
      
      <motion.div 
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <button className="wgb-button">
          Book a call <ArrowRight size={16} />
        </button>
        <button className="wgb-button secondary">
          See our work
        </button>
      </motion.div>
    </section>
  );
};

export default WgbHero;
