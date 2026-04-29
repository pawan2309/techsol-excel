import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, ArrowRight, Code, Shield, Activity, Database, CheckCircle } from 'lucide-react';
import HeroOrb from '../components/canvas/HeroOrb';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import TechStackMarquee from '../components/sections/TechStackMarquee';
import ExpertiseGrid from '../components/sections/ExpertiseGrid';
import ContactSection from '../components/sections/ContactSection';
import BrandLogo from '../components/layout/BrandLogo';
import Seo from '../components/seo/Seo';

// --- Visual Components ---
const PharmaVisual = () => (
  <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.1) 0%, transparent 70%)' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '2rem' }}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: (i % 3) * 0.3,
            ease: 'easeInOut'
          }}
          style={{ width: '40px', height: '40px', background: 'rgba(0, 242, 255, 0.1)', border: '1px solid rgba(0, 242, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', willChange: 'opacity, transform' }}
        >
          {i % 3 === 0 ? <CheckCircle size={18} color="#00f2ff" /> : <div style={{ width: '4px', height: '4px', background: '#00f2ff', borderRadius: '50%' }} />}
        </motion.div>
      ))}
    </div>
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '50%', border: '1px solid rgba(0, 242, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', willChange: 'transform' }}
    >
      <Shield size={48} color="#00f2ff" />
    </motion.div>
  </div>
);

const SportsVisual = () => (
  <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(112, 0, 255, 0.1) 0%, transparent 70%)' }} />
    <div style={{ position: 'relative', width: '250px', height: '150px' }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 200, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 20}%`,
            left: 0,
            width: '40px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #7000ff)',
          }}
        />
      ))}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '1rem' }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '80px', height: '80px', background: 'rgba(112, 0, 255, 0.1)', border: '1px solid rgba(112, 0, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', willChange: 'transform' }}
        >
          <Activity size={32} color="#7000ff" />
        </motion.div>
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '80px', height: '80px', background: 'rgba(112, 0, 255, 0.1)', border: '1px solid rgba(112, 0, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', willChange: 'transform' }}
        >
          <Database size={32} color="#7000ff" />
        </motion.div>
      </div>
    </div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://techsol.me').replace(/\/$/, '');

const HOME_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Techsol',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: 'techsol2026@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    sameAs: ['https://t.me/techsol2026'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Techsol',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/services`,
      'query-input': 'required name=service',
    },
  },
];

const HomePage = ({ onReady }) => {
  const heroRef = useRef();
  const location = useLocation();
  const nichesWrapperRef = useRef();
  const nichesContainerRef = useRef();

  useEffect(() => {
    if (location.hash === '#services') {
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (onReady) onReady();

    // Config for mobile stability
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Refresh GSAP on resize
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 900px)", () => {
      const wrapper = nichesWrapperRef.current;
      const container = nichesContainerRef.current;

      if (wrapper && container) {
        // Use a small timeout to ensure layout has settled
        const timer = setTimeout(() => {
          const totalScroll = container.scrollWidth - window.innerWidth;
          
          if (totalScroll > 0) {
            gsap.to(container, {
              x: -totalScroll,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: () => `+=${totalScroll}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }
            });
          }
          ScrollTrigger.refresh();
        }, 500);

        return () => clearTimeout(timer);
      }
    });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Intro Animation
      tl.fromTo(".split-word",
        { opacity: 0, y: 30, rotationX: -20 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.15, ease: "back.out(1.5)", delay: 0.2 }
      );

      // Hero Scroll Animation
      gsap.to(".split-word, .scroll-word", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          immediateRender: false
        },
        opacity: 0,
        y: -100,
        rotationX: 45,
        stagger: 0.05,
        ease: "none"
      });

      // Orb Fade
      gsap.to(".hero-orb-wrapper", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "center top",
          scrub: true
        },
        opacity: 0
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
      window.removeEventListener('resize', refresh);
    };
  }, [onReady]);

  return (
    <>
      <Seo
        title="Techsol Digital Excellence | Web, Cloud, AI and APIs"
        description="Techsol builds high-performance distributed systems, regulatory-grade pharma platforms, and real-time sports APIs for scale-focused teams."
        path="/"
        structuredData={HOME_STRUCTURED_DATA}
      />
      <div className="app" style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="hero" ref={heroRef} style={{ height: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-orb-wrapper unzoom-orb" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, willChange: 'transform, opacity' }}>
            <HeroOrb />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '900px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
              >
              </motion.div>

              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '2rem', perspective: '1000px' }}>
                <span className="split-word" style={{ display: 'inline-block' }}>Accelerating</span> <br />
                <span className="split-word" style={{ display: 'inline-block', color: '#00f2ff' }}>Digital</span> <br />
                <span className="split-word" style={{ display: 'inline-block', color: '#7000ff' }}>Excellence</span>
              </h1>

              <p className="scroll-word" style={{ fontSize: '1.25rem', color: '#b9cacb', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
                We build high-performance distributed systems, regulatory-grade pharma platforms, and Real-Time sports data APIs.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary">
                  Explore Services <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' }}>
                  Get a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechStackMarquee />

        {/* Services Section */}
        <ExpertiseGrid id="services" />

        {/* Niches: Horizontal Scroll on Mobile, Normal on Desktop */}
        <div className="niches-wrapper" ref={nichesWrapperRef} style={{ position: 'relative', background: '#0e0e0f', overflow: 'hidden' }}>
          <div className="niches-horizontal-container" ref={nichesContainerRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
            {/* Niche Expertise: Pharma Spotlight */}
            <section id="pharma" className="niche-section pharma-card" style={{ padding: '60px 0', flexShrink: 0 }}>
              <div className="container niche-container">
                <div className="niche-content">
                  <span className="badge" style={{ marginBottom: '1rem', background: 'rgba(0, 242, 255, 0.1)', color: '#00f2ff' }}>Core Specialization</span>
                  <h2 className="niche-title">Regulatory <span style={{ color: '#00f2ff' }}>Pharma</span> Publishing</h2>
                  <p className="niche-text">
                    Precision-engineered submission systems for global pharmaceutical leaders. We automate complex regulatory workflows.
                  </p>
                  <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    Launching Soon <ArrowRight size={18} />
                  </a>
                </div>
                <div className="glass niche-visual" style={{ border: '1px solid rgba(0, 242, 255, 0.2)' }}>
                  <PharmaVisual />
                </div>
              </div>
            </section>

            {/* Niche Expertise: Sports Spotlight */}
            <section id="sports" className="niche-section sports-card" style={{ padding: '60px 0', flexShrink: 0 }}>
              <div className="container niche-container">
                <div className="niche-content">
                  <span className="badge" style={{ marginBottom: '1rem', background: 'rgba(112, 0, 255, 0.1)', color: '#7000ff' }}>Data Engineering</span>
                  <h2 className="niche-title">Real-Time <span style={{ color: '#7000ff' }}>Sports</span> APIs</h2>
                  <p className="niche-text">
                    Ultra-low latency data pipelines for real-time sports analytics. We handle millions of events per second.
                  </p>
                  <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: '#7000ff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    Contact for API <ArrowRight size={18} />
                  </a>
                </div>
                <div className="glass niche-visual" style={{ border: '1px solid rgba(112, 0, 255, 0.2)' }}>
                  <SportsVisual />
                </div>
              </div>
            </section>
          </div>
        </div>

        <ProcessTimeline />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
