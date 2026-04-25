import React, { useEffect } from 'react';
import WgbHeader from './WgbHeader';
import WgbHero from './WgbHero';
import WgbChallenges from './WgbChallenges';
import WgbTrustEngine from './WgbTrustEngine';
import WgbFooter from './WgbFooter';
import './wgb-styles.css';

const WgbAgencyPage = () => {
  // Use Lenis for smooth scrolling if it exists globally, otherwise we could initialize it here
  // For now, we rely on the CSS and Framer Motion

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wgb-page">
      <WgbHeader />
      <WgbHero />
      <WgbChallenges />
      <WgbTrustEngine />
      <WgbFooter />
    </div>
  );
};

export default WgbAgencyPage;
