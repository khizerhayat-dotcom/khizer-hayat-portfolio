/**
 * Concentric arcs radiating from off-canvas right, echoing the stat markers.
 * Purely decorative: hidden from assistive tech and inert to pointer events.
 */
export default function RingDecoration() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <mask id="hero-ring-character-mask">
          <rect width="1440" height="1024" fill="white" />
          <ellipse cx="860" cy="610" rx="360" ry="590" fill="black" />
        </mask>
      </defs>
      <g mask="url(#hero-ring-character-mask)" stroke="white" strokeOpacity="0.16" fill="none" strokeWidth="1">
        <circle cx="1220" cy="520" r="320" />
        <circle cx="1220" cy="520" r="460" />
        <circle cx="1220" cy="520" r="600" />
      </g>
    </svg>
  );
}
