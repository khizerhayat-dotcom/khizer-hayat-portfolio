export const SITE_URL = "https://khizer-hayat-portfolio.vercel.app/";

export const PUBLIC_PROFILES = [
  "https://linkedin.com/in/khizerdesigner/",
  "https://www.behance.net/khizerhayat8743",
] as const;

export const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Khizer Hayat - UI/UX Designer",
    description:
      "Portfolio for mobile apps, web apps, SaaS dashboards, AI products, healthcare platforms, design systems, prototypes, and developer handoff.",
  },
  "/work": {
    title: "Work - Khizer Hayat",
    description:
      "Selected UI/UX design projects across mobile apps, web apps, SaaS dashboards, AI products, and product systems.",
  },
  "/about": {
    title: "About - Khizer Hayat",
    description:
      "About Khizer Hayat, a UI/UX Designer from Lahore, Pakistan focused on product design, app design, dashboards, and scalable design systems.",
  },
  "/services": {
    title: "Services - Khizer Hayat",
    description:
      "UI/UX design services for mobile apps, web apps, SaaS dashboards, product redesigns, prototypes, and developer handoff.",
  },
  "/faq": {
    title: "FAQ - Khizer Hayat",
    description:
      "Answers about working with Khizer Hayat on UI/UX design, product redesign, app design, dashboards, timelines, and handoff.",
  },
  "/contact": {
    title: "Contact - Khizer Hayat",
    description:
      "Contact Khizer Hayat for UI/UX design, mobile app design, web app design, SaaS dashboards, and product design work.",
  },
};

export const FAQ_ITEMS = [
  {
    question: "What type of products do you design?",
    answer:
      "Mobile apps, web apps, SaaS dashboards, admin panels, AI products, healthcare platforms, and design systems.",
  },
  {
    question: "Do you design complete products or only screens?",
    answer:
      "Complete product flows. I can cover wireframes, UI, prototypes, edge states, and developer-ready Figma handoff.",
  },
  {
    question: "Can you improve an existing app UI?",
    answer:
      "Yes. I redesign structure, hierarchy, navigation, visual polish, and key journeys across mobile and web.",
  },
  {
    question: "What does your design process look like?",
    answer:
      "I clarify goals, map flows, design high-fidelity screens, prototype important paths, then prepare handoff.",
  },
  {
    question: "How long does a product design project take?",
    answer:
      "Focused redesigns often take one to three weeks. Larger apps, dashboards, or platforms usually need three to six weeks depending on scope.",
  },
  {
    question: "Do you provide developer handoff?",
    answer:
      "Yes. I provide organized Figma files, components, specs, assets, interaction notes, and design QA support.",
  },
  {
    question: "Can you create design systems for existing products?",
    answer:
      "Yes. I define typography, color, spacing, components, states, patterns, and usage rules for scalable UI.",
  },
  {
    question: "Are you available for full-time roles or freelance projects?",
    answer:
      "Yes. I am open to UI/UX roles, mobile apps, web apps, SaaS dashboards, redesigns, systems, prototypes, and handoff work.",
  },
] as const;

export function getCanonicalUrl(route: string) {
  return new URL(route === "/" ? "/" : route, SITE_URL).toString();
}

export function getStructuredData(route: string) {
  const meta = ROUTE_META[route] ?? ROUTE_META["/"];
  const url = getCanonicalUrl(route);
  const personId = `${SITE_URL}#person`;
  const websiteId = `${SITE_URL}#website`;
  const pageId = `${url}#webpage`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Khizer Hayat",
    url: SITE_URL,
    jobTitle: "UI/UX Designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    description:
      "Khizer Hayat is a UI/UX Designer from Lahore, Pakistan focused on mobile apps, web apps, SaaS dashboards, AI products, healthcare platforms, design systems, prototypes, and developer handoff.",
    knowsAbout: [
      "Mobile app UI/UX design",
      "Web app UI/UX design",
      "SaaS dashboard design",
      "Product design",
      "Product redesign",
      "Design systems",
      "Figma prototypes",
      "Developer handoff",
    ],
    sameAs: [...PUBLIC_PROFILES],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Khizer Hayat Portfolio",
    url: SITE_URL,
    description: ROUTE_META["/"].description,
    publisher: {
      "@id": personId,
    },
    inLanguage: "en",
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": personId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}assets/seo/og-image.webp`,
    },
    inLanguage: "en",
  };

  if (route !== "/faq") return [person, website, webpage];

  return [
    person,
    website,
    webpage,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      name: meta.title,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
