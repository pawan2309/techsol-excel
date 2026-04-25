import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Users } from 'lucide-react';

const challenges = [
  {
    icon: <TrendingDown size={32} color="var(--wgb-primary)" />,
    title: "Unpredictable Revenue",
    description: "Relying on referrals and word-of-mouth makes it impossible to scale with confidence or forecast growth."
  },
  {
    icon: <Users size={32} color="var(--wgb-primary)" />,
    title: "Low Trust & Authority",
    description: "Your ideal prospects don't know who you are. Your content isn't positioning you as the category leader."
  },
  {
    icon: <AlertCircle size={32} color="var(--wgb-primary)" />,
    title: "Inefficient Acquisition",
    description: "Burning cash on ads that don't convert and outreach that gets ignored because of poor positioning."
  }
];

const WgbChallenges = () => {
  return (
    <section className="wgb-section" style={{ backgroundColor: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
          The B2B Growth Problem
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Most B2B companies struggle to build a predictable engine for acquiring high-value clients.
        </p>
      </div>

      <div className="wgb-challenges-grid">
        {challenges.map((challenge, index) => (
          <motion.div 
            key={index} 
            className="wgb-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div style={{ marginBottom: '1.5rem' }}>{challenge.icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{challenge.title}</h3>
            <p style={{ color: '#555', lineHeight: 1.6 }}>{challenge.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WgbChallenges;
