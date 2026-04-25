import React from 'react';
import { ArrowRight } from 'lucide-react';

const WgbHeader = () => {
  return (
    <header className="wgb-header">
      <div className="wgb-logo">WGB ✦</div>
      <nav className="wgb-nav" style={{ display: 'none' }}>
        {/* Hiding nav items on mobile by default for simplicity, can make responsive later */}
        <a href="#services">Services</a>
        <a href="#results">Results</a>
        <a href="#about">About</a>
      </nav>
      <div className="wgb-nav" style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#services" style={{ display: 'none' }} className="desktop-link">Services</a>
        <a href="#results" style={{ display: 'none' }} className="desktop-link">Results</a>
        <a href="#about" style={{ display: 'none' }} className="desktop-link">About</a>
        <button className="wgb-button" style={{ marginLeft: '2rem' }}>
          Talk to us <ArrowRight size={16} />
        </button>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .desktop-link {
            display: inline-block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default WgbHeader;
