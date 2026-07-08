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
        className="text-balance font-display text-[clamp(40px,12vw,58px)] font-bold leading-[1.03] tracking-normal text-white sm:text-6xl lg:mt-[26px] lg:text-[62px] lg:leading-[1.1]"
      >
        Designing<br className="hidden lg:block" /> products that<br className="hidden lg:block" /> reach millions
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
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-transform duration-300 ease-premium hover:scale-[1.03] active:scale-[0.98] sm:px-9 sm:py-5 sm:text-base lg:px-14 lg:py-6"
        >
          Explore Projects
        </a>
      </motion.div>
    </motion.div>
  );
}
