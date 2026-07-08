import { lazy, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Work = lazy(() => import("./pages/Work"));

export type Theme = "light" | "dark";

const SITE_URL = "https://khizer-hayat-portfolio.vercel.app";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Khizer Hayat - UI/UX Designer | Mobile App & Product Designer",
    description:
      "Khizer Hayat is a UI/UX Designer from Lahore, Pakistan, crafting mobile app experiences, product redesigns, design systems, prototypes, and developer-ready handoff for shipped products.",
  },
  "/work": {
    title: "Work - Khizer Hayat Portfolio",
    description:
      "Explore UI/UX case studies and shipped mobile app, dashboard, healthcare, AI, and product design work by Khizer Hayat.",
  },
  "/about": {
    title: "About - Khizer Hayat UI UX Designer",
    description:
      "Learn about Khizer Hayat, a UI/UX Designer in Lahore, Pakistan focused on mobile apps, product redesigns, design systems, Figma prototypes, and developer handoff.",
  },
  "/services": {
    title: "Services - Mobile App UI UX, Product Redesign & Design Systems",
    description:
      "UI/UX services by Khizer Hayat covering mobile app UI, product redesign, design systems, Figma prototypes, and developer-ready handoff.",
  },
  "/faq": {
    title: "FAQ - Khizer Hayat UI UX Designer",
    description:
      "Answers about Khizer Hayat's UI/UX process, mobile app design work, design systems, timelines, prototypes, and developer handoff.",
  },
  "/contact": {
    title: "Contact - Hire Khizer Hayat",
    description:
      "Contact Khizer Hayat for UI/UX roles, mobile app design, product redesign, design systems, prototypes, and developer-ready handoff.",
  },
};

function setMetaTag(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);
  element?.setAttribute(attribute, value);
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return "light";
  });
  const [path, setPath] = useState(() => window.location.pathname);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  useEffect(() => {
    const meta = ROUTE_META[path] ?? ROUTE_META["/"];
    const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

    document.title = meta.title;
    setMetaTag('meta[name="description"]', "content", meta.description);
    setMetaTag('meta[property="og:title"]', "content", meta.title);
    setMetaTag('meta[property="og:description"]', "content", meta.description);
    setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', "content", meta.title);
    setMetaTag('meta[name="twitter:description"]', "content", meta.description);
    setMetaTag('link[rel="canonical"]', "href", canonicalUrl);
  }, [path]);

  const routes: Record<string, ReactNode> = {
    "/": <Home />,
    "/work": <Work />,
    "/about": <About />,
    "/services": <Services />,
    "/faq": <FAQ />,
    "/contact": <Contact />,
  };

  const page = routes[path] ?? <Home />;

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />
      <Suspense fallback={null}>{page}</Suspense>
      <Footer />
    </MotionConfig>
  );
}

export default App;
