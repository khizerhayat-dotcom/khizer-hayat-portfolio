import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MixedText from "./MixedText";
import Reveal from "./Reveal";
import { LinkButton } from "./ui";
import { FAQ_ITEMS } from "../seo";

export default function FAQ({ preview = false }: { preview?: boolean }) {
  const [openIndex, setOpenIndex] = useState(0);
  const visibleItems = preview ? FAQ_ITEMS.slice(0, 4) : FAQ_ITEMS;

  return (
    <section id="faq" className="relative scroll-mt-28 overflow-hidden bg-paper dark:bg-ink">
      <div className={`mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 ${preview ? "py-12 sm:py-16" : "py-4 sm:py-7 lg:py-9"}`}>
        <Reveal className={`grid ${preview ? "gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-9" : "gap-5 lg:grid-cols-[0.68fr_1.32fr] lg:gap-9"}`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">FAQ</p>
            <h2 className={`${preview ? "mt-3 max-w-[13ch] text-[clamp(2rem,5vw,3.35rem)]" : "mt-4 max-w-[16ch] text-[clamp(2.05rem,4.4vw,3.3rem)]"} font-display font-bold leading-[1.04] tracking-normal text-ink dark:text-white`}>
              {preview ? <MixedText text="Common questions" accent="questions" /> : <MixedText text="Questions recruiters and clients usually ask" accent="Questions" />}
            </h2>
            <p className={`${preview ? "mt-4 text-sm leading-[1.65]" : "mt-3 text-[15px] leading-[1.65]"} max-w-[34ch] font-normal text-ink/56 dark:text-white/58`}>
              Process, timelines, systems, handoff, and collaboration in short answers.
            </p>
            {preview && (
              <LinkButton href="/faq" variant="secondary" className="mt-6">
                View all FAQ
              </LinkButton>
            )}
          </div>

          <div className={`grid ${preview ? "gap-2.5" : "gap-2.5 lg:gap-3"}`}>
            {visibleItems.map((item, i) => {
              const isOpen = openIndex === i;
              const number = String(i + 1).padStart(2, "0");

              return (
                <motion.article
                  key={item.question}
                  layout
                  className={
                    `group border p-1 transition-colors duration-300 ${preview ? "rounded-[16px]" : "rounded-[16px] sm:rounded-[18px]"} ` +
                    (isOpen
                      ? "border-flame/20 bg-white shadow-[0_8px_26px_rgba(20,10,0,0.045)] dark:bg-white/[0.06] dark:shadow-none"
                      : "border-black/10 bg-white/62 hover:border-flame/20 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-flame/25 dark:hover:bg-white/[0.055]")
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`flex w-full items-start text-left outline-none transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-flame/20 ${
                      preview ? "gap-3 rounded-[13px] px-4 py-3.5 sm:gap-4 sm:px-5" : "gap-3 rounded-[13px] px-4 py-3 sm:gap-4 sm:rounded-[15px] sm:px-5 sm:py-3.5"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      className={
                        `${preview ? "text-lg sm:text-xl" : "text-base sm:text-lg"} pt-0.5 font-display font-semibold leading-none tracking-normal transition-colors duration-200 ` +
                        (isOpen ? "text-flame" : "text-ink/25 group-hover:text-flame/75 dark:text-white/25")
                      }
                    >
                      {number}
                    </span>
                    <span className="flex-1">
                      <span className={`${preview ? "text-base sm:text-lg" : "text-[15px] sm:text-base"} block font-display font-semibold leading-snug tracking-normal text-ink dark:text-white`}>
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={
                        `${preview ? "h-9 w-9" : "h-8 w-8 sm:h-9 sm:w-9"} mt-0.5 flex shrink-0 items-center justify-center rounded-full border transition-all duration-300 ` +
                        (isOpen
                          ? "rotate-45 border-flame/55 bg-flame/10 text-flame dark:bg-flame/15"
                          : "border-black/10 bg-paper/80 text-ink/75 group-hover:border-flame/55 group-hover:text-flame dark:border-white/10 dark:bg-ink/80 dark:text-white/75")
                      }
                      aria-hidden="true"
                    >
                      <svg width={preview ? 18 : 15} height={preview ? 18 : 15} viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className={`${preview ? "px-4 pb-5 pl-[4rem] text-sm sm:px-5 sm:pl-[4.85rem]" : "px-4 pb-4 pl-[3.55rem] text-sm sm:px-5 sm:pb-4 sm:pl-[4.45rem]"} font-normal leading-[1.65] text-ink/60 dark:text-white/60`}>
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
