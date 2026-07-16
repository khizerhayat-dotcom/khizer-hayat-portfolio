import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-20 flex max-w-xl flex-1 flex-col justify-end gap-4 px-5 pb-6 pt-28 sm:px-10 sm:pb-8 md:pt-32 lg:absolute lg:left-[4.5%] lg:top-[51%] lg:max-w-[560px] lg:-translate-y-1/2 lg:justify-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
    >
      <motion.p
        variants={item}
        className="text-sm font-medium text-white/90 sm:text-lg lg:text-[20px]"
      >
        UI/UX Designer
      </motion.p>

      <motion.h1
        variants={item}
        className="text-balance font-display text-[clamp(40px,11.5vw,58px)] font-bold leading-[1.03] tracking-normal text-white sm:text-6xl lg:mt-[26px] lg:text-[62px] lg:leading-[1.08]"
      >
        Designing<br className="hidden lg:block" />{" "}
        <span
          className="italic font-normal tracking-normal text-white"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          products
        </span>{" "}
        that<br className="hidden lg:block" /> reach millions
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-[440px] text-sm leading-relaxed text-white/80 sm:text-lg lg:mt-[22px]"
      >
        Designing digital products across healthcare, AI, and consumer apps — with a
        focus on usability, clarity, and shipping accurately.
      </motion.p>

      <motion.div variants={item} className="pt-1 lg:mt-[36px] lg:pt-0">
        <a
          href="#work"
          className="group relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black px-7 py-3.5 text-sm font-medium text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-premium hover:scale-[1.03] active:scale-[0.98] motion-reduce:transition-colors motion-reduce:hover:bg-white motion-reduce:hover:text-black sm:px-9 sm:py-5 sm:text-base lg:px-14 lg:py-6"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-white transition-transform duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-12 -left-16 h-24 w-24 translate-x-[-110%] translate-y-[120%] scale-50 rounded-full bg-white opacity-0 transition-[transform,opacity] duration-[740ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-24 group-hover:translate-y-0 group-hover:scale-[2.8] group-hover:opacity-100 motion-reduce:hidden sm:h-28 sm:w-28"
          />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-[1px] transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[360%] group-hover:opacity-100 motion-reduce:hidden"
          />
          <span className="relative z-10 transition-colors duration-500 ease-premium group-hover:text-black motion-reduce:transition-none">
            Explore Projects
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}
