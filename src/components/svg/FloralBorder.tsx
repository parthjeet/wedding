import React from "react";

interface FloralBorderProps {
  className?: string;
  style?: React.CSSProperties;
}

/** A single marigold-like flower cluster at a given center. */
const Marigold: React.FC<{ cx: number; cy: number; r?: number }> = ({
  cx,
  cy,
  r = 10,
}) => {
  const petalCount = 10;
  return (
    <g>
      {/* Outer petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount;
        const rad = (angle * Math.PI) / 180;
        const px = cx + r * Math.cos(rad);
        const py = cy + r * Math.sin(rad);
        const cpx1 = cx + r * 0.6 * Math.cos(rad - 0.3);
        const cpy1 = cy + r * 0.6 * Math.sin(rad - 0.3);
        const cpx2 = cx + r * 0.6 * Math.cos(rad + 0.3);
        const cpy2 = cy + r * 0.6 * Math.sin(rad + 0.3);
        return (
          <path
            key={`petal-${i}`}
            d={`M${cx},${cy} C${cpx1},${cpy1} ${px - (cpy1 - cy) * 0.3},${py + (cpx1 - cx) * 0.3} ${px},${py} C${px + (cpy2 - cy) * 0.3},${py - (cpx2 - cx) * 0.3} ${cpx2},${cpy2} ${cx},${cy}`}
            fill="var(--color-gold, #D4A843)"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        );
      })}
      {/* Inner petals — smaller, rotated */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount + 18;
        const rad = (angle * Math.PI) / 180;
        const ir = r * 0.55;
        const px = cx + ir * Math.cos(rad);
        const py = cy + ir * Math.sin(rad);
        return (
          <path
            key={`inner-petal-${i}`}
            d={`M${cx},${cy} Q${cx + ir * 0.5 * Math.cos(rad - 0.4)},${cy + ir * 0.5 * Math.sin(rad - 0.4)} ${px},${py} Q${cx + ir * 0.5 * Math.cos(rad + 0.4)},${cy + ir * 0.5 * Math.sin(rad + 0.4)} ${cx},${cy}`}
            stroke="currentColor"
            strokeWidth="0.6"
          />
        );
      })}
      {/* Center */}
      <circle cx={cx} cy={cy} r={r * 0.18} fill="currentColor" />
    </g>
  );
};

/** A small leaf at a given position and rotation. */
const Leaf: React.FC<{ x: number; y: number; angle?: number }> = ({
  x,
  y,
  angle = 0,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
    <path
      d="M0,0 C3,-8 8,-10 12,-6 C10,-2 5,0 0,0"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
    />
    <path d="M1,-1 L10,-5" stroke="currentColor" strokeWidth="0.4" />
  </g>
);

const FloralBorder: React.FC<FloralBorderProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 800 60"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main vine stem — gentle wave across the width */}
    <path
      className="floral-vine"
      d="M0,30
         C40,22 60,38 100,30
         C140,22 160,38 200,30
         C240,22 260,38 300,30
         C340,22 360,38 400,30
         C440,22 460,38 500,30
         C540,22 560,38 600,30
         C640,22 660,38 700,30
         C740,22 770,30 800,30"
      strokeWidth="1.2"
    />

    {/* Secondary thinner vine */}
    <path
      className="floral-vine-secondary"
      d="M0,32
         C40,40 60,24 100,32
         C140,40 160,24 200,32
         C240,40 260,24 300,32
         C340,40 360,24 400,32
         C440,40 460,24 500,32
         C540,40 560,24 600,32
         C640,40 660,24 700,32
         C740,40 770,32 800,32"
      strokeWidth="0.6"
      strokeDasharray="4 3"
    />

    {/* Marigold flowers at regular intervals */}
    <Marigold cx={100} cy={30} r={12} />
    <Marigold cx={250} cy={30} r={10} />
    <Marigold cx={400} cy={30} r={13} />
    <Marigold cx={550} cy={30} r={10} />
    <Marigold cx={700} cy={30} r={12} />

    {/* Small bud flowers between marigolds */}
    {[50, 175, 325, 475, 625, 770].map((x, i) => (
      <g key={`bud-${i}`}>
        <circle cx={x} cy={30} r={3.5} stroke="currentColor" strokeWidth="0.8" />
        <circle cx={x} cy={30} r={1.2} fill="currentColor" />
        {/* Tiny petals on buds */}
        {Array.from({ length: 5 }).map((_, j) => {
          const a = (j * 72 * Math.PI) / 180;
          return (
            <line
              key={`bud-line-${j}`}
              x1={x + 1.5 * Math.cos(a)}
              y1={30 + 1.5 * Math.sin(a)}
              x2={x + 3.5 * Math.cos(a)}
              y2={30 + 3.5 * Math.sin(a)}
              strokeWidth="0.6"
            />
          );
        })}
      </g>
    ))}

    {/* Leaves along the vine */}
    <Leaf x={65} y={26} angle={-30} />
    <Leaf x={80} y={34} angle={150} />
    <Leaf x={135} y={34} angle={160} />
    <Leaf x={155} y={26} angle={-20} />
    <Leaf x={210} y={26} angle={-40} />
    <Leaf x={225} y={36} angle={140} />
    <Leaf x={285} y={34} angle={155} />
    <Leaf x={305} y={26} angle={-25} />
    <Leaf x={360} y={26} angle={-35} />
    <Leaf x={375} y={36} angle={145} />
    <Leaf x={440} y={34} angle={160} />
    <Leaf x={455} y={26} angle={-20} />
    <Leaf x={510} y={26} angle={-40} />
    <Leaf x={530} y={36} angle={140} />
    <Leaf x={585} y={34} angle={155} />
    <Leaf x={610} y={26} angle={-25} />
    <Leaf x={660} y={26} angle={-35} />
    <Leaf x={680} y={36} angle={145} />
    <Leaf x={740} y={34} angle={160} />
    <Leaf x={760} y={26} angle={-20} />

    {/* Decorative dots scattered */}
    {[30, 120, 200, 280, 350, 430, 520, 600, 680, 750].map((x, i) => (
      <circle
        key={`dot-${i}`}
        cx={x}
        cy={i % 2 === 0 ? 20 : 40}
        r="1"
        fill="currentColor"
      />
    ))}
  </svg>
);

export default FloralBorder;
