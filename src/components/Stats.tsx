import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  /** top offset as a percentage of the 1024px-tall reference canvas */
  top: number;
  /** right offset as a percentage of the 1440px-wide reference canvas */
  right: number;
}

const STATS: Stat[] = [
  { value: "3+", label: "Years Experience", top: 6.8, right: 14.2 },
  { value: "40+", label: "Products Shipped", top: 44.9, right: 2.8 },
  { value: "10M+", label: "App Downloads", top: 82.7, right: 7.5 },
];

const item = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StatItem({ value, label }: Pick<Stat, "value" | "label">) {
  return (
    <motion.div variants={item} className="flex min-w-0 flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-white" aria-hidden="true" />
        <span className="font-display text-[clamp(24px,7vw,30px)] font-bold leading-none tracking-normal text-white sm:text-[34px]">
          {value}
        </span>
      </div>
      <span className="pl-[15px] text-[10px] font-medium uppercase tracking-[0.12em] text-white/70 sm:pl-[17px] sm:text-[11px] sm:tracking-[0.14em]">
        {label}
      </span>
    </motion.div>
  );
}

/** Desktop: absolutely positioned to mirror the reference composition exactly. */
export function StatsDesktop() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="pointer-events-auto absolute"
          style={{ top: `${stat.top}%`, right: `${stat.right}%` }}
        >
          <StatItem value={stat.value} label={stat.label} />
        </div>
      ))}
    </motion.div>
  );
}

/** Mobile/tablet: a simple horizontal row beneath the CTA — absolute positioning
 *  from the desktop layout doesn't fit narrow viewports without overlapping content. */
export function StatsMobile() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.1 }}
      className="relative z-20 grid grid-cols-3 gap-x-3 gap-y-4 px-5 pb-20 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-6 sm:px-10 sm:pb-12 lg:hidden"
    >
      {STATS.map((stat) => (
        <StatItem key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </motion.div>
  );
}
