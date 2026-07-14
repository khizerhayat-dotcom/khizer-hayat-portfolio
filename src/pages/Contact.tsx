import { type FormEvent, useState } from "react";
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
          <div className="overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_28px_90px_rgba(20,10,0,0.10)] dark:border-white/10 dark:bg-coal dark:shadow-none">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative flex min-h-[620px] flex-col justify-between bg-gradient-to-br from-accent via-flame to-[#8f1b08] p-7 text-white sm:p-10 lg:p-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Contact</p>
                  <h1 className="mt-6 max-w-[11ch] font-display text-5xl font-bold leading-[0.94] tracking-normal sm:text-6xl lg:text-[76px]">
                    Let&apos;s design a product that feels ready to ship.
                  </h1>
                  <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/75 sm:text-lg">
                    I&apos;m open to UI/UX roles, mobile app design projects, redesigns, design systems, prototypes, and developer handoff.
                  </p>
                </div>

                <div className="mt-12">
                  <p className="border-t border-white/20 pt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                    Quick links
                  </p>
                  <ContactLinks variant="darkPanel" className="mt-5" />
                </div>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} noValidate className="bg-white p-7 dark:bg-coal sm:p-10 lg:p-12">
                <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-7 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Project note</p>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-none text-ink dark:text-white sm:text-4xl">
                      Tell me what you&apos;re building.
                    </h2>
                  </div>
                  <p className="max-w-[24ch] text-sm leading-relaxed text-ink/55 dark:text-white/55">
                    A short note is enough to start.
                  </p>
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
