import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SplashLoader from './components/layout/SplashLoader';
import './index.css';

// Lazy loaded routes for code-splitting (Fixes the >500kb bundle warning)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const WgbAgencyPage = lazy(() => import('./pages/agp/WgbAgencyPage'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Global Smooth Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease-out curve
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', opacity: isLoading ? 0 : 1 }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ height: '100vh', background: '#131314' }}></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/agp" element={<WgbAgencyPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
