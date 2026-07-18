import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import { PageTransition } from "./components/ui";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import { ROUTE_META, SITE_URL } from "./seo";

export type Theme = "light" | "dark";

const ROUTE_PATHS = new Set(Object.keys(ROUTE_META));

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function setMetaTag(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);
  element?.setAttribute(attribute, value);
}

interface AppProps {
  initialPath?: string;
}

function App({ initialPath }: AppProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return "light";
  });
  const [path, setPath] = useState(() => {
    if (initialPath) return normalizePath(initialPath);
    if (typeof window === "undefined") return "/";
    return normalizePath(window.location.pathname);
  });

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
    const meta = ROUTE_META[path] ?? ROUTE_META["/"];
    const canonicalUrl = new URL(path === "/" ? "/" : path, SITE_URL).toString();

    document.title = meta.title;
    setMetaTag('meta[name="description"]', "content", meta.description);
    setMetaTag('meta[property="og:title"]', "content", meta.title);
    setMetaTag('meta[property="og:description"]', "content", meta.description);
    setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', "content", meta.title);
    setMetaTag('meta[name="twitter:description"]', "content", meta.description);
    setMetaTag('meta[name="twitter:url"]', "content", canonicalUrl);
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
          {page}
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}

export default App;
