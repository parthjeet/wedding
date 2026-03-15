import React from "react";

interface DiyaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Diya: React.FC<DiyaProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 80 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      {/* Flame gradient — golden to orange */}
      <linearGradient id="diya-flame-grad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="var(--color-gold, #D4A843)" />
        <stop offset="50%" stopColor="#F5C542" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      {/* Inner flame glow */}
      <linearGradient id="diya-flame-inner" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FFF3C4" />
        <stop offset="100%" stopColor="#FFE082" />
      </linearGradient>
      {/* Radial glow behind flame */}
      <radialGradient id="diya-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--color-gold, #D4A843)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--color-gold, #D4A843)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft glow circle behind flame */}
    <circle cx="40" cy="32" r="18" fill="url(#diya-glow)" />

    {/* Flame — outer */}
    <path
      className="flame-flicker"
      d="M40,12 C44,20 50,28 48,36
         C46,44 42,46 40,46
         C38,46 34,44 32,36
         C30,28 36,20 40,12Z"
      fill="url(#diya-flame-grad)"
      stroke="none"
    />

    {/* Flame — inner bright core */}
    <path
      className="flame-flicker"
      d="M40,22 C42,27 45,32 44,37
         C43,42 41,43 40,43
         C39,43 37,42 36,37
         C35,32 38,27 40,22Z"
      fill="url(#diya-flame-inner)"
      stroke="none"
    />

    {/* Wick */}
    <line
      x1="40"
      y1="46"
      x2="40"
      y2="52"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* === Diya bowl === */}
    <g stroke="currentColor" strokeWidth="1.3">
      {/* Main bowl — wide open top, narrow base */}
      <path
        d="M15,55 C15,55 12,58 10,62
           C8,66 8,72 12,76
           C16,80 24,84 32,86
           L48,86
           C56,84 64,80 68,76
           C72,72 72,66 70,62
           C68,58 65,55 65,55"
      />

      {/* Bowl rim — slight outward lip */}
      <path d="M13,55 Q12,52 15,52 L65,52 Q68,52 67,55" />

      {/* Oil surface line */}
      <path d="M18,56 L62,56" strokeDasharray="2 3" />

      {/* Bowl base / pedestal */}
      <path
        d="M32,86 C32,88 30,90 30,92
           L50,92
           C50,90 48,88 48,86"
      />

      {/* Base foot */}
      <path d="M26,92 L54,92" strokeWidth="1.8" />
      <path d="M28,94 L52,94" strokeWidth="1.2" />

      {/* Decorative pattern on bowl — small arcs */}
      <path d="M20,65 Q25,60 30,65" />
      <path d="M30,65 Q35,60 40,65" />
      <path d="M40,65 Q45,60 50,65" />
      <path d="M50,65 Q55,60 60,65" />

      {/* Second decorative row — small dots */}
      <circle cx="25" cy="72" r="1.2" fill="currentColor" />
      <circle cx="33" cy="74" r="1.2" fill="currentColor" />
      <circle cx="40" cy="75" r="1.2" fill="currentColor" />
      <circle cx="47" cy="74" r="1.2" fill="currentColor" />
      <circle cx="55" cy="72" r="1.2" fill="currentColor" />

      {/* Tiny petal accents on bowl */}
      <path d="M22,78 Q25,74 28,78" />
      <path d="M36,80 Q40,76 44,80" />
      <path d="M52,78 Q55,74 58,78" />
    </g>
  </svg>
);

export default Diya;
