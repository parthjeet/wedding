import React from "react";

interface PaisleyFrameProps {
  className?: string;
  style?: React.CSSProperties;
}

const PaisleyFrame: React.FC<PaisleyFrameProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* === Group 1: Outer rectangle border with scallops === */}
    <g className="frame-border">
      {/* Outer line */}
      <rect x="20" y="20" width="760" height="560" rx="8" />
      {/* Inner line */}
      <rect x="35" y="35" width="730" height="530" rx="5" />

      {/* Top scallops between the two lines */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 55 + i * 40;
        return (
          <path
            key={`scallop-t-${i}`}
            d={`M${x},28 Q${x + 20},18 ${x + 40},28`}
          />
        );
      })}
      {/* Bottom scallops */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 55 + i * 40;
        return (
          <path
            key={`scallop-b-${i}`}
            d={`M${x},572 Q${x + 20},582 ${x + 40},572`}
          />
        );
      })}
      {/* Left scallops */}
      {Array.from({ length: 13 }).map((_, i) => {
        const y = 50 + i * 40;
        return (
          <path
            key={`scallop-l-${i}`}
            d={`M28,${y} Q18,${y + 20} 28,${y + 40}`}
          />
        );
      })}
      {/* Right scallops */}
      {Array.from({ length: 13 }).map((_, i) => {
        const y = 50 + i * 40;
        return (
          <path
            key={`scallop-r-${i}`}
            d={`M772,${y} Q782,${y + 20} 772,${y + 40}`}
          />
        );
      })}
    </g>

    {/* === Group 2: Corner lotus motifs === */}
    <g className="frame-corners">
      {/* Top-left corner lotus */}
      <g transform="translate(55, 55)">
        <path d="M0,0 C8,-15 20,-20 28,-15 C20,-5 8,0 0,0" />
        <path d="M0,0 C-5,10 -5,22 2,28 C8,18 5,8 0,0" />
        <path d="M0,0 C12,-8 25,-8 30,0 C20,5 10,5 0,0" />
        <path d="M0,0 C-8,12 -5,25 5,28 C8,18 5,8 0,0" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
        <circle cx="22" cy="-10" r="1.5" fill="currentColor" />
        <circle cx="-3" cy="22" r="1.5" fill="currentColor" />
      </g>
      {/* Top-right corner lotus */}
      <g transform="translate(745, 55) scale(-1, 1)">
        <path d="M0,0 C8,-15 20,-20 28,-15 C20,-5 8,0 0,0" />
        <path d="M0,0 C-5,10 -5,22 2,28 C8,18 5,8 0,0" />
        <path d="M0,0 C12,-8 25,-8 30,0 C20,5 10,5 0,0" />
        <path d="M0,0 C-8,12 -5,25 5,28 C8,18 5,8 0,0" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
        <circle cx="22" cy="-10" r="1.5" fill="currentColor" />
        <circle cx="-3" cy="22" r="1.5" fill="currentColor" />
      </g>
      {/* Bottom-left corner lotus */}
      <g transform="translate(55, 545) scale(1, -1)">
        <path d="M0,0 C8,-15 20,-20 28,-15 C20,-5 8,0 0,0" />
        <path d="M0,0 C-5,10 -5,22 2,28 C8,18 5,8 0,0" />
        <path d="M0,0 C12,-8 25,-8 30,0 C20,5 10,5 0,0" />
        <path d="M0,0 C-8,12 -5,25 5,28 C8,18 5,8 0,0" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
        <circle cx="22" cy="-10" r="1.5" fill="currentColor" />
        <circle cx="-3" cy="22" r="1.5" fill="currentColor" />
      </g>
      {/* Bottom-right corner lotus */}
      <g transform="translate(745, 545) scale(-1, -1)">
        <path d="M0,0 C8,-15 20,-20 28,-15 C20,-5 8,0 0,0" />
        <path d="M0,0 C-5,10 -5,22 2,28 C8,18 5,8 0,0" />
        <path d="M0,0 C12,-8 25,-8 30,0 C20,5 10,5 0,0" />
        <path d="M0,0 C-8,12 -5,25 5,28 C8,18 5,8 0,0" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
        <circle cx="22" cy="-10" r="1.5" fill="currentColor" />
        <circle cx="-3" cy="22" r="1.5" fill="currentColor" />
      </g>
    </g>

    {/* === Group 3: Top and bottom vine with flowers === */}
    <g className="frame-vines-horizontal">
      {/* Top vine */}
      <path d="M90,48 C130,38 170,55 210,45 C250,35 290,52 330,42 C370,32 410,50 450,42 C490,34 530,50 570,42 C610,34 650,48 710,48" />
      {/* Small leaves on top vine */}
      <path d="M150,45 C155,38 162,38 160,45 C158,52 152,50 150,45" />
      <path d="M270,40 C275,33 282,33 280,40 C278,47 272,45 270,40" />
      <path d="M390,45 C395,38 402,38 400,45 C398,52 392,50 390,45" />
      <path d="M510,40 C515,33 522,33 520,40 C518,47 512,45 510,40" />
      <path d="M630,45 C635,38 642,38 640,45 C638,52 632,50 630,45" />
      {/* Top center flower */}
      <path d="M400,38 C405,28 412,28 408,38 C404,48 395,48 400,38" />
      <path d="M400,38 C410,35 412,42 405,44 C398,46 394,40 400,38" />
      <path d="M400,38 C390,35 388,42 395,44 C402,46 406,40 400,38" />
      <circle cx="400" cy="40" r="2" fill="currentColor" />

      {/* Bottom vine */}
      <path d="M90,552 C130,562 170,545 210,555 C250,565 290,548 330,558 C370,568 410,550 450,558 C490,566 530,550 570,558 C610,566 650,552 710,552" />
      {/* Small leaves on bottom vine */}
      <path d="M150,555 C155,562 162,562 160,555 C158,548 152,550 150,555" />
      <path d="M270,560 C275,567 282,567 280,560 C278,553 272,555 270,560" />
      <path d="M390,555 C395,562 402,562 400,555 C398,548 392,550 390,555" />
      <path d="M510,560 C515,567 522,567 520,560 C518,553 512,555 510,560" />
      <path d="M630,555 C635,562 642,562 640,555 C638,548 632,550 630,555" />
      {/* Bottom center flower */}
      <path d="M400,562 C405,572 412,572 408,562 C404,552 395,552 400,562" />
      <path d="M400,562 C410,565 412,558 405,556 C398,554 394,560 400,562" />
      <path d="M400,562 C390,565 388,558 395,556 C402,554 406,560 400,562" />
      <circle cx="400" cy="560" r="2" fill="currentColor" />
    </g>

    {/* === Group 4: Side paisley ornaments === */}
    <g className="frame-vines-vertical">
      {/* Left side paisley chain */}
      <path d="M48,90 C38,130 55,170 45,210 C35,250 52,290 42,330 C32,370 50,410 42,450 C34,490 48,510 48,510" />
      {/* Left side small paisleys */}
      <g transform="translate(42, 160)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(42, 300)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(42, 440)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      {/* Left side leaves */}
      <path d="M45,130 C38,125 35,130 40,135 C45,140 48,135 45,130" />
      <path d="M40,230 C33,225 30,230 35,235 C40,240 43,235 40,230" />
      <path d="M45,370 C38,365 35,370 40,375 C45,380 48,375 45,370" />

      {/* Right side paisley chain */}
      <path d="M752,90 C762,130 745,170 755,210 C765,250 748,290 758,330 C768,370 750,410 758,450 C766,490 752,510 752,510" />
      {/* Right side small paisleys */}
      <g transform="translate(758, 160) scale(-1, 1)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(758, 300) scale(-1, 1)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(758, 440) scale(-1, 1)">
        <path d="M0,0 C-10,-5 -15,5 -10,12 C-5,19 5,15 5,8 C5,1 0,0 0,0" />
        <circle cx="-4" cy="8" r="1.5" fill="currentColor" />
      </g>
      {/* Right side leaves */}
      <path d="M755,130 C762,125 765,130 760,135 C755,140 752,135 755,130" />
      <path d="M760,230 C767,225 770,230 765,235 C760,240 757,235 760,230" />
      <path d="M755,370 C762,365 765,370 760,375 C755,380 752,375 755,370" />
    </g>

    {/* === Group 5: Dot accents along inner border === */}
    <g className="frame-dots">
      {/* Top dots */}
      {Array.from({ length: 36 }).map((_, i) => (
        <circle
          key={`dot-t-${i}`}
          cx={55 + i * 20}
          cy="28"
          r="1"
          fill="currentColor"
        />
      ))}
      {/* Bottom dots */}
      {Array.from({ length: 36 }).map((_, i) => (
        <circle
          key={`dot-b-${i}`}
          cx={55 + i * 20}
          cy="572"
          r="1"
          fill="currentColor"
        />
      ))}
      {/* Left dots */}
      {Array.from({ length: 26 }).map((_, i) => (
        <circle
          key={`dot-l-${i}`}
          cx="28"
          cy={50 + i * 20}
          r="1"
          fill="currentColor"
        />
      ))}
      {/* Right dots */}
      {Array.from({ length: 26 }).map((_, i) => (
        <circle
          key={`dot-r-${i}`}
          cx="772"
          cy={50 + i * 20}
          r="1"
          fill="currentColor"
        />
      ))}
    </g>
  </svg>
);

export default PaisleyFrame;
