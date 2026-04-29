import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Code,
  Shield,
  Activity,
  Layers,
  Globe,
  Zap,
  Network
} from 'lucide-react';

const SERVICES = [
  {
    id: 'web',
    title: 'Web & App Development',
    description: 'Engineering high-performance digital ecosystems with react-native precision and low-latency architecture for global scaling.',
    icon: <Code size={64} color="#00f2ff" />,
    color: '#00f2ff',
    visual: 'grid'
  },
  {
    id: 'fintech',
    title: 'Payment & Fintech',
    description: 'Securing the future of commerce through distributed ledger integration and encrypted payment gateways for mission-critical finance.',
    icon: <Shield size={64} color="#dab9ff" />,
    color: '#dab9ff',
    visual: 'waves'
  },
  {
    id: 'sports',
    title: 'Sports Data API',
    description: 'Ultra-low latency data pipelines for real-time sports analytics. We handle millions of events per second with sub-50ms propagation.',
    icon: <Activity size={64} color="#00f2ff" />,
    color: '#00f2ff',
    visual: 'pulses'
  },
  {
    id: 'pharma',
    title: 'Pharma Publishing',
    description: 'Precision-engineered submission systems for global pharmaceutical leaders. 99.9% compliance accuracy for regulatory workflows.',
    icon: <Layers size={64} color="#dab9ff" />,
    color: '#dab9ff',
    visual: 'nodes'
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Architecting resilient, multi-region cloud environments with automated failover and zero-downtime deployment strategies.',
    icon: <Globe size={64} color="#00f2ff" />,
    color: '#00f2ff',
    visual: 'grid'
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    description: 'Transforming raw data into actionable intelligence with custom machine learning models and predictive analytics engines.',
    icon: <Zap size={64} color="#dab9ff" />,
    color: '#dab9ff',
    visual: 'nodes'
  },
  {
    id: 'security',
    title: 'Cyber Security',
    description: 'Proactive threat detection and vulnerability management to safeguard your enterprise assets in a hostile digital landscape.',
    icon: <Shield size={64} color="#00f2ff" />,
    color: '#00f2ff',
    visual: 'pulses'
  },
  {
    id: 'consulting',
    title: 'Digital Strategy',
    description: 'Guided transformation roadmaps to navigate complex technological shifts and maintain your competitive edge.',
    icon: <Network size={64} color="#dab9ff" />,
    color: '#dab9ff',
    visual: 'waves'
  }
];

// Reusable Background Visuals
const CardVisual = ({ type, color, isInView }) => {
  if (type === 'grid') {
    return (
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: '40px 40px', backgroundPosition: 'center center', transform: 'perspective(500px) rotateX(60deg) scale(2) translateY(-100px)', zIndex: 0 }} />
    );
  }
  if (type === 'waves') {
    return (
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
        <motion.div
          animate={isInView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ width: '150%', height: '150%', background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`, borderRadius: '50%', boxShadow: `inset 0 0 100px ${color}` }}
        />
      </div>
    );
  }
  if (type === 'pulses') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={isInView ? { scale: [1, 3], opacity: [0.2, 0] } : { scale: 1, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
            style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: `2px solid ${color}` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', right: '10%', top: '20%', width: '300px', height: '300px', background: `radial-gradient(circle, ${color}30 0%, transparent 60%)`, zIndex: 0 }} />
  );
};

const ServiceCard = ({ service, index, progress, range, targetScale }) => {
  const container = useRef(null);
  
  // Track if this specific card's container is in the viewport to pause expensive animations when hidden
  const isInView = useInView(container, { margin: "100px 0px 100px 0px" });
  
  // We use the scroll progress to scale down the card as the next ones stack on top
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="service-card-wrapper" style={{
      position: 'sticky',
      top: 0,
      willChange: 'transform'
    }}>
      <motion.div 
        className="service-card-container"
        style={{
          scale,
          top: `${index * 30}px`,
          position: 'relative',
          maxWidth: '1200px',
          borderRadius: '2rem',
          transformOrigin: 'top',
          background: '#151516',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 -20px 50px -10px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          willChange: 'transform, opacity'
        }}
      >
        <CardVisual type={service.visual} color={service.color} isInView={isInView} />
        
        {/* Dynamic Glow - Optimized without CSS blur */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${service.color}15 0%, ${service.color}05 30%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="service-card-inner" style={{ position: 'relative', zIndex: 10 }}>
          
          {/* Left: Huge Icon & ID */}
          <div className="service-card-left">
            <motion.div 
              className="service-icon-box"
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                width: '160px',
                height: '160px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: `inset 0 0 30px ${service.color}20`
              }}
            >
              {service.icon}
            </motion.div>
            <div style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>
              0{index + 1} // {service.id.toUpperCase()}
            </div>
          </div>

          {/* Right: Content */}
          <div className="service-card-right">
            <h2 style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              lineHeight: 1.1, 
              marginBottom: '2rem', 
              color: '#fff', 
              fontWeight: '600',
              letterSpacing: '-0.03em' 
            }}>
              {service.title}
            </h2>
            <p style={{ 
              fontSize: '1.5rem', 
              lineHeight: 1.6, 
              color: '#a398b0', 
              maxWidth: '600px',
              fontWeight: '400'
            }}>
              {service.description}
            </p>
            
            <motion.div 
              whileHover={{ x: 10 }}
              style={{ 
                marginTop: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                color: service.color,
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              EXPLORE SOLUTION <div style={{ width: '40px', height: '2px', background: service.color }} />
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

const ExpertiseGrid = ({ id, compact = false, scrollContainerRef }) => {
  const container = useRef(null);
  
  // Track scroll progress through the entire component
  const { scrollYProgress } = useScroll({
    ...(scrollContainerRef ? { container: scrollContainerRef } : {}),
    target: container,
    offset: ['start start', 'end end']
  });

  // Spring physics for smooth scroll progress interpolation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div id={id} style={{ background: '#0e0e10', paddingBottom: compact ? '8vh' : '20vh' }}>
      {/* Intro Header */}
      <div
        style={{
          padding: compact ? '3.5rem 2rem 2.25rem' : '100px 2rem 15vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1, color: '#fff', fontWeight: '600', letterSpacing: '-0.04em' }}>
            Our <span style={{ color: 'rgba(255,255,255,0.2)' }}>Services</span>
          </h1>
          <p style={{ marginTop: '2rem', color: '#859399', fontSize: '1.3rem', maxWidth: '600px', margin: '2rem auto 0' }}>
            Specialised practice areas engineered for enterprise-scale impact — transforming complex technical challenges into robust, high-performance digital solutions.
          </p>
        </motion.div>
      </div>

      {/* The Stacking Cards Container */}
      <div ref={container} style={{ position: 'relative' }}>
        {SERVICES.map((service, i) => {
          const targetScale = 1 - ((SERVICES.length - i) * 0.03);
          return (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              progress={smoothProgress}
              range={[i * (1 / SERVICES.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpertiseGrid;
