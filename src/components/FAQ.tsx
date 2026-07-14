import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import { LinkButton } from "./ui";

const FAQ_ITEMS = [
  {
    question: "What type of products do you design?",
    answer:
      "Mobile apps, dashboards, AI tools, healthcare products, utilities, scanner apps, media products, and design systems.",
  },
  {
    question: "Do you design complete mobile apps or only screens?",
    answer:
      "Complete apps. I can cover flows, wireframes, UI, prototypes, edge states, and developer-ready Figma handoff.",
  },
  {
    question: "Can you improve an existing app UI?",
    answer:
      "Yes. I redesign structure, hierarchy, onboarding, navigation, visual polish, and key user journeys.",
  },
  {
    question: "What does your design process look like?",
    answer:
      "I clarify goals, map flows, design high-fidelity screens, prototype important paths, then prepare handoff.",
  },
  {
    question: "How long does a mobile app design project take?",
    answer:
      "Focused redesigns often take one to three weeks. Larger apps usually need three to six weeks depending on scope.",
  },
  {
    question: "Do you provide developer handoff?",
    answer:
      "Yes. I provide organized Figma files, components, specs, assets, interaction notes, and design QA support.",
  },
  {
    question: "Can you create design systems for existing products?",
    answer:
      "Yes. I define typography, color, spacing, components, states, patterns, and usage rules for scalable UI.",
  },
  {
    question: "Are you available for full-time roles or freelance projects?",
    answer:
      "Yes. I am open to UI/UX roles, mobile app projects, redesigns, systems, prototypes, and handoff work.",
  },
];

export default function FAQ({ preview = false }: { preview?: boolean }) {
  const [openIndex, setOpenIndex] = useState(0);
  const visibleItems = preview ? FAQ_ITEMS.slice(0, 4) : FAQ_ITEMS;

  return (
    <section id="faq" className="relative scroll-mt-28 overflow-hidden bg-paper dark:bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-20 h-80 w-80 rounded-full bg-flame/10 blur-3xl dark:bg-flame/15"
      />
      <div className={`mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 ${preview ? "py-14 sm:py-20 lg:py-20" : "py-16 sm:py-24 lg:py-28"}`}>
        <Reveal className={`grid ${preview ? "gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10" : "gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"}`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">FAQ</p>
            <h2 className={`${preview ? "mt-3 max-w-[13ch] text-[clamp(2rem,5vw,3.35rem)]" : "mt-5 max-w-[13ch] text-5xl sm:text-6xl"} font-display font-bold leading-[0.98] tracking-normal text-ink dark:text-white`}>
              {preview ? "Common questions" : "Questions recruiters and clients usually ask"}
            </h2>
            <p className={`${preview ? "mt-4 text-sm leading-[1.65]" : "mt-6 text-base leading-relaxed"} max-w-[44ch] text-ink/60 dark:text-white/60`}>
              Quick answers about my UI/UX process, mobile app work, timelines, design systems, handoff, and collaboration.
            </p>
            {preview && (
              <LinkButton href="/faq" variant="secondary" className="mt-6">
                View all FAQ
              </LinkButton>
            )}
          </div>

          <div className={`grid ${preview ? "gap-2.5" : "gap-3"}`}>
            {visibleItems.map((item, i) => {
              const isOpen = openIndex === i;
              const number = String(i + 1).padStart(2, "0");

              return (
                <motion.article
                  key={item.question}
                  layout
                  className={
                    `group border p-1 transition-colors duration-300 ${preview ? "rounded-[18px]" : "rounded-[24px]"} ` +
                    (isOpen
                      ? "border-flame/40 bg-white shadow-[0_18px_55px_rgba(20,10,0,0.08)] dark:bg-coal dark:shadow-none"
                      : "border-black/10 bg-white/70 hover:border-flame/25 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-flame/30 dark:hover:bg-white/[0.06]")
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`flex w-full items-start text-left outline-none transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-flame/20 ${
                      preview ? "gap-3 rounded-[14px] px-4 py-4 sm:gap-4 sm:px-5 sm:py-4" : "gap-4 rounded-[20px] px-5 py-5 sm:gap-5 sm:px-6 sm:py-6"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      className={
                        `${preview ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"} pt-1 font-display font-bold leading-none tracking-normal transition-colors duration-200 ` +
                        (isOpen ? "text-flame" : "text-ink/25 group-hover:text-flame/75 dark:text-white/25")
                      }
                    >
                      {number}
                    </span>
                    <span className="flex-1">
                      <span className={`${preview ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"} block font-display font-bold leading-tight tracking-normal text-ink dark:text-white`}>
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={
                        `${preview ? "h-9 w-9" : "h-11 w-11"} mt-0.5 flex shrink-0 items-center justify-center rounded-full border transition-all duration-300 ` +
                        (isOpen
                          ? "rotate-45 border-flame bg-flame text-white"
                          : "border-black/10 bg-paper text-ink group-hover:border-flame group-hover:text-flame dark:border-white/10 dark:bg-ink dark:text-white")
                      }
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className={`${preview ? "px-4 pb-5 pl-[4rem] text-sm sm:px-5 sm:pl-[4.85rem]" : "px-5 pb-6 pl-[4.75rem] text-[15px] sm:px-6 sm:pb-7 sm:pl-[5.9rem]"} leading-relaxed text-ink/62 dark:text-white/62`}>
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
