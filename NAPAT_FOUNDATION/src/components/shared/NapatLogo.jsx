import React from 'react';

export default function NapatLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner neural node dot */}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      {/* Connection lines radiating out — 5 for NAPAT pillars */}
      <line x1="24" y1="20" x2="24" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="27.2" y1="21.5" x2="40" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="27.2" y1="26.5" x2="39" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20.8" y1="26.5" x2="9" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20.8" y1="21.5" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Outer nodes */}
      <circle cx="24" cy="5" r="2" fill="currentColor"/>
      <circle cx="40" cy="14" r="2" fill="currentColor"/>
      <circle cx="39" cy="36" r="2" fill="currentColor"/>
      <circle cx="9" cy="36" r="2" fill="currentColor"/>
      <circle cx="8" cy="14" r="2" fill="currentColor"/>
    </svg>
  );
}