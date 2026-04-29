import React from 'react';
import BrandLogo from './BrandLogo';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '1.5rem 0', 
      background: '#0a0a0b', 
      borderTop: '1px solid rgba(255,255,255,0.03)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem' 
      }}>
        <BrandLogo height="24px" id="footer-logo" />
        <div style={{ 
          color: '#666', 
          fontSize: '0.75rem', 
          letterSpacing: '0.05em'
        }}>
          © 2026 Techsol Digital Excellence.<br />All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
