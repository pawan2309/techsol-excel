import React from 'react';

const BrandLogo = ({ height = '40px', className = '' }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 630 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* "TECHSOL" - Custom Geometric Logo Paths from SplashLoader */}
      {/* --- T --- */}
      <path d="M40 30 H100" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" />
      <path d="M70 30 V110" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" />

      {/* --- E --- */}
      <path d="M130 30 V110" stroke="#fff" strokeWidth="8" />
      <path d="M130 30 H180" stroke="#fff" strokeWidth="8" />
      <path d="M130 70 H175" stroke="#fff" strokeWidth="8" />
      <path d="M130 110 H180" stroke="#fff" strokeWidth="8" />

      {/* --- C --- */}
      <path d="M260 30 H210 V110 H260" stroke="#fff" strokeWidth="8" strokeLinecap="square" />

      {/* --- H --- */}
      <path d="M290 30 V110" stroke="#fff" strokeWidth="8" />
      <path d="M340 30 V110" stroke="#fff" strokeWidth="8" />
      <path d="M290 70 H340" stroke="#fff" strokeWidth="8" />

      {/* --- S --- */}
      <path d="M420 30 H370 V70 H420 V110 H370" stroke="#fff" strokeWidth="8" strokeLinecap="square" />

      {/* --- O --- */}
      <path d="M450 30 H510 V110 H450 V30" stroke="#00f2ff" strokeWidth="8" strokeLinecap="square" />

      {/* --- L --- */}
      <path d="M540 30 V110 H590" stroke="#fff" strokeWidth="8" strokeLinecap="square" />

      {/* "digital excellence" Subtext */}
      <text
        x="315"
        y="160"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '26px',
          letterSpacing: '0.45em',
          fill: '#cfc2d9',
          textTransform: 'uppercase',
          textAnchor: 'middle'
        }}
      >
        digital excellence
      </text>
    </svg>
  );
};

export default BrandLogo;
