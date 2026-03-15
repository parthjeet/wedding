import React from "react";

interface PaisleyCornerProps {
  className?: string;
  style?: React.CSSProperties;
}

const PaisleyCorner: React.FC<PaisleyCornerProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main paisley body — large teardrop curving from top-left corner */}
    <path
      className="paisley-main"
      d="M10,10 C10,10 25,8 40,15 C55,22 70,40 75,60
         C80,80 72,105 55,115 C38,125 22,118 18,100
         C14,82 22,65 38,58 C54,51 62,60 60,72
         C58,84 48,90 40,85"
    />

    {/* Inner paisley detail lines */}
    <path
      className="paisley-inner"
      d="M30,25 C42,30 55,48 58,65 C61,82 52,100 40,105"
    />
    <path
      className="paisley-inner"
      d="M35,35 C45,40 53,55 54,68 C55,81 48,92 40,95"
    />

    {/* Curling vine extending from paisley toward bottom-right */}
    <path
      className="paisley-vine-1"
      d="M55,115 C62,130 80,140 95,135
         C110,130 115,115 110,100"
    />
    <path
      className="paisley-vine-2"
      d="M110,100 C105,85 115,72 130,75
         C145,78 150,95 145,110
         C140,125 125,135 115,140"
    />
    <path
      className="paisley-vine-3"
      d="M115,140 C110,155 120,168 135,170
         C150,172 165,162 170,148"
    />

    {/* Small leaf shapes along vines */}
    <path d="M80,132 C85,125 92,125 90,132 C88,139 82,138 80,132" />
    <path d="M120,80 C126,75 132,78 128,84 C124,90 118,86 120,80" />
    <path d="M140,105 C146,98 152,100 149,107 C146,114 138,112 140,105" />
    <path d="M125,160 C130,153 137,155 134,162 C131,169 123,167 125,160" />
    <path d="M155,155 C160,148 167,150 164,157 C161,164 153,162 155,155" />

    {/* Small three-petal flower at end of vine */}
    <path
      d="M170,148 C175,138 185,138 182,148
         C179,158 185,165 178,165
         C171,165 167,158 170,148"
    />
    <circle cx="176" cy="152" r="2" fill="currentColor" />

    {/* Decorative dots along curves */}
    <circle cx="15" cy="15" r="2.5" fill="currentColor" />
    <circle cx="48" cy="20" r="1.5" fill="currentColor" />
    <circle cx="68" cy="48" r="1.5" fill="currentColor" />
    <circle cx="70" cy="95" r="1.5" fill="currentColor" />
    <circle cx="28" cy="108" r="1.5" fill="currentColor" />
    <circle cx="98" cy="128" r="1.5" fill="currentColor" />
    <circle cx="132" cy="88" r="1.5" fill="currentColor" />
    <circle cx="148" cy="120" r="1.5" fill="currentColor" />
    <circle cx="160" cy="170" r="1.5" fill="currentColor" />

    {/* Small secondary paisley near corner */}
    <path
      d="M12,45 C12,45 18,42 24,48
         C30,54 28,65 22,68
         C16,71 12,66 13,60
         C14,54 18,52 22,55"
    />

    {/* Tiny accent curls */}
    <path d="M8,30 C4,35 6,42 10,42" />
    <path d="M30,12 C35,8 42,10 42,15" />
    <path d="M170,148 C178,145 185,148 188,155" />
  </svg>
);

export default PaisleyCorner;
