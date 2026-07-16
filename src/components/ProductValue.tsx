import Reveal from "./Reveal";
import MixedText from "./MixedText";

const PROOF_POINTS = [
  {
    title: "Release-minded design",
    text: "Clear flows and practical hierarchy for real product teams.",
    proof: "40+ Products Shipped",
    detail: "Product clarity",
    icon: "ship",
  },
  {
    title: "Mobile-first craft",
    text: "Polished app interfaces across utility, AI, and healthcare products.",
    proof: "10M+ App Downloads",
    detail: "App experience",
    icon: "mobile",
  },
  {
    title: "Developer-ready handoff",
    text: "Organized Figma systems, states, specs, and build notes.",
    proof: "Design Systems",
    detail: "Cleaner build",
    icon: "handoff",
  },
];

function ValueIcon({ type }: { type: string }) {
  if (type === "mobile") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3.75" width="10" height="16.5" rx="2.75" stroke="currentColor" strokeWidth="1.45" />
        <path d="M10.25 7.25H13.75" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path
          d="M9.75 10H14.25M9.75 12.5H14.25M9.75 15H12"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          opacity="0.72"
        />
        <circle cx="12" cy="17.85" r="0.72" fill="currentColor" opacity="0.72" />
      </svg>
    );
  }

  if (type === "handoff") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 4.25H14.4L18 7.85V19.75H7V4.25Z"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinejoin="round"
        />
        <path d="M14.25 4.5V8H17.75" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" opacity="0.72" />
        <path d="M9.75 11H15.25M9.75 13.75H14M9.75 16.5H12.25" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" opacity="0.72" />
        <path d="M16 15.85L17.15 17L19.35 14.45" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.45" opacity="0.72" />
      <path d="M12 4.75V7M19.25 12H17M12 19.25V17M4.75 12H7" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" opacity="0.72" />
      <path d="M10.55 12.05L11.55 13.05L13.75 10.75" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductValue() {
  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <Reveal className="relative overflow-hidden rounded-[26px] border border-[#e5d8cb] bg-[#f7f1e9] px-5 py-8 shadow-[0_16px_48px_rgba(70,38,18,0.05)] dark:border-white/[0.085] dark:bg-[#100d0b] dark:shadow-none sm:px-7 sm:py-9 lg:px-9 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,252,247,0.74),rgba(244,98,10,0.035)_48%,rgba(246,239,230,0.42))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.052),rgba(255,255,255,0.012))]" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-12">
          <div className="max-w-[560px]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">Why work with me</p>
            <h2 className="mt-3 max-w-[13ch] font-display text-[clamp(2.15rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-normal text-ink dark:text-white">
              <MixedText text="Product value without extra noise." accent="value" />
            </h2>
            <p className="mt-4 max-w-[36ch] text-[15px] font-normal leading-[1.7] text-ink/60 dark:text-white/60">
              Focused UI/UX for mobile apps, web apps, SaaS dashboards, platforms, and handoff-ready files.
            </p>
          </div>

          <div className="grid gap-3.5">
            {PROOF_POINTS.map((point) => (
              <article
                key={point.title}
                className="group relative min-w-0 overflow-hidden rounded-[20px] border border-[#e3d6ca] bg-[#fffdf9] p-4 shadow-[0_12px_34px_rgba(70,38,18,0.045)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-flame/24 hover:bg-white dark:border-white/[0.095] dark:bg-[#171311] dark:shadow-none dark:hover:border-flame/30 dark:hover:bg-[#1b1512] sm:p-5"
              >
                <div className="relative flex items-start gap-4">
                  <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[16px] border border-[#e2d4c8] bg-white text-flame shadow-[0_8px_22px_rgba(70,38,18,0.045)] transition-all duration-300 group-hover:border-flame/22 dark:border-white/[0.1] dark:bg-white/[0.055] dark:text-flame/90 dark:shadow-none">
                    <ValueIcon type={point.icon} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-[#e0d2c5] bg-[#f8f1ea] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/58 transition-colors duration-300 group-hover:border-flame/20 group-hover:bg-[#fff8f1] group-hover:text-ink/70 dark:border-white/[0.095] dark:bg-white/[0.06] dark:text-white/64 dark:group-hover:border-flame/28 dark:group-hover:bg-flame/[0.08] dark:group-hover:text-white/76">
                        {point.proof}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-[1.15rem] font-semibold leading-tight tracking-normal text-ink dark:text-white sm:text-[1.25rem]">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-[40ch] text-sm font-normal leading-[1.6] text-ink/58 dark:text-white/58">
                      {point.text}
                    </p>
                    <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/38 transition-colors duration-300 group-hover:text-flame dark:text-white/38 dark:group-hover:text-flame">
                      {point.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
