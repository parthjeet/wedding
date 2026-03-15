import React from "react";

interface MandalaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Mandala: React.FC<MandalaProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Ring 1 — Innermost: small lotus bud */}
    <g className="mandala-ring-1">
      {/* Center dot */}
      <circle cx="200" cy="200" r="3" fill="currentColor" />
      <circle cx="200" cy="200" r="8" />
      {/* 8 teardrop petals around center */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <path
            key={`r1-petal-${i}`}
            d="M200,200 Q206,185 200,170 Q194,185 200,200"
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
    </g>

    {/* Ring 2 — Lotus petals layer */}
    <g className="mandala-ring-2">
      <circle cx="200" cy="200" r="42" />
      {/* 12 wider lotus petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <path
            key={`r2-petal-${i}`}
            d="M200,200 C210,180 215,162 200,148 C185,162 190,180 200,200"
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
      {/* 12 dots between petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = ((i * 360) / 12 + 15) * (Math.PI / 180);
        const cx = 200 + 48 * Math.sin(angle);
        const cy = 200 - 48 * Math.cos(angle);
        return (
          <circle
            key={`r2-dot-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
          />
        );
      })}
    </g>

    {/* Ring 3 — Arched scallop ring with inner detail */}
    <g className="mandala-ring-3">
      <circle cx="200" cy="200" r="72" strokeDasharray="3 5" />
      {/* 16 arced petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <path
            key={`r3-arc-${i}`}
            d="M200,200 C212,175 218,147 200,128 C182,147 188,175 200,200"
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
      {/* 16 small teardrop accents between petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16 + 11.25;
        return (
          <path
            key={`r3-accent-${i}`}
            d="M200,133 Q203,126 200,120 Q197,126 200,133"
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
      {/* Dot ring at r=78 */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = ((i * 360) / 32) * (Math.PI / 180);
        const cx = 200 + 78 * Math.sin(angle);
        const cy = 200 - 78 * Math.cos(angle);
        return (
          <circle
            key={`r3-dot-${i}`}
            cx={cx}
            cy={cy}
            r="1.5"
            fill="currentColor"
          />
        );
      })}
    </g>

    {/* Ring 4 — Ornate paisley-inspired scallops */}
    <g className="mandala-ring-4">
      <circle cx="200" cy="200" r="110" />
      {/* 20 ornate petals with double curves */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 360) / 20;
        return (
          <g key={`r4-group-${i}`} transform={`rotate(${angle} 200 200)`}>
            <path d="M200,200 C215,170 220,140 200,90 C180,140 185,170 200,200" />
            <path d="M200,115 C206,108 206,100 200,95 C194,100 194,108 200,115" />
          </g>
        );
      })}
      {/* Dot ring at r=114 */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = ((i * 360) / 40) * (Math.PI / 180);
        const cx = 200 + 114 * Math.sin(angle);
        const cy = 200 - 114 * Math.cos(angle);
        return (
          <circle
            key={`r4-dot-${i}`}
            cx={cx}
            cy={cy}
            r="1.2"
            fill="currentColor"
          />
        );
      })}
    </g>

    {/* Ring 5 — Outermost: large lotus petals with filigree */}
    <g className="mandala-ring-5">
      <circle cx="200" cy="200" r="145" strokeDasharray="2 4" />
      <circle cx="200" cy="200" r="170" />
      {/* 24 large pointed petals */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <g key={`r5-group-${i}`} transform={`rotate(${angle} 200 200)`}>
            <path d="M200,200 C218,160 225,115 200,55 C175,115 182,160 200,200" />
            <path d="M200,80 Q205,70 200,60 Q195,70 200,80" />
            <path d="M200,110 Q207,100 200,90 Q193,100 200,110" />
          </g>
        );
      })}
      {/* Outer dot ring at r=175 */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = ((i * 360) / 48) * (Math.PI / 180);
        const cx = 200 + 175 * Math.sin(angle);
        const cy = 200 - 175 * Math.cos(angle);
        return (
          <circle
            key={`r5-dot-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
          />
        );
      })}
      {/* Final outer boundary */}
      <circle cx="200" cy="200" r="185" />
    </g>
  </svg>
);

export default Mandala;
