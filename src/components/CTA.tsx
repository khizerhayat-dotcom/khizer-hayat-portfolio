import Reveal from "./Reveal";
import { Card, ContactLinks, LinkButton } from "./ui";

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <Card className="grid gap-7 rounded-[26px] p-6 shadow-[0_22px_70px_rgba(20,10,0,0.09)] sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">Contact</p>
              <h2 className="mt-4 max-w-[13ch] font-display text-[clamp(2.25rem,6vw,4.4rem)] font-bold leading-[0.98] tracking-normal text-ink dark:text-white">
                Let&apos;s design a product that feels ready to ship.
              </h2>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-ink/65 dark:text-white/65">
                I&apos;m open to UI/UX roles, mobile app design projects, redesigns, design systems, prototypes, and developer handoff.
              </p>
            </div>

            <div>
              <ContactLinks />
              <LinkButton href="/contact" variant="text" className="mt-6">
                Open Contact Page
              </LinkButton>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
