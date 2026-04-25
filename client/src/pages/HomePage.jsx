import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, ArrowRight, Code, Shield, Activity, Database, CheckCircle } from 'lucide-react';
import HeroOrb from '../components/canvas/HeroOrb';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import TechStackMarquee from '../components/sections/TechStackMarquee';
import BrandLogo from '../components/layout/BrandLogo';

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
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{ width: '40px', height: '40px', background: 'rgba(0, 242, 255, 0.1)', border: '1px solid rgba(0, 242, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {i % 3 === 0 ? <CheckCircle size={18} color="#00f2ff" /> : <div style={{ width: '4px', height: '4px', background: '#00f2ff', borderRadius: '50%' }} />}
        </motion.div>
      ))}
    </div>
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '50%', border: '1px solid rgba(0, 242, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
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
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear',
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
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '80px', height: '80px', background: 'rgba(112, 0, 255, 0.1)', border: '1px solid rgba(112, 0, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
        >
          <Activity size={32} color="#7000ff" />
        </motion.div>
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '80px', height: '80px', background: 'rgba(112, 0, 255, 0.1)', border: '1px solid rgba(112, 0, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
        >
          <Database size={32} color="#7000ff" />
        </motion.div>
      </div>
    </div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Intro Animation (Runs once on load)
      tl.fromTo(".split-word",
        { opacity: 0, y: 30, rotationX: -20 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.15, ease: "back.out(1.5)", delay: 0.2 }
      );

      // 2. Scroll Animation (Controlled by user scroll)
      gsap.to(".split-word, .scroll-word", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          immediateRender: false // Crucial: don't capture initial opacity:0
        },
        opacity: 0,
        y: -100,
        rotationX: 45,
        stagger: 0.05,
        ease: "none"
      });

      // 3. Orb Fade
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

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="app" style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="hero" ref={heroRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-orb-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, willChange: 'transform, opacity' }}>
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
                <Link to="/services" className="btn btn-primary">
                  Explore Services <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Link>
                <Link to="/contact" className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' }}>
                  Get a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <TechStackMarquee />

        {/* Niche Expertise: Pharma Spotlight */}
        <section id="pharma" style={{ padding: '100px 0', background: '#0e0e0f' }}>
          <div className="container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span className="badge" style={{ marginBottom: '1.5rem' }}>Core Specialization</span>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Regulatory <span style={{ color: '#00f2ff' }}>Pharma</span> Publishing</h2>
              <p style={{ color: '#cfc2d9', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
                Precision-engineered submission systems for global pharmaceutical leaders. We automate complex regulatory workflows with 99.9% compliance accuracy.
              </p>
              <Link to="/services" style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Launching Soon <ArrowRight size={18} />
              </Link>
            </div>
            <div className="glass" style={{ flex: 1, minWidth: '300px', height: '400px', borderRadius: '1rem', border: '1px solid rgba(0, 218, 243, 0.2)', overflow: 'hidden' }}>
              <PharmaVisual />
            </div>
          </div>
        </section>

        {/* Niche Expertise: Sports Spotlight */}
        <section style={{ padding: '100px 0', background: '#131314' }}>
          <div className="container" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
            <div className="glass" style={{ flex: 1, minWidth: '300px', height: '400px', borderRadius: '1rem', border: '1px solid rgba(112, 0, 255, 0.2)', overflow: 'hidden' }}>
              <SportsVisual />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span className="badge" style={{ marginBottom: '1.5rem' }}>Data Engineering</span>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Real-Time <span style={{ color: '#7000ff' }}>Sports</span> APIs</h2>
              <p style={{ color: '#cfc2d9', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
                Ultra-low latency data pipelines for real-time sports analytics. We handle millions of events per second with sub-50ms propagation.
              </p>
              <Link to="/services" style={{ color: '#7000ff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Contact for API <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <ProcessTimeline />
      </div>
    </ReactLenis>
  );
};

export default HomePage;
