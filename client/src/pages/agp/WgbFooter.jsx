import React from 'react';
import { ArrowRight } from 'lucide-react';

const WgbFooter = () => {
  return (
    <footer className="wgb-footer">
      <div style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '2rem' }}>
          Ready to engineer predictable growth?
        </h2>
        <button className="wgb-button" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          Book a Discovery Call <ArrowRight size={20} />
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
        <div className="wgb-logo" style={{ marginBottom: '1rem' }}>WGB ✦</div>
        <div style={{ color: '#888', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} WGB Agency. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>LinkedIn</a>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default WgbFooter;
