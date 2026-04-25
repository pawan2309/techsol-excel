import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Users, Target, Shield } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    { name: 'Pawan', role: 'Founder & Principal Architect', color: '#00f2ff' },
    { name: 'Kunal', role: 'Co-Founder & Lead Engineer', color: '#7000ff' },
    { name: 'Rohit', role: 'Co-Founder & Strategy Lead', color: '#dab9ff' }
  ];

  return (
    <div style={{ background: '#131313', minHeight: '100vh', color: '#e5e2e1', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">

        {/* Header Section */}
        <div style={{ maxWidth: '800px', marginBottom: '6rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge"
            style={{ marginBottom: '1.5rem' }}
          >
            The Vision
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}
          >
            Engineering the <br />
            <span style={{ color: '#00f2ff' }}>Future of Digital</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: '#b9cacb', lineHeight: 1.6 }}
          >
            Techsol was founded with a singular mission: to bridge the gap between complex enterprise requirements and high-performance technological execution. We don't just build software; we architect ecosystems.
          </motion.p>
        </div>

        {/* Leadership Section */}
        <div style={{ marginBottom: '8rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Leadership <span style={{ color: '#7000ff' }}>Team</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass"
                style={{ padding: '3rem', borderRadius: '1.5rem', textAlign: 'center', border: `1px solid rgba(255,255,255,0.05)`, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`
                }} />
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={32} color={member.color} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                <p style={{ color: '#b9cacb', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connectivity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '4rem', borderRadius: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(0, 242, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={28} color="#00f2ff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>TECHSOL
                digital excellence</h3>
              <p style={{ color: '#b9cacb', lineHeight: 1.6 }}>Gurugram, Haryana <br />India, 122001</p>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '4rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Mail size={24} color="#7000ff" />
              <a href="mailto:techsol2026@gmail.com" style={{ color: '#e5e2e1', textDecoration: 'none', fontSize: '1.1rem' }}>techsol2026@gmail.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Send size={24} color="#7000ff" />
              <a href="https://t.me/techsol2026" target="_blank" rel="noopener noreferrer" style={{ color: '#e5e2e1', textDecoration: 'none', fontSize: '1.1rem' }}>@techsol2026</a>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
