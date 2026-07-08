import HeroContent from "./HeroContent";
import { StatsDesktop, StatsMobile } from "./Stats";
import SpotlightReveal from "./SpotlightReveal";
import RingDecoration from "./RingDecoration";
import bgColor from "../assets/bg-color.webp";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-[#7a0f02] min-h-[100dvh] bg-cover [background-position:40%_0%] lg:[background-position:76%_9%]"
      style={{
        // Paints the exact gradient instantly (13kb) so there's no flash of
        // flat color while the heavier portrait images decode.
        backgroundImage: `url(${bgColor})`,
      }}
    >
      {/* Layer 0 — cursor-following spotlight reveal, fills the whole hero */}
      <SpotlightReveal radius={260} objectPosition="76% 9%" mobileObjectPosition="40% 0%" />

      {/* Legibility scrim behind the copy on narrow screens, where text sits
          directly over the portrait rather than beside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/70 lg:hidden"
      />

      {/* Layer 1 — decorative concentric rings */}
      <RingDecoration />

      {/* Layer 2 — copy + CTA, and stats */}
      <div className="relative z-20 flex min-h-[100dvh] flex-col lg:block">
        <HeroContent />
        <StatsMobile />
      </div>
      <StatsDesktop />
    </section>
  );
}
