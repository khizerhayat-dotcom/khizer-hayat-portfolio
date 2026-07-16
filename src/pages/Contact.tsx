import { type FormEvent, useState } from "react";
import MixedText from "../components/MixedText";
import Reveal from "../components/Reveal";
import { CTAButton, ContactLinks } from "../components/ui";

const fieldClass =
  "min-h-13 rounded-2xl border border-black/10 bg-paper px-4 py-3 text-ink outline-none transition-all duration-200 placeholder:text-ink/35 focus:border-flame focus:bg-white focus:ring-4 focus:ring-flame/10 dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/35 dark:focus:border-flame dark:focus:bg-ink";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_EMAIL = "mailto:khizer8743@gmail.com";

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (status !== "sending") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      return "Please fill in all fields before sending.";
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (form.message.trim().length < 20) {
      return "Please add a little more detail to your message.";
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      setStatus("error");
      setFeedback(validationMessage);
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Message could not be sent.");
      }

      setForm(INITIAL_FORM);
      setStatus("success");
      setFeedback("Thanks. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Message could not be sent.");
    }
  };

  return (
    <main className="min-h-screen bg-paper pt-32 text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:px-10 lg:px-16">
        <Reveal>
          <div className="overflow-hidden rounded-[34px] border border-black/[0.08] bg-white shadow-[0_28px_90px_rgba(20,10,0,0.09)] dark:border-white/10 dark:bg-coal dark:shadow-none">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden bg-[#fbf7f1] p-7 text-ink transition-colors duration-300 dark:bg-[#100d0b] dark:text-white sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(244,98,10,0.18),transparent_36%),radial-gradient(circle_at_94%_78%,rgba(216,72,15,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.68),rgba(244,98,10,0.055)_46%,rgba(255,255,255,0.26))] dark:bg-[radial-gradient(circle_at_24%_0%,rgba(244,98,10,0.22),transparent_36%),radial-gradient(circle_at_94%_78%,rgba(172,32,10,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-flame/35 to-transparent dark:via-flame/50"
                />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">Contact</p>
                  <h1 className="mt-6 max-w-[11ch] font-display text-5xl font-bold leading-[0.94] tracking-normal sm:text-6xl lg:text-[72px]">
                    <MixedText text="Let's design a product that feels ready to ship." accent="design" />
                  </h1>
                  <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-ink/62 dark:text-white/64 sm:text-lg">
                    UI/UX direction for mobile apps, web apps, SaaS dashboards, design systems, prototypes, and developer handoff.
                  </p>
                </div>

                <div className="relative mt-12">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45 dark:text-white/48">
                      Quick links
                    </p>
                  </div>
                  <ContactLinks variant="compact" className="mt-5 max-w-[22rem]" />
                </div>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} noValidate className="bg-white p-7 dark:bg-coal sm:p-10 lg:p-12">
                <div className="mb-7 border-b border-black/[0.08] pb-6 dark:border-white/10">
                  <div className="max-w-[35rem]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Project note</p>
                    <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-[1.04] tracking-normal text-ink dark:text-white">
                      <MixedText text="Tell me what you're building." accent="building" accentClassName="text-flame/82 dark:text-flame/88" />
                    </h2>
                    <p className="mt-3 max-w-[44ch] text-sm leading-[1.65] text-ink/52 dark:text-white/56">
                      A short note is enough — share the goal, timeline, or product challenge.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                    Name
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="mt-5 grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                  Project or role
                  <input
                    name="subject"
                    autoComplete="organization-title"
                    placeholder="Mobile app, redesign, UI/UX role..."
                    value={form.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                    className={fieldClass}
                  />
                </label>

                <label className="mt-5 grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                  Message
                  <textarea
                    name="message"
                    rows={8}
                    placeholder="Share the goal, timeline, role, or product challenge."
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className={`${fieldClass} resize-none leading-relaxed`}
                  />
                </label>

                {feedback && (
                  <div
                    className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                      status === "success"
                        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-flame/25 bg-flame/10 text-ink/70 dark:text-white/70"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <p>{feedback}</p>
                    {status === "error" && (
                      <a href={FALLBACK_EMAIL} className="mt-2 inline-flex font-semibold text-flame underline-offset-4 hover:underline">
                        Email me directly
                      </a>
                    )}
                  </div>
                )}

                <CTAButton
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-7 w-full"
                >
                  {status === "sending" ? "Sending..." : "Send Email"}
                </CTAButton>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
