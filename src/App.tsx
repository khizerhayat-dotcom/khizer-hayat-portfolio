import { lazy, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import { PageTransition } from "./components/ui";

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
    title: "Khizer Hayat Portfolio - UI UX Designer Lahore, Pakistan",
    description:
      "Khizer Hayat is a UI UX Designer focused on mobile apps, web apps, SaaS dashboards, AI products, healthcare platforms, design systems, prototypes, and developer-ready handoff.",
  },
  "/work": {
    title: "Work - Khizer Hayat UI UX Designer Portfolio",
    description:
      "Explore UI UX case studies for mobile apps, web apps, SaaS dashboards, AI products, healthcare platforms, design systems, and shipped product work by Khizer Hayat.",
  },
  "/about": {
    title: "About - Khizer Hayat UI UX Designer Pakistan",
    description:
      "Learn about Khizer Hayat, a Product Designer in Pakistan focused on mobile apps, web apps, SaaS dashboards, product redesign, design systems, and developer handoff.",
  },
  "/services": {
    title: "Services - Mobile App, Web App, Dashboard UI UX",
    description:
      "UI UX services by Khizer Hayat covering mobile apps, web apps, SaaS dashboards, admin panels, product redesign, design systems, prototypes, and developer-ready handoff.",
  },
  "/faq": {
    title: "FAQ - Khizer Hayat Portfolio and UI UX Process",
    description:
      "Answers about Khizer Hayat's UI UX process for mobile apps, web apps, dashboards, design systems, Figma handoff, timelines, and collaboration.",
  },
  "/contact": {
    title: "Contact - Hire Khizer Hayat UI UX Designer",
    description:
      "Contact Khizer Hayat for UI UX roles, mobile apps, web apps, SaaS dashboards, product redesign, design systems, prototypes, and developer-ready handoff.",
  },
};

const ROUTE_PATHS = new Set(Object.keys(ROUTE_META));

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

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
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleNavigation = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      if (link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      const nextPath = normalizePath(url.pathname);
      if (!ROUTE_PATHS.has(nextPath)) return;

      if (nextPath === path && url.hash) return;

      event.preventDefault();
      if (nextPath !== path) {
        window.history.pushState({}, "", `${nextPath}${url.hash}`);
        setPath(nextPath);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [path]);

  useEffect(() => {
    const warmRouteChunks = () => {
      void import("./pages/About");
      void import("./pages/Contact");
      void import("./pages/FAQ");
      void import("./pages/Home");
      void import("./pages/Services");
      void import("./pages/Work");
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmRouteChunks, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(warmRouteChunks, 1200);
    return () => globalThis.clearTimeout(timeoutId);
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
      <Navbar currentPath={path} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <PageTransition key={path}>
          <Suspense fallback={<div className="min-h-screen bg-paper dark:bg-ink" />}>{page}</Suspense>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}

export default App;
