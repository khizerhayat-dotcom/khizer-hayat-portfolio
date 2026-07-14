import Reveal from "./Reveal";
import { Card, ContactLinks, LinkButton } from "./ui";

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <Card className="grid gap-8 rounded-[28px] p-7 shadow-[0_24px_80px_rgba(20,10,0,0.10)] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">Contact</p>
              <h2 className="mt-5 max-w-[13ch] font-display text-4xl font-bold leading-[0.98] tracking-normal text-ink dark:text-white sm:text-6xl">
                Let&apos;s design a product that feels ready to ship.
              </h2>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-ink/65 dark:text-white/65">
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
