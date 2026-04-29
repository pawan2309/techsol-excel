import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SplashLoader from './components/layout/SplashLoader';
import './index.css';
import './mobile.css';

gsap.registerPlugin(ScrollTrigger);

// Lazy loaded routes for code-splitting (Fixes the >500kb bundle warning)
const HomePage = lazy(() => import('./pages/HomePage'));
// ServicesPage removed as it is now integrated into HomePage
const AboutPage = lazy(() => import('./pages/AboutPage'));
// ContactPage removed as it is now integrated into HomePage
const WgbAgencyPage = lazy(() => import('./pages/agp/WgbAgencyPage'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const location = useLocation();
  const disableGlobalSmoothScroll = location.pathname === '/contact-old-path'; // Placeholder if needed
  const hideFooter = false;

  // Initialize Global Smooth Scrolling with Lenis
  useEffect(() => {
    if (disableGlobalSmoothScroll) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease-out curve
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, [disableGlobalSmoothScroll]);

  // Refresh ScrollTrigger when content is ready
  useEffect(() => {
    if (isContentReady) {
      // Wait a bit for the loader fade-out and initial layout to settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isContentReady]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashLoader 
            key="loader" 
            isReady={isContentReady} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      <div
        className="app-content-wrapper"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out'
        }}
      >
        <Navbar />
        <div style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ height: '100vh', background: '#131314' }}></div>}>
            <Routes>
              <Route path="/" element={<HomePage onReady={() => setIsContentReady(true)} />} />
              <Route path="/services" element={<Navigate to="/#services" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="/agp" element={<WgbAgencyPage />} />
            </Routes>
          </Suspense>
        </div>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

export default App;
