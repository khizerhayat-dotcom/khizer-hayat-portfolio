import FAQSection from "../components/FAQ";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-paper pt-[5.5rem] text-ink transition-colors duration-300 dark:bg-ink dark:text-white sm:pt-[6.5rem] lg:pt-[7rem]">
      <h1 className="sr-only">UI/UX design questions answered by Khizer Hayat</h1>
      <FAQSection />
    </main>
  );
}
