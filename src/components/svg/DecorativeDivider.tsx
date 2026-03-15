import React from "react";

interface DecorativeDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const DecorativeDivider: React.FC<DecorativeDividerProps> = ({
  className,
  style,
}) => (
  <svg
    viewBox="0 0 400 40"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left extending line */}
    <line x1="10" y1="20" x2="140" y2="20" strokeWidth="0.8" />

    {/* Left decorative tapers — small curves approaching center */}
    <path d="M130,20 C135,15 142,14 148,16" strokeWidth="0.8" />
    <path d="M130,20 C135,25 142,26 148,24" strokeWidth="0.8" />

    {/* Left small diamond */}
    <path
      d="M148,20 L153,16 L158,20 L153,24 Z"
      fill="var(--color-gold, #D4A843)"
      fillOpacity="0.2"
    />

    {/* Left scroll curl */}
    <path d="M158,17 C162,12 168,12 172,16" strokeWidth="0.8" />
    <path d="M158,23 C162,28 168,28 172,24" strokeWidth="0.8" />

    {/* === Central ornamental lotus motif === */}
    <g>
      {/* Central diamond */}
      <path
        d="M200,8 L212,20 L200,32 L188,20 Z"
        fill="var(--color-gold, #D4A843)"
        fillOpacity="0.15"
        strokeWidth="1.2"
      />

      {/* Inner diamond */}
      <path
        d="M200,12 L208,20 L200,28 L192,20 Z"
        strokeWidth="0.8"
      />

      {/* Center dot */}
      <circle cx="200" cy="20" r="2" fill="currentColor" />

      {/* Lotus petals radiating from diamond — top */}
      <path d="M200,8 C204,3 208,4 206,8" />
      <path d="M200,8 C196,3 192,4 194,8" />

      {/* Lotus petals — bottom */}
      <path d="M200,32 C204,37 208,36 206,32" />
      <path d="M200,32 C196,37 192,36 194,32" />

      {/* Lotus petals — left */}
      <path d="M188,20 C183,16 184,12 188,14" />
      <path d="M188,20 C183,24 184,28 188,26" />

      {/* Lotus petals — right */}
      <path d="M212,20 C217,16 216,12 212,14" />
      <path d="M212,20 C217,24 216,28 212,26" />

      {/* Small dots around the diamond */}
      <circle cx="200" cy="4" r="1.2" fill="currentColor" />
      <circle cx="200" cy="36" r="1.2" fill="currentColor" />
      <circle cx="184" cy="20" r="1.2" fill="currentColor" />
      <circle cx="216" cy="20" r="1.2" fill="currentColor" />

      {/* Diagonal accent dots */}
      <circle cx="193" cy="12" r="0.8" fill="currentColor" />
      <circle cx="207" cy="12" r="0.8" fill="currentColor" />
      <circle cx="193" cy="28" r="0.8" fill="currentColor" />
      <circle cx="207" cy="28" r="0.8" fill="currentColor" />
    </g>

    {/* Right scroll curl */}
    <path d="M242,17 C238,12 232,12 228,16" strokeWidth="0.8" />
    <path d="M242,23 C238,28 232,28 228,24" strokeWidth="0.8" />

    {/* Right small diamond */}
    <path
      d="M242,20 L247,16 L252,20 L247,24 Z"
      fill="var(--color-gold, #D4A843)"
      fillOpacity="0.2"
    />

    {/* Right decorative tapers */}
    <path d="M252,16 C258,14 265,15 270,20" strokeWidth="0.8" />
    <path d="M252,24 C258,26 265,25 270,20" strokeWidth="0.8" />

    {/* Right extending line */}
    <line x1="260" y1="20" x2="390" y2="20" strokeWidth="0.8" />

    {/* Small accent dots along the lines */}
    <circle cx="40" cy="20" r="1" fill="currentColor" />
    <circle cx="80" cy="20" r="1" fill="currentColor" />
    <circle cx="115" cy="20" r="1" fill="currentColor" />
    <circle cx="285" cy="20" r="1" fill="currentColor" />
    <circle cx="320" cy="20" r="1" fill="currentColor" />
    <circle cx="360" cy="20" r="1" fill="currentColor" />

    {/* Tiny leaf/curl accents at line ends */}
    <path d="M12,20 C14,16 18,15 18,18" strokeWidth="0.6" />
    <path d="M12,20 C14,24 18,25 18,22" strokeWidth="0.6" />
    <path d="M388,20 C386,16 382,15 382,18" strokeWidth="0.6" />
    <path d="M388,20 C386,24 382,25 382,22" strokeWidth="0.6" />
  </svg>
);

export default DecorativeDivider;
