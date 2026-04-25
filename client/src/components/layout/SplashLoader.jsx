import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';
import wgbLoaderData from '../../assets/wgb_loader.json';

const WgbLottieAnimation = () => {
  const { View } = useLottie(
    {
      animationData: wgbLoaderData,
      loop: false,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    },
    { width: '100vw', height: '100vh', display: 'block' }
  );
  return <>{View}</>;
};

const SplashLoader = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Animation constants for Space Grotesk style (Geometric/Sharp)
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "tween", ease: "easeInOut", duration: 0.6 },
        opacity: { delay: i * 0.1, duration: 0.01 }
      }
    })
  };

  const handleLastAnimation = () => {
    // Wait a moment after the last letter is finished before flying to top-left
    setTimeout(() => {
      setIsExiting(true);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(30px)',
        scale: 1.05,
        transition: { duration: 1, ease: "easeInOut" }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Cyan Pulse (The Dot behind the screen) */}
      <motion.div
        animate={{
          x: [-200, 200, -200],
          y: [-100, 100, -100],
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #00f2ff 0%, transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      {/* WGB Agency Orbit / Crosshair Lottie Animation (Centered globally) */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, pointerEvents: 'none', opacity: 0.8, overflow: 'hidden' }}>
        <WgbLottieAnimation />
      </div>

      <motion.div
        animate={isExiting ? { scale: 0.25, y: "calc(50px - 50vh)", x: "calc(max(50vw - 600px, 0px) + 111px - 50vw)" } : { scale: 1, y: 0, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          if (isExiting) onComplete();
        }}
        style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
      >

        {/* TECHSOL Logo & Subtext */}
        <div style={{ position: 'relative', transform: 'translateY(-60px)' }}>
          <svg
            width="630"
            height="180"
            viewBox="0 0 630 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: '85vw' }}
          >
            {/* --- T --- */}
            <motion.path d="M40 30 H100" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" variants={draw} custom={0} initial="hidden" animate="visible" />
            <motion.path d="M70 30 V110" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" variants={draw} custom={1} initial="hidden" animate="visible" />

            {/* --- E --- */}
            <motion.path d="M130 30 V110" stroke="#fff" strokeWidth="8" variants={draw} custom={2} initial="hidden" animate="visible" />
            <motion.path d="M130 30 H180" stroke="#fff" strokeWidth="8" variants={draw} custom={3} initial="hidden" animate="visible" />
            <motion.path d="M130 70 H175" stroke="#fff" strokeWidth="8" variants={draw} custom={4} initial="hidden" animate="visible" />
            <motion.path d="M130 110 H180" stroke="#fff" strokeWidth="8" variants={draw} custom={5} initial="hidden" animate="visible" />

            {/* --- C --- */}
            <motion.path d="M260 30 H210 V110 H260" stroke="#fff" strokeWidth="8" strokeLinecap="square" variants={draw} custom={6} initial="hidden" animate="visible" />

            {/* --- H --- */}
            <motion.path d="M290 30 V110" stroke="#fff" strokeWidth="8" variants={draw} custom={7} initial="hidden" animate="visible" />
            <motion.path d="M340 30 V110" stroke="#fff" strokeWidth="8" variants={draw} custom={8} initial="hidden" animate="visible" />
            <motion.path d="M290 70 H340" stroke="#fff" strokeWidth="8" variants={draw} custom={9} initial="hidden" animate="visible" />

            {/* --- S --- */}
            <motion.path d="M420 30 H370 V70 H420 V110 H370" stroke="#fff" strokeWidth="8" strokeLinecap="square" variants={draw} custom={10} initial="hidden" animate="visible" />

            {/* --- O --- (Space Grotesk O is very geometric) */}
            <motion.path d="M450 30 H510 V110 H450 V30" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" variants={draw} custom={11} initial="hidden" animate="visible" />

            {/* --- L --- */}
            <motion.path
              d="M540 30 V110 H590"
              stroke="#fff"
              strokeWidth="8"
              strokeLinecap="square"
              variants={draw}
              custom={12}
              initial="hidden"
              animate="visible"
              onAnimationComplete={handleLastAnimation}
            />

            {/* "digital excellence" Subtext exactly matching BrandLogo */}
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.5 }}
              x="315"
              y="160"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '21px',
                letterSpacing: '0.45em',
                fill: '#cfc2d9',
                textTransform: 'uppercase',
                textAnchor: 'middle'
              }}
            >
              digital excellence
            </motion.text>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashLoader;
