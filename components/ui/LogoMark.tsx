/**
 * LLW icon.
 *
 * Four straight bands interlace over and under each other into a bold,
 * simplified "L"; every crossing point carries a small node — the nod to
 * "Web" and connection. The gradient runs deep indigo into violet: precision
 * (Logic) moving into craft (Loom).
 *
 * Geometry sits on a 64-unit grid — 8-unit bands, 4-unit gaps, and a 4-unit
 * overshoot past the outermost crossing so the weave still reads at 32px.
 *
 * The viewBox is cropped tight to the glyph (`8 8 48 48`) so a `size-9`
 * utility renders a mark that is genuinely 36px tall rather than 75% of it.
 * Clear space — one band width, i.e. 1/6 of the rendered size — is the
 * caller's job, via the gap or padding around this element. The standalone
 * asset files (`app/icon.svg`, `public/logo-mark.svg`) keep the margin inside
 * their box instead, since a favicon has no layout to space it.
 */

/** Vertical bands (the stem) — x positions on the 64-unit grid. */
const STEM = [12, 24];
/** Horizontal bands (the foot) — y positions on the 64-unit grid. */
const FOOT = [32, 44];

const BAND = 8;
/** Bands span 8 → 56 on their long axis, leaving the clear-space margin. */
const START = 8;
const LENGTH = 48;

/**
 * Crossings where the horizontal band passes *over* the vertical one. The
 * other two crossings keep the vertical on top, giving the alternating
 * over/under weave. Listed as [stemX, footY].
 */
const HORIZONTAL_ON_TOP: readonly [number, number][] = [
  [STEM[0], FOOT[1]],
  [STEM[1], FOOT[0]],
];

const GRADIENT_ID = "logicloom-band-gradient";

export function LogoMark({
  tone = "brand",
  className = "",
}: {
  /** `brand` = indigo→violet gradient; `light` = reversed white on dark. */
  tone?: "brand" | "light";
  className?: string;
}) {
  // White is a brand colour, so the reversed mono treatment stays in palette.
  const bandFill = tone === "light" ? "#FFFFFF" : `url(#${GRADIENT_ID})`;
  // Nodes knock through to the dark ground on the reversed lockup.
  const nodeFill = tone === "light" ? "#1A1A2E" : "#FFFFFF";

  return (
    <svg
      viewBox="8 8 48 48"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2D2B6B" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <g fill={bandFill}>
        {/* Horizontal bands first, then vertical bands over them… */}
        {FOOT.map((y) => (
          <rect key={`foot-${y}`} x={START} y={y} width={LENGTH} height={BAND} rx="1" />
        ))}
        {STEM.map((x) => (
          <rect key={`stem-${x}`} x={x} y={START} width={BAND} height={LENGTH} rx="1" />
        ))}
        {/* …then the two crossings where the horizontal weaves back on top. */}
        {HORIZONTAL_ON_TOP.map(([x, y]) => (
          <rect key={`over-${x}-${y}`} x={x} y={y} width={BAND} height={BAND} />
        ))}
      </g>

      {/* A node at each of the four crossing points. */}
      <g fill={nodeFill}>
        {STEM.map((x) =>
          FOOT.map((y) => (
            <circle key={`node-${x}-${y}`} cx={x + BAND / 2} cy={y + BAND / 2} r="2.6" />
          )),
        )}
      </g>
    </svg>
  );
}
