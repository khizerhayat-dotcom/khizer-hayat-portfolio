import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import aiVoiceChangerCover from "../assets/work/covers-optimized/ai-voice-changer.webp";
import aspireThumbnail2Cover from "../assets/work/covers-optimized/aspire-thumbnail-2.webp";
import betterBrainCover from "../assets/work/covers-optimized/better-brain.webp";
import drgMiningCover from "../assets/work/covers-optimized/drg-mining.webp";
import eshaafiCover from "../assets/work/covers-optimized/eshaafi.webp";
import fitnessLogoCover from "../assets/work/covers-optimized/fitness-logo.webp";
import hdCameraCover from "../assets/work/covers-optimized/hd-camera.webp";
import liMiningAppCover from "../assets/work/covers-optimized/li-mining-app.webp";
import pdfSignatureCover from "../assets/work/covers-optimized/pdf-signature.webp";
import priceTrackerIconCover from "../assets/work/covers-optimized/price-tracker-icon.webp";
import screenshotsCover from "../assets/work/covers-optimized/screenshots.webp";
import snaptuneCover from "../assets/work/covers-optimized/snaptune.webp";
import tattooMeCover from "../assets/work/covers-optimized/tattoo-me.webp";

type WorkImage = {
  load: () => Promise<string>;
  alt: string;
  label: string;
  path: string;
};

type WorkProject = {
  title: string;
  category: string;
  behance?: string;
  cover: WorkImage | null;
  images: WorkImage[];
};

const optimizedImageModules = import.meta.glob("../assets/work/gallery/**/*.webp", {
  import: "default",
  query: "?url",
}) as Record<string, () => Promise<string>>;

const imageModules = optimizedImageModules;

const categoryByProject: Record<string, string> = {
  "AI Voice Changer": "Mobile App",
  "Aspire Webapp": "Web App",
  "Better Brain": "Mobile App",
  "DRG Mining": "Mobile App",
  eShaafi: "Healthcare Product",
  "Fitness Logo": "Brand Identity",
  "HD Camera": "Mobile App",
  "Li Mining App": "Mobile App",
  "PDF Signature": "Mobile App",
  "Price Tracker Icon": "App Icon",
  Screenshots: "Product Screens",
  Snaptune: "Mobile App",
  "Tattoo Me": "Mobile App",
};

const behanceByProject: Record<string, string> = {
  "AI Voice Changer": "https://www.behance.net/gallery/248229051/AI-Voice-App-UIUX-Design-Mobile-App-Case-Study",
  "Aspire Webapp": "https://www.behance.net/gallery/247650653/Aspire-AI-Platform-Complete-UIUX",
  eShaafi: "https://www.behance.net/gallery/236362169/eShaafi-Telehealth-App-UIUX-Design",
  "Fitness Logo": "https://www.behance.net/gallery/248229381/FitMove-Fitness-Brand-Identity-Case-Study",
  "HD Camera": "https://www.behance.net/gallery/244588467/HD-Camera-App-UI-UX-Design",
  "Li Mining App": "https://www.behance.net/gallery/244718337/LI-Mining-App-UI-UX-Design",
  "DRG Mining": "https://www.behance.net/gallery/244651401/Crypto-Mining-App-UI-UX-Design",
  "PDF Signature": "https://www.behance.net/gallery/244577243/PDF-Signature-and-Scanner-App-UI-UX-Design",
  "Price Tracker Icon": "https://www.behance.net/gallery/248228453/Price-Tracker-App-Icon-Design-iOS-Icon-Case-Study",
  Snaptune: "https://www.behance.net/gallery/245443889/Snaptune-Ai-Photo-Editor-UiUx-Case-Study",
  "Tattoo Me": "https://www.behance.net/gallery/244577069/Tattoo-Me-AI-App-UI-UX-Design",
  Screenshots: "https://www.behance.net/gallery/245202699/Phone-Cleaner-App-Store-Screenshots",
  "Better Brain": "https://www.behance.net/khizerhayat8743",
};

const projectOrder = [
  "Aspire Webapp",
  "AI Voice Changer",
  "Snaptune",
  "eShaafi",
  "HD Camera",
  "PDF Signature",
  "Li Mining App",
  "DRG Mining",
  "Price Tracker Icon",
  "Fitness Logo",
  "Screenshots",
  "Tattoo Me",
  "Better Brain",
];

const pathSorter = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

const preferredCoverByProject: Record<string, string> = {
  "AI Voice Changer": "1_Dribble Cover.png",
  "Aspire Webapp": "Aspire Case Study.png",
  "Better Brain": "0_Cover.png",
  "DRG Mining": "Dribble Cover.png",
  eShaafi: "Cover.png",
  "Fitness Logo": "0_Cover.png",
  "HD Camera": "cover.png",
  "Li Mining App": "Dribble Cover.png",
  "PDF Signature": "LinkedIn Post.png",
  "Price Tracker Icon": "0_Cover.png",
  Screenshots: "Phone Cleaner.png",
  Snaptune: "1.png",
  "Tattoo Me": "Dribble Cover.png",
};

const coverOverrideByProject: Record<string, WorkImage> = {
  "Aspire Webapp": {
    load: () => Promise.resolve(aspireThumbnail2Cover),
    alt: "Aspire Webapp thumbnail",
    label: "Thumbnail 2",
    path: "src/assets/work/covers-optimized/aspire-thumbnail-2.webp",
  },
  "AI Voice Changer": {
    load: () => Promise.resolve(aiVoiceChangerCover),
    alt: "AI Voice Changer cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/ai-voice-changer.webp",
  },
  Snaptune: {
    load: () => Promise.resolve(snaptuneCover),
    alt: "Snaptune cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/snaptune.webp",
  },
  eShaafi: {
    load: () => Promise.resolve(eshaafiCover),
    alt: "eShaafi cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/eshaafi.webp",
  },
  "HD Camera": {
    load: () => Promise.resolve(hdCameraCover),
    alt: "HD Camera cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/hd-camera.webp",
  },
  "PDF Signature": {
    load: () => Promise.resolve(pdfSignatureCover),
    alt: "PDF Signature cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/pdf-signature.webp",
  },
  "Li Mining App": {
    load: () => Promise.resolve(liMiningAppCover),
    alt: "Li Mining App cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/li-mining-app.webp",
  },
  "DRG Mining": {
    load: () => Promise.resolve(drgMiningCover),
    alt: "DRG Mining cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/drg-mining.webp",
  },
  "Price Tracker Icon": {
    load: () => Promise.resolve(priceTrackerIconCover),
    alt: "Price Tracker Icon cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/price-tracker-icon.webp",
  },
  "Fitness Logo": {
    load: () => Promise.resolve(fitnessLogoCover),
    alt: "Fitness Logo cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/fitness-logo.webp",
  },
  Screenshots: {
    load: () => Promise.resolve(screenshotsCover),
    alt: "Screenshots cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/screenshots.webp",
  },
  "Tattoo Me": {
    load: () => Promise.resolve(tattooMeCover),
    alt: "Tattoo Me cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/tattoo-me.webp",
  },
  "Better Brain": {
    load: () => Promise.resolve(betterBrainCover),
    alt: "Better Brain cover",
    label: "Cover",
    path: "src/assets/work/covers-optimized/better-brain.webp",
  },
};

function toTitle(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getTopLevelProject(path: string) {
  const parts = path.split("/");
  const galleryIndex = parts.indexOf("gallery");
  const rawName = galleryIndex >= 0 ? parts[galleryIndex + 1] : "Project";
  if (rawName === "eShaafi") return "eShaafi";
  return toTitle(rawName);
}

function getImageLabel(path: string) {
  const fileName = path.split("/").at(-1) ?? "Project Image";
  const label = toTitle(fileName);
  if (/^\d+$/.test(label)) return `Screen ${label.padStart(2, "0")}`;
  return label;
}

function getFileName(path: string) {
  return path.split("/").at(-1) ?? "";
}

function coverPriority(projectTitle: string, image: WorkImage) {
  const fileName = getFileName(image.path).toLowerCase();
  const preferredFileName = preferredCoverByProject[projectTitle]?.toLowerCase();

  if (preferredFileName && fileName === preferredFileName) return 0;
  if (/\bcover\b|_cover|dribble cover|behance cover|thumbnail|thumb|hero/.test(fileName)) return 1;
  if (/^1[\s_.-]/.test(fileName)) return 2;
  return 3;
}

function getProjectCover(project: WorkProject) {
  const coverOverride = coverOverrideByProject[project.title];
  if (coverOverride) return coverOverride;

  return [...project.images].sort((first, second) => {
    const priorityDelta = coverPriority(project.title, first) - coverPriority(project.title, second);
    if (priorityDelta !== 0) return priorityDelta;
    return pathSorter.compare(first.path, second.path);
  })[0] ?? null;
}

const WORK_PROJECTS: WorkProject[] = Array.from(
  Object.entries(imageModules)
    .sort(([firstPath], [secondPath]) => pathSorter.compare(firstPath, secondPath))
    .reduce<Map<string, WorkProject>>((projects, [path, load]) => {
      const title = getTopLevelProject(path);
      const project = projects.get(title) ?? {
        title,
        category: categoryByProject[title] ?? "Product Design",
        behance: behanceByProject[title],
        cover: null,
        images: [],
      };

      const label = getImageLabel(path);
      project.images.push({
        load,
        label,
        path,
        alt: `${title} ${label}`,
      });
      projects.set(title, project);
      return projects;
    }, new Map())
    .values(),
)
  .map((project) => ({ ...project, cover: getProjectCover(project) }))
  .sort((first, second) => projectOrder.indexOf(first.title) - projectOrder.indexOf(second.title));

function LazyAssetImage({
  image,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
}: {
  image: WorkImage | null;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const loadImage = () => {
      image.load().then((loadedSrc) => {
        if (!cancelled) setSrc(loadedSrc);
      });
    };

    if (loading === "eager") {
      loadImage();
      return () => {
        cancelled = true;
      };
    }

    const element = imageRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      loadImage();
      return () => {
        cancelled = true;
      };
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadImage();
          observer?.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(element);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [image, loading]);

  return (
    <img
      ref={imageRef}
      src={src ?? undefined}
      alt={alt ?? image?.alt ?? ""}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const activeProject = activeProjectIndex === null ? null : WORK_PROJECTS[activeProjectIndex];

  return (
    <main id="top" className="min-h-screen bg-paper pt-32 text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="relative mx-auto max-w-[1320px] overflow-hidden px-6 pb-14 sm:px-10 lg:px-16 lg:pb-20">
        <div className="pointer-events-none absolute right-[-14rem] top-16 h-96 w-96 rounded-full bg-flame/10 blur-3xl dark:bg-flame/15" />
        <Reveal>
          <div className="relative flex flex-col gap-7 border-b border-black/10 pb-8 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[820px]">
              <a
                href="/"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-colors duration-200 hover:border-flame hover:text-flame dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-flame dark:hover:text-flame"
              >
                <span aria-hidden="true">&larr;</span>
                Home
              </a>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Selected Work Archive</p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-[-0.01em] text-ink dark:text-white sm:text-6xl lg:text-7xl">
                Mobile products, dashboards, and shipped product visuals.
              </h1>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-ink/60 dark:text-white/60 sm:text-lg">
                A focused gallery of product design work across AI apps, healthcare, utilities, media tools, and dashboards.
              </p>
            </div>
            <div className="grid max-w-[440px] grid-cols-2 gap-3 text-sm sm:min-w-[380px]">
              <div className="rounded-[24px] border border-black/10 bg-white/85 p-5 shadow-[0_16px_45px_rgba(20,10,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none">
                <p className="font-display text-3xl font-bold text-ink dark:text-white">40+</p>
                <p className="mt-1 text-ink/55 dark:text-white/60">Products Shipped</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-white/85 p-5 shadow-[0_16px_45px_rgba(20,10,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none">
                <p className="font-display text-3xl font-bold text-ink dark:text-white">10M+</p>
                <p className="mt-1 text-ink/55 dark:text-white/60">App Downloads</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-9 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {WORK_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.03}>
              <motion.button
                type="button"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setActiveProjectIndex(index)}
                className="group h-full overflow-hidden rounded-[28px] border border-black/10 bg-white text-left shadow-[0_18px_50px_rgba(20,10,0,0.08)] transition-colors duration-300 hover:border-flame/35 hover:shadow-[0_24px_65px_rgba(20,10,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-4 focus-visible:ring-offset-paper dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:hover:border-flame/45 dark:focus-visible:ring-offset-ink"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/[0.04] dark:bg-white/[0.04]">
                  <LazyAssetImage
                    image={project.cover}
                    alt={`${project.title} cover`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.045]"
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="w-fit rounded-full bg-flame/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-flame">
                    {project.category}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-flame dark:text-white sm:text-3xl">
                    {project.title}
                  </h2>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-flame">View Project</span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/12 text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/15 dark:text-white"
                      aria-hidden="true"
                    >
                      <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </section>

      {activeProject && (
        <ProjectGallery
          project={activeProject}
          onClose={() => setActiveProjectIndex(null)}
          onNextProject={() => setActiveProjectIndex((index) => (index === null ? 0 : (index + 1) % WORK_PROJECTS.length))}
          onPreviousProject={() =>
            setActiveProjectIndex((index) => (index === null ? 0 : (index - 1 + WORK_PROJECTS.length) % WORK_PROJECTS.length))
          }
        />
      )}
    </main>
  );
}

function ProjectGallery({
  project,
  onClose,
  onNextProject,
  onPreviousProject,
}: {
  project: WorkProject;
  onClose: () => void;
  onNextProject: () => void;
  onPreviousProject: () => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activeImage = project.images[activeImageIndex];

  const imageCountLabel = useMemo(
    () => `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`,
    [activeImageIndex, project.images.length],
  );

  const goToPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + project.images.length) % project.images.length);
  };

  const goToNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % project.images.length);
  };

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.title]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goToPreviousImage();
      if (event.key === "ArrowRight") goToNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto bg-paper px-4 py-5 transition-colors duration-300 dark:bg-ink sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
    >
      <div className="mx-auto flex min-h-full max-w-[1320px] flex-col">
        <div className="sticky top-0 z-20 -mx-4 border-b border-black/10 bg-paper/95 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-ink/95 sm:-mx-6 sm:px-6">
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flame">{project.category}</p>
              <h2 className="mt-1 font-display text-3xl font-bold text-ink dark:text-white sm:text-4xl">
                {project.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {project.behance && (
                <a
                  href={project.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] dark:bg-white dark:text-black"
                >
                  View on Behance
                </a>
              )}
              <button
                type="button"
                onClick={onPreviousProject}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-colors duration-200 hover:border-flame hover:text-flame dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-flame dark:hover:text-flame"
              >
                Prev Project
              </button>
              <button
                type="button"
                onClick={onNextProject}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-colors duration-200 hover:border-flame hover:text-flame dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-flame dark:hover:text-flame"
              >
                Next Project
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-flame hover:text-flame dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-flame dark:hover:text-flame"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="grid flex-1 gap-5 py-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div
            className="relative overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_22px_70px_rgba(20,10,0,0.12)] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
            onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
            onTouchEnd={(event) => {
              if (touchStart === null) return;
              const distance = touchStart - (event.changedTouches[0]?.clientX ?? touchStart);
              if (Math.abs(distance) > 45) {
                if (distance > 0) goToNextImage();
                else goToPreviousImage();
              }
              setTouchStart(null);
            }}
          >
            <div className="flex min-h-[420px] items-center justify-center bg-black/[0.03] p-3 dark:bg-black/20 sm:min-h-[560px] sm:p-5">
              <LazyAssetImage
                key={activeImage.path}
                image={activeImage}
                alt={activeImage.alt}
                className="max-h-[74vh] w-full rounded-[20px] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <button
              type="button"
              onClick={goToPreviousImage}
              className="absolute left-3 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-ink shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-200 hover:scale-[1.06] hover:border-flame hover:text-flame active:scale-[0.96] dark:border-white/10 dark:bg-ink/90 dark:text-white dark:hover:border-flame dark:hover:text-flame sm:left-5 sm:h-16 sm:w-16"
              aria-label="Previous image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNextImage}
              className="absolute right-3 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-ink shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-200 hover:scale-[1.06] hover:border-flame hover:text-flame active:scale-[0.96] dark:border-white/10 dark:bg-ink/90 dark:text-white dark:hover:border-flame dark:hover:text-flame sm:right-5 sm:h-16 sm:w-16"
              aria-label="Next image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <aside className="rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_18px_50px_rgba(20,10,0,0.08)] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flame">Gallery</p>
                <p className="mt-1 text-sm text-ink/55 dark:text-white/60">{imageCountLabel}</p>
              </div>
              <p className="text-sm font-medium text-ink dark:text-white">{activeImage.label}</p>
            </div>
            <div className="mt-4 grid max-h-[62vh] grid-cols-3 gap-2 overflow-y-auto pr-1 lg:grid-cols-2">
              {project.images.map((image, index) => (
                <button
                  type="button"
                  key={image.path}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-2xl border transition-all duration-200 ${
                    index === activeImageIndex
                      ? "border-flame ring-2 ring-flame/25"
                      : "border-black/10 opacity-70 hover:opacity-100 dark:border-white/10"
                  }`}
                  aria-label={`Show ${image.label}`}
                >
                  <LazyAssetImage image={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
