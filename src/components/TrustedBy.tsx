import Reveal from "./Reveal";

const PRODUCTS = ["Aspire", "eShaafi", "ZM Player", "Snaptune", "goQR", "WallHub"];

export default function TrustedBy() {
  return (
    <section aria-label="Products shipped" className="border-y border-black/10 bg-paper dark:border-white/10 dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 lg:px-16">
        <Reveal y={12}>
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink/45 dark:text-white/40">
            Products designed and shipped, used by millions
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
            {PRODUCTS.map((name) => (
              <li
                key={name}
                className="font-display text-xl font-bold tracking-tight text-ink/35 transition-colors duration-300 hover:text-ink dark:text-white/30 dark:hover:text-white sm:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
