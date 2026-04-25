import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

import webDevAnim from '../../assets/web-designer-setting-up-web-layout.json';
import savingAnim from '../../assets/saving.json';
import cloudAnim from '../../assets/cloud.json';

// Cycle through 3 local assets for all 8 services
const LOTTIE_ASSETS = [webDevAnim, savingAnim, cloudAnim];

const SERVICE_LABELS = [
  'Web & App Development',
  'Payment & Fintech',
  'Cloud Solutions',
  'AI & Automation',
  'Server Infrastructure',
  'DevOps & Platform',
  'Cybersecurity',
  'Compliance & Docs',
];

const SERVICE_COLORS = [
  '#00daf3', '#dab9ff', '#00daf3', '#dab9ff',
  '#00daf3', '#dab9ff', '#00daf3', '#dab9ff',
];

const LottiePlayer = ({ data }) => {
  const { View } = useLottie(
    { animationData: data, loop: true, autoplay: true },
    { height: '100%', width: '100%' }
  );
  return <div style={{ height: '100%', width: '100%' }}>{View}</div>;
};

const ExpertiseLottie = ({ activeId = 1 }) => {
  const index = (activeId - 1) % LOTTIE_ASSETS.length;
  const data = LOTTIE_ASSETS[index];
  const accentColor = SERVICE_COLORS[(activeId - 1) % SERVICE_COLORS.length];
  const label = SERVICE_LABELS[(activeId - 1) % SERVICE_LABELS.length];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Outer pulsing ring */}
      <motion.div
        key={`ring-${activeId}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.15, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '1.5rem',
          border: `1px solid ${accentColor}`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Glass frame */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid rgba(255,255,255,0.07)`,
          borderRadius: '1.25rem',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          padding: '1rem',
        }}
      >
        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '60px', height: '60px',
            background: `linear-gradient(135deg, ${accentColor}33, transparent)`,
            borderRadius: '1.25rem 0 1.25rem 0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0, right: 0,
            width: '60px', height: '60px',
            background: `linear-gradient(315deg, ${accentColor}22, transparent)`,
            borderRadius: '0 1.25rem 0 1.25rem',
          }}
        />

        {/* Lottie animation */}
        <div style={{ height: '320px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(12px)' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%' }}
            >
              <LottiePlayer data={data} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Active service label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${activeId}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
                flexShrink: 0,
              }}
            />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: accentColor,
            }}>
              {label}
            </span>
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.25)',
            }}>
              {String(activeId).padStart(2, '0')} / 08
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        gap: '6px',
        justifyContent: 'center',
        marginTop: '1.25rem',
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === activeId - 1 ? '20px' : '6px',
              background: i === activeId - 1 ? accentColor : 'rgba(255,255,255,0.15)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: '6px',
              borderRadius: '3px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertiseLottie;
