import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import ExpertiseGrid from '../components/sections/ExpertiseGrid';

const ServicesPage = () => {
  // Kill lingering ScrollTriggers from other pages on mount
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div style={{ background: '#131313', minHeight: '100vh', color: '#e5e2e1' }}>
        {/* ── Services Section ── */}
        <div style={{ paddingTop: '80px' }}>
          <ExpertiseGrid />
        </div>
      </div>
    </ReactLenis>
  );
};

export default ServicesPage;
