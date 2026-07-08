import FAQSection from "../components/FAQ";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-paper pt-16 text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <h1 className="sr-only">UI/UX design questions answered by Khizer Hayat</h1>
      <FAQSection />
    </main>
  );
}
