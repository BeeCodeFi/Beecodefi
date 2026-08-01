"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Palette,
  Braces,
  Rocket,
  BookOpen,
  Brain,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Compass,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";
import SplitText from "@/components/ui/SplitText";
import { useAuth } from "@/context/AuthContext";
import { getUserStorageKey } from "@/lib/userStorage";
import { useBadges } from "@/hooks/useBadges";

// ── Data ──────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    number: "01",
    arc: "Foundations",
    level: "Beginner",
    emoji: "🏗️",
    title: "HTML",
    fullTitle: "HTML Fundamentals",
    tagline: "The skeleton of the web",
    desc: "Every website on the planet starts here. Learn how browsers read markup, give your content structure and meaning, build accessible forms, and write semantic code that search engines love.",
    accent: "#ea6b1a",
    darkBg: "#110700",
    lightCardBg: "#fff8f2",
    lightBorder: "#f7c9a0",
    lightNumColor: "#f4b07a",
    gradient: "from-orange-500 to-red-500",
    shadow: "0 20px 60px rgba(234,107,26,0.18)",
    tutorialSlug: "html",
    time: "1–2 wks",
    icon: FileCode2,
    skills: [
      "Elements & Tags",
      "Semantic HTML5",
      "Forms & Inputs",
      "Tables",
      "Accessibility",
    ],
    stat: "11",
    statUnit: "lessons",
  },
  {
    id: 2,
    number: "02",
    arc: "Foundations",
    level: "Beginner",
    emoji: "🎨",
    title: "CSS",
    fullTitle: "CSS Mastery",
    tagline: "Make it beautiful",
    desc: "Turn raw HTML into stunning, responsive interfaces. Flexbox, Grid, animations, custom properties, dark mode — this is where your pages start looking like real products.",
    accent: "#2563eb",
    darkBg: "#00050f",
    lightCardBg: "#f2f6ff",
    lightBorder: "#93c5fd",
    lightNumColor: "#93c5fd",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "0 20px 60px rgba(37,99,235,0.14)",
    tutorialSlug: "css",
    time: "2–4 wks",
    icon: Palette,
    skills: [
      "Selectors & Specificity",
      "Box Model",
      "Flexbox & Grid",
      "Responsive Design",
      "Animations",
    ],
    stat: "18",
    statUnit: "lessons",
  },
  {
    id: 3,
    number: "03",
    arc: "Foundations",
    level: "Beginner",
    emoji: "⚡",
    title: "JavaScript",
    fullTitle: "JavaScript Essentials",
    tagline: "Bring it to life",
    desc: "Pages become applications. Handle events, fetch real data from APIs, manipulate the DOM dynamically, and master the ES6+ features every modern developer uses every single day.",
    accent: "#b45309",
    darkBg: "#0f0d00",
    lightCardBg: "#fffcf0",
    lightBorder: "#fcd34d",
    lightNumColor: "#fbbf24",
    gradient: "from-yellow-500 to-amber-500",
    shadow: "0 20px 60px rgba(180,83,9,0.14)",
    tutorialSlug: "javascript",
    time: "4–6 wks",
    icon: Braces,
    skills: [
      "Functions & Scope",
      "DOM Manipulation",
      "Events",
      "Async / Await",
      "ES6+ Features",
    ],
    stat: "24",
    statUnit: "lessons",
  },
  {
    id: 4,
    number: "04",
    arc: "Foundations",
    level: "Intermediate",
    emoji: "🔷",
    title: "TypeScript",
    fullTitle: "TypeScript",
    tagline: "Types before bugs find you",
    desc: "Make JavaScript safer and easier to refactor with expressive types, interfaces, generics, and a workflow that catches mistakes before they reach production.",
    accent: "#3178c6",
    darkBg: "#00111f",
    lightCardBg: "#f1f7ff",
    lightBorder: "#93c5fd",
    lightNumColor: "#93c5fd",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "0 20px 60px rgba(49,120,198,0.16)",
    tutorialSlug: null,
    time: "2–3 wks",
    icon: Braces,
    skills: ["TypeScript", "Interfaces", "Generics", "Type Narrowing"],
    stat: "12",
    statUnit: "lessons",
  },
  {
    id: 5,
    number: "05",
    arc: "Foundations",
    level: "Beginner",
    emoji: "🔀",
    title: "Git",
    fullTitle: "Git & GitHub Collaboration",
    tagline: "Work like a real team",
    desc: "Build the collaboration habits used by professional teams: branching, pull requests, code review, conflict resolution, and a clean project history.",
    accent: "#f05032",
    darkBg: "#1c0804",
    lightCardBg: "#fff5f2",
    lightBorder: "#fdba74",
    lightNumColor: "#fdba74",
    gradient: "from-orange-600 to-red-500",
    shadow: "0 20px 60px rgba(240,80,50,0.16)",
    tutorialSlug: null,
    time: "1 wk",
    icon: Layers,
    skills: ["Git", "GitHub", "Pull Requests", "Code Review"],
    stat: "9",
    statUnit: "lessons",
  },
  {
    id: 6,
    number: "06",
    arc: "Frontend",
    level: "Intermediate",
    emoji: "⚛️",
    title: "Frameworks",
    fullTitle: "A Frontend Framework",
    tagline: "Componentize everything",
    desc: "Move from pages to reusable interfaces with component architecture, props, state, events, and the framework patterns behind modern frontend products.",
    accent: "#06b6d4",
    darkBg: "#001217",
    lightCardBg: "#effcff",
    lightBorder: "#67e8f9",
    lightNumColor: "#67e8f9",
    gradient: "from-cyan-500 to-blue-500",
    shadow: "0 20px 60px rgba(6,182,212,0.16)",
    tutorialSlug: null,
    time: "6–8 wks",
    icon: Rocket,
    skills: ["React", "Vue", "Angular", "Svelte"],
    stat: "20",
    statUnit: "lessons",
  },
  {
    id: 7,
    number: "07",
    arc: "Frontend",
    level: "Intermediate",
    emoji: "🌐",
    title: "SSR",
    fullTitle: "Meta-Frameworks & SSR",
    tagline: "Production-grade frontend",
    desc: "Learn how routing, server rendering, caching, and full-stack frontend conventions turn a component library into a production-ready application.",
    accent: "#0f766e",
    darkBg: "#001713",
    lightCardBg: "#effcf9",
    lightBorder: "#5eead4",
    lightNumColor: "#5eead4",
    gradient: "from-teal-500 to-emerald-500",
    shadow: "0 20px 60px rgba(15,118,110,0.16)",
    tutorialSlug: null,
    time: "4–6 wks",
    icon: Layers,
    skills: ["Next.js", "Remix", "Nuxt", "SSR"],
    stat: "16",
    statUnit: "lessons",
  },
  {
    id: 8,
    number: "08",
    arc: "Frontend",
    level: "Intermediate",
    emoji: "🔄",
    title: "State",
    fullTitle: "State & Data Fetching",
    tagline: "Keep your app in sync",
    desc: "Coordinate local state, server state, loading, errors, caching, and optimistic updates so interfaces stay predictable as they grow.",
    accent: "#0891b2",
    darkBg: "#00131a",
    lightCardBg: "#effaff",
    lightBorder: "#67e8f9",
    lightNumColor: "#67e8f9",
    gradient: "from-cyan-600 to-teal-500",
    shadow: "0 20px 60px rgba(8,145,178,0.16)",
    tutorialSlug: null,
    time: "3–4 wks",
    icon: Brain,
    skills: ["Redux Toolkit", "Zustand", "TanStack Query", "Caching"],
    stat: "14",
    statUnit: "lessons",
  },
  {
    id: 9,
    number: "09",
    arc: "Backend",
    level: "Intermediate",
    emoji: "🧠",
    title: "Node.js",
    fullTitle: "Backend with Node.js",
    tagline: "Give it a brain",
    desc: "Build server-side applications with JavaScript, from request handling and middleware to structured services and scalable backend architecture.",
    accent: "#16a34a",
    darkBg: "#031408",
    lightCardBg: "#f0fdf4",
    lightBorder: "#86efac",
    lightNumColor: "#86efac",
    gradient: "from-green-600 to-emerald-500",
    shadow: "0 20px 60px rgba(22,163,74,0.16)",
    tutorialSlug: null,
    time: "6–8 wks",
    icon: Braces,
    skills: ["Node.js", "Express", "NestJS", "Middleware"],
    stat: "22",
    statUnit: "lessons",
  },
  {
    id: 10,
    number: "10",
    arc: "Backend",
    level: "Intermediate",
    emoji: "🔗",
    title: "APIs",
    fullTitle: "REST & GraphQL APIs",
    tagline: "Let systems talk to each other",
    desc: "Design clear contracts between services and clients with resource modeling, validation, errors, authentication boundaries, and flexible query patterns.",
    accent: "#059669",
    darkBg: "#00140e",
    lightCardBg: "#ecfdf5",
    lightBorder: "#6ee7b7",
    lightNumColor: "#6ee7b7",
    gradient: "from-emerald-600 to-teal-500",
    shadow: "0 20px 60px rgba(5,150,105,0.16)",
    tutorialSlug: null,
    time: "3–4 wks",
    icon: ArrowRight,
    skills: ["REST", "GraphQL", "tRPC", "API Design"],
    stat: "14",
    statUnit: "lessons",
  },
  {
    id: 11,
    number: "11",
    arc: "Backend",
    level: "Intermediate",
    emoji: "🗄️",
    title: "Databases",
    fullTitle: "Databases & ORMs",
    tagline: "Give it memory",
    desc: "Model persistent data, choose the right storage approach, write efficient queries, and use an ORM without losing sight of the database underneath.",
    accent: "#0284c7",
    darkBg: "#00121d",
    lightCardBg: "#f0f9ff",
    lightBorder: "#7dd3fc",
    lightNumColor: "#7dd3fc",
    gradient: "from-sky-600 to-blue-500",
    shadow: "0 20px 60px rgba(2,132,199,0.16)",
    tutorialSlug: null,
    time: "4–5 wks",
    icon: Layers,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    stat: "18",
    statUnit: "lessons",
  },
  {
    id: 12,
    number: "12",
    arc: "Backend",
    level: "Intermediate",
    emoji: "🔒",
    title: "Security",
    fullTitle: "Auth & Security",
    tagline: "Lock it down",
    desc: "Protect user accounts and application data with secure password handling, sessions, tokens, OAuth flows, authorization, and threat-aware defaults.",
    accent: "#dc2626",
    darkBg: "#1b0505",
    lightCardBg: "#fff5f5",
    lightBorder: "#fca5a5",
    lightNumColor: "#fca5a5",
    gradient: "from-red-600 to-orange-500",
    shadow: "0 20px 60px rgba(220,38,38,0.16)",
    tutorialSlug: null,
    time: "2–3 wks",
    icon: Compass,
    skills: ["JWT", "OAuth 2.0", "bcrypt", "OWASP Top 10"],
    stat: "12",
    statUnit: "lessons",
  },
  {
    id: 13,
    number: "13",
    arc: "Quality & Ops",
    level: "Intermediate",
    emoji: "🧪",
    title: "Testing",
    fullTitle: "Testing",
    tagline: "Trust your own code",
    desc: "Create confidence at every level with unit, component, integration, and end-to-end tests that protect behavior while your product evolves.",
    accent: "#7c3aed",
    darkBg: "#0c0517",
    lightCardBg: "#faf5ff",
    lightBorder: "#c4b5fd",
    lightNumColor: "#c4b5fd",
    gradient: "from-violet-600 to-fuchsia-500",
    shadow: "0 20px 60px rgba(124,58,237,0.16)",
    tutorialSlug: null,
    time: "3–4 wks",
    icon: CheckCircle2,
    skills: ["Jest", "React Testing Library", "Playwright", "Test Strategy"],
    stat: "16",
    statUnit: "lessons",
  },
  {
    id: 14,
    number: "14",
    arc: "Quality & Ops",
    level: "Intermediate",
    emoji: "📦",
    title: "Containers",
    fullTitle: "Docker & Containers",
    tagline: "Same app, everywhere",
    desc: "Package applications and their dependencies into repeatable environments that behave consistently from a laptop to a deployment pipeline.",
    accent: "#2563eb",
    darkBg: "#020b1f",
    lightCardBg: "#eff6ff",
    lightBorder: "#93c5fd",
    lightNumColor: "#93c5fd",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "0 20px 60px rgba(37,99,235,0.16)",
    tutorialSlug: null,
    time: "2 wks",
    icon: Layers,
    skills: ["Docker", "Docker Compose", "Images", "Networking"],
    stat: "10",
    statUnit: "lessons",
  },
  {
    id: 15,
    number: "15",
    arc: "Quality & Ops",
    level: "Intermediate",
    emoji: "⚙️",
    title: "CI/CD",
    fullTitle: "CI/CD & Git Workflows",
    tagline: "Ship without fear",
    desc: "Automate checks, builds, releases, and team workflows so every change gets feedback quickly and shipping becomes a dependable routine.",
    accent: "#f59e0b",
    darkBg: "#171004",
    lightCardBg: "#fffbeb",
    lightBorder: "#fcd34d",
    lightNumColor: "#fcd34d",
    gradient: "from-amber-500 to-orange-500",
    shadow: "0 20px 60px rgba(245,158,11,0.16)",
    tutorialSlug: null,
    time: "2 wks",
    icon: Rocket,
    skills: ["GitHub Actions", "Jenkins", "Trunk-based Dev", "Releases"],
    stat: "10",
    statUnit: "lessons",
  },
  {
    id: 16,
    number: "16",
    arc: "Quality & Ops",
    level: "Advanced",
    emoji: "☁️",
    title: "Cloud",
    fullTitle: "Cloud & Deployment",
    tagline: "Take it live",
    desc: "Deploy real applications, understand environments and infrastructure, and make informed choices across hosted platforms and cloud providers.",
    accent: "#0284c7",
    darkBg: "#00121d",
    lightCardBg: "#f0f9ff",
    lightBorder: "#7dd3fc",
    lightNumColor: "#7dd3fc",
    gradient: "from-sky-600 to-indigo-500",
    shadow: "0 20px 60px rgba(2,132,199,0.16)",
    tutorialSlug: null,
    time: "4 wks",
    icon: Layers,
    skills: ["AWS", "Vercel", "Google Cloud", "Azure"],
    stat: "16",
    statUnit: "lessons",
  },
  {
    id: 17,
    number: "17",
    arc: "Advanced",
    level: "Advanced",
    emoji: "☸️",
    title: "Kubernetes",
    fullTitle: "Kubernetes & Orchestration",
    tagline: "Scale beyond one server",
    desc: "Understand how containerized workloads are scheduled, configured, exposed, and scaled across clusters with infrastructure defined as code.",
    accent: "#326ce5",
    darkBg: "#020a1b",
    lightCardBg: "#eff6ff",
    lightBorder: "#93c5fd",
    lightNumColor: "#93c5fd",
    gradient: "from-blue-600 to-indigo-500",
    shadow: "0 20px 60px rgba(50,108,229,0.16)",
    tutorialSlug: null,
    time: "4–5 wks",
    icon: Layers,
    skills: ["Kubernetes", "Helm", "Terraform", "Clusters"],
    stat: "14",
    statUnit: "lessons",
    comingSoon: true,
  },
  {
    id: 18,
    number: "18",
    arc: "Advanced",
    level: "Advanced",
    emoji: "🏛️",
    title: "System Design",
    fullTitle: "System Design & Scalability",
    tagline: "Think in systems, not files",
    desc: "Reason about the tradeoffs behind resilient systems: traffic, data, latency, reliability, boundaries, and the components that keep services moving.",
    accent: "#9333ea",
    darkBg: "#11051d",
    lightCardBg: "#faf5ff",
    lightBorder: "#d8b4fe",
    lightNumColor: "#d8b4fe",
    gradient: "from-purple-600 to-fuchsia-500",
    shadow: "0 20px 60px rgba(147,51,234,0.16)",
    tutorialSlug: null,
    time: "4–6 wks",
    icon: Layers,
    skills: ["Load Balancing", "Caching", "Microservices", "Message Queues"],
    stat: "12",
    statUnit: "lessons",
  },
  {
    id: 19,
    number: "19",
    arc: "Advanced",
    level: "Advanced",
    emoji: "📈",
    title: "Observability",
    fullTitle: "Monitoring & Observability",
    tagline: "Know before your users tell you",
    desc: "Make production behavior visible with metrics, logs, traces, dashboards, alerts, and the habits that turn incidents into learning.",
    accent: "#0d9488",
    darkBg: "#001412",
    lightCardBg: "#f0fdfa",
    lightBorder: "#5eead4",
    lightNumColor: "#5eead4",
    gradient: "from-teal-600 to-cyan-500",
    shadow: "0 20px 60px rgba(13,148,136,0.16)",
    tutorialSlug: null,
    time: "2–3 wks",
    icon: Compass,
    skills: ["Grafana", "Datadog", "Prometheus", "Alerting"],
    stat: "10",
    statUnit: "lessons",
  },
  {
    id: 20,
    number: "20",
    arc: "Advanced",
    level: "Advanced",
    emoji: "✨",
    title: "Specialties",
    fullTitle: "Beyond Full-Stack",
    tagline: "Choose your specialty",
    desc: "Use your full-stack foundation to explore the direction that fits your interests, from mobile and AI engineering to platform and SRE work.",
    accent: "#7c3aed",
    darkBg: "#0c0517",
    lightCardBg: "#faf5ff",
    lightBorder: "#c4b5fd",
    lightNumColor: "#c4b5fd",
    gradient: "from-violet-600 to-pink-500",
    shadow: "0 20px 60px rgba(124,58,237,0.16)",
    tutorialSlug: null,
    time: "Ongoing",
    icon: Brain,
    skills: ["React Native", "AI Engineering", "Platform", "SRE"],
    stat: "Soon",
    statUnit: "coming",
    comingSoon: true,
  },
] as const;

type Step = (typeof STEPS)[number];

function ArcHeading({ name, isDark }: { name: string; isDark: boolean }) {
  return (
    <div
      className="mb-6 mt-10 flex items-center gap-3 first:mt-0"
      style={{ color: isDark ? "#cbd5e1" : "#334155" }}
    >
      <span
        className="h-px flex-1"
        style={{ background: isDark ? "rgba(255,255,255,0.14)" : "#cbd5e1" }}
      />
      <span
        className="relative z-10 px-3 text-xs font-black uppercase tracking-[0.28em]"
        style={{ background: isDark ? "#030712" : "#ffffff" }}
      >
        {name}
      </span>
      <span
        className="h-px flex-1"
        style={{ background: isDark ? "rgba(255,255,255,0.14)" : "#cbd5e1" }}
      />
    </div>
  );
}

type HybridStage = {
  phase: string;
  title: string;
  duration: string;
  icon: typeof FileCode2;
  accent: string;
  summary: string;
  focus: string;
  learn: string[];
  build: string[];
  outcome: string;
};

const HYBRID_ROADMAP: HybridStage[] = [
  {
    phase: "01",
    title: "Foundations",
    duration: "1–2 weeks",
    icon: FileCode2,
    accent: "#ea6b1a",
    summary:
      "Learn how the web is structured, then build your first real page.",
    focus: "HTML structure, semantic markup, forms, accessibility",
    learn: [
      "How browsers read HTML",
      "How semantic tags improve clarity",
      "How forms and accessibility make pages usable",
    ],
    build: [
      "A personal landing page",
      "A contact section with a form",
      "A polished structure using headings and sections",
    ],
    outcome:
      "You will understand the skeleton of the web and feel confident writing your own pages.",
  },
  {
    phase: "02",
    title: "Visual Design",
    duration: "1–2 weeks",
    icon: Palette,
    accent: "#2563eb",
    summary: "Turn structure into beautiful layouts and responsive interfaces.",
    focus: "CSS layout, spacing, responsiveness, design systems",
    learn: [
      "The box model and spacing",
      "Flexbox and Grid for layouts",
      "Responsive design and modern styling",
    ],
    build: [
      "A portfolio-style layout",
      "Responsive cards and navigation",
      "A dark/light theme toggle",
    ],
    outcome: "You will know how to give pages a professional look and feel.",
  },
  {
    phase: "03",
    title: "Interactive Logic",
    duration: "2–3 weeks",
    icon: Braces,
    accent: "#b45309",
    summary: "Make pages feel alive with JavaScript and user interaction.",
    focus: "Events, DOM updates, functions, async JavaScript",
    learn: [
      "Events and user input",
      "How the DOM changes in real time",
      "Fetch, promises, and async workflows",
    ],
    build: ["A quiz app", "A to-do list", "A small weather or trivia widget"],
    outcome:
      "You will be able to add real behavior to your projects instead of only static content.",
  },
  {
    phase: "04",
    title: "Modern Frontend",
    duration: "2–4 weeks",
    icon: Rocket,
    accent: "#7c3aed",
    summary: "Use React and Next.js to build scalable, component-based apps.",
    focus: "Components, state, routing, UI architecture",
    learn: [
      "Component thinking",
      "Hooks and state management",
      "Routing and reusable interfaces",
    ],
    build: [
      "A dashboard",
      "A blog or notes app",
      "A project gallery with real navigation",
    ],
    outcome:
      "You will move from simple pages to reusable products that feel like real software.",
  },
  {
    phase: "05",
    title: "Backend & Data",
    duration: "2–4 weeks",
    icon: Layers,
    accent: "#0f766e",
    summary:
      "Connect your frontend to real data and learn how apps persist information.",
    focus: "APIs, authentication, databases, deployment basics",
    learn: [
      "How frontend talks to backend",
      "Authentication and protected routes",
      "Databases and app persistence",
    ],
    build: [
      "A blog with saved posts",
      "A login flow",
      "A database-backed CRUD app",
    ],
    outcome:
      "You will understand how complete applications are built and why backend choices matter.",
  },
  {
    phase: "06",
    title: "Launch & Growth",
    duration: "2+ weeks",
    icon: BookOpen,
    accent: "#2563eb",
    summary:
      "Ship your work, get feedback, and level up with production habits.",
    focus: "Testing, deployment, analytics, AI-enhanced workflows",
    learn: [
      "Testing and debugging habits",
      "Deployment and performance basics",
      "How AI tools can speed up development",
    ],
    build: [
      "A polished portfolio project",
      "A deployed full-stack app",
      "An AI feature such as summaries or chat",
    ],
    outcome:
      "You will be ready to turn your learning into visible projects and a strong portfolio.",
  },
] as const;

function HybridRoadmapCard({
  item,
  isDark,
  expanded,
  onToggle,
  statusLabel,
  isActive,
  isComplete,
}: {
  item: HybridStage;
  isDark: boolean;
  expanded: boolean;
  onToggle: () => void;
  statusLabel: string;
  isActive: boolean;
  isComplete: boolean;
}) {
  const Icon = item.icon;
  const markerBg = isActive
    ? item.accent
    : isComplete
      ? "#10b981"
      : isDark
        ? "#111827"
        : "#ffffff";
  const markerBorder = isActive
    ? item.accent
    : isComplete
      ? "#10b981"
      : item.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-10 pb-4"
    >
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5"
        style={{
          background: `linear-gradient(to bottom, ${item.accent} 0%, ${item.accent} 100%)`,
          opacity: 0.35,
        }}
      />
      <div
        className="absolute left-[0.4rem] top-4 h-2.5 rounded-full"
        style={{
          width: isComplete ? "100%" : isActive ? "70%" : "30%",
          background: `linear-gradient(90deg, ${item.accent}, ${item.accent}55)`,
          height: "2px",
        }}
      />
      <div
        className="absolute left-0 top-4 w-8 h-8 rounded-full border-4 flex items-center justify-center shadow-lg"
        style={{
          borderColor: markerBorder,
          background: markerBg,
          boxShadow: `0 0 0 4px ${item.accent}18`,
        }}
      >
        {isComplete ? (
          <CheckCircle2 className="w-4 h-4 text-white" />
        ) : isActive ? (
          <Compass className="w-4 h-4 text-white" />
        ) : (
          <Icon className="w-4 h-4 text-white" />
        )}
      </div>

      <div
        className="rounded-3xl border p-5 ml-2 transition-all"
        style={{
          background: isDark ? "#111827" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
          boxShadow: isDark
            ? "0 20px 45px rgba(0,0,0,0.18)"
            : "0 20px 45px rgba(15,23,42,0.06)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div
              className="text-[11px] font-black uppercase tracking-[0.3em] mb-2"
              style={{ color: item.accent }}
            >
              {item.phase} · {item.duration}
            </div>
            <h3
              className="text-xl font-black"
              style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
            >
              {item.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: isDark ? "#cbd5e1" : "#475569" }}
            >
              {item.summary}
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: `${item.accent}14`,
              color: item.accent,
            }}
          >
            {statusLabel}
          </span>
        </div>

        <div
          className="mt-4 rounded-2xl p-3"
          style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-[0.24em] mb-2"
            style={{ color: item.accent }}
          >
            {item.focus}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
              >
                Learn
              </div>
              <ul
                className="space-y-1.5 text-sm"
                style={{ color: isDark ? "#9ca3af" : "#475569" }}
              >
                {item.learn.map((point) => (
                  <li key={point} className="flex gap-2">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: item.accent }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
              >
                Build
              </div>
              <ul
                className="space-y-1.5 text-sm"
                style={{ color: isDark ? "#9ca3af" : "#475569" }}
              >
                {item.build.map((point) => (
                  <li key={point} className="flex gap-2">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: item.accent }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: item.accent }}
          >
            {expanded ? "Hide details" : "Explore this step"}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
          {isActive && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: `${item.accent}14`, color: item.accent }}
            >
              You are here
            </span>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 rounded-2xl p-4"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                }}
              >
                <div
                  className="text-sm font-bold mb-2"
                  style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
                >
                  Why this step matters
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDark ? "#9ca3af" : "#475569" }}
                >
                  {item.outcome}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StepCard({
  step,
  index,
  isDark,
  badge,
  tutorialProgress,
}: {
  step: Step;
  index: number;
  isDark: boolean;
  badge?: { id: number; name: string; description: string; icon: string; isUnlocked: boolean; progress: number; requiredCount: number; color: string };
  tutorialProgress?: { slug: string; completed: number; total: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyState, setNotifyState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const isLeft = index % 2 === 0;

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifyState("loading");
    // Simulate API call
    setTimeout(() => {
      setNotifyState("success");
      setNotifyEmail("");
    }, 800);
  };

  const cardBg = isDark ? "rgb(17 24 39)" : step.lightCardBg;
  const cardBdr = isDark ? `${step.accent}28` : step.lightBorder;
  const textPri = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#4b5563";
  const divider = isDark ? "#374151" : "#e5e7eb";

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 mb-24 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`w-[calc(50%-3rem)] ${isLeft ? "pr-8" : "pl-8"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.21, 1.02, 0.73, 1],
            delay: 0.1,
          }}
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer rounded-3xl overflow-hidden"
            style={{
              background: cardBg,
              border: `1.5px solid ${cardBdr}`,
              boxShadow: inView ? step.shadow : "none",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${step.gradient}`} />
            <div className="p-7 relative overflow-hidden">
              <div
                className="absolute right-4 bottom-3 text-[9rem] font-black leading-none pointer-events-none select-none"
                style={{
                  color: isDark ? `${step.accent}10` : step.lightNumColor,
                  opacity: isDark ? 1 : 0.25,
                }}
              >
                {step.number}
              </div>
              <div className="flex items-center gap-4 mb-5 relative">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0`}
                  style={{ boxShadow: `0 8px 24px ${step.accent}35` }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.25em]"
                      style={{ color: step.accent }}
                    >
                      Stage {step.number}
                    </span>
                    {"comingSoon" in step && step.comingSoon && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: isDark
                            ? "rgba(139,92,246,0.2)"
                            : "#ede9fe",
                          color: isDark ? "#c4b5fd" : "#7c3aed",
                        }}
                      >
                        Coming Soon
                      </span>
                    )}
                    {badge && badge.isUnlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-bold`}
                        title={badge.description}
                      >
                        <span>{badge.icon}</span>
                        <span>Earned</span>
                      </motion.div>
                    )}
                  </div>
                  <h3
                    className="text-2xl font-extrabold leading-tight"
                    style={{ color: textPri }}
                  >
                    {step.fullTitle}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: step.accent }}
                  >
                    {step.tagline}
                  </p>
                  {tutorialProgress && tutorialProgress.completed > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden max-w-[120px]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(tutorialProgress.completed / tutorialProgress.total) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${step.gradient}`}
                        />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: step.accent }}>
                        {tutorialProgress.completed}/{tutorialProgress.total}
                      </span>
                    </div>
                  )}
                  <span
                    className="mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${step.accent}15`,
                      color: step.accent,
                    }}
                  >
                    {step.level}
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mb-5 relative"
                style={{ color: textSec }}
              >
                {step.desc}
              </p>
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-5">
                  <div>
                    <div
                      className="text-2xl font-black leading-none"
                      style={{ color: textPri }}
                    >
                      {step.stat}
                    </div>
                    <div
                      className="text-[11px] uppercase tracking-widest font-semibold mt-0.5"
                      style={{ color: step.accent }}
                    >
                      {step.statUnit}
                    </div>
                  </div>
                  <div className="w-px h-8" style={{ background: divider }} />
                  <div>
                    <div
                      className="text-2xl font-black leading-none"
                      style={{ color: textPri }}
                    >
                      {step.time}
                    </div>
                    <div
                      className="text-[11px] uppercase tracking-widest font-semibold mt-0.5"
                      style={{ color: step.accent }}
                    >
                      timeline
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: `${step.accent}15`, color: step.accent }}
                >
                  Skills
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-4 relative"
                  >
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.skills.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.06)"
                              : `${step.accent}0d`,
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : step.lightBorder}`,
                            color: isDark ? "#d1d5db" : "#374151",
                          }}
                        >
                          <CheckCircle2
                            className="w-3 h-3 shrink-0"
                            style={{ color: step.accent }}
                          />
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-2.5 relative">
                {step.tutorialSlug ? (
                  <Link
                    href={`/tutorials/${step.tutorialSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-sm font-bold hover:-translate-y-0.5 active:translate-y-0 transition-transform`}
                    style={{ boxShadow: `0 6px 20px ${step.accent}40` }}
                  >
                    <BookOpen className="w-4 h-4" /> Start Learning{" "}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <form
                    onSubmit={handleNotifySubmit}
                    className="flex-1 flex items-center gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter email to get notified..."
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 min-w-0 h-12 px-4 rounded-2xl text-sm outline-none transition-all"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "#f3f4f6",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
                        color: textPri,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={
                        notifyState === "loading" || notifyState === "success"
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="h-12 px-6 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-50"
                      style={{
                        background:
                          notifyState === "success" ? "#10b981" : step.accent,
                        boxShadow:
                          notifyState === "success"
                            ? "none"
                            : `0 4px 14px ${step.accent}40`,
                      }}
                    >
                      {notifyState === "loading"
                        ? "..."
                        : notifyState === "success"
                          ? "Subscribed! ✓"
                          : "Notify Me"}
                    </button>
                  </form>
                )}
                {step.tutorialSlug && (
                  <Link
                    href={`/quiz?category=${step.tutorialSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    title="Take Quiz"
                    className="px-4 py-3 rounded-2xl flex items-center justify-center transition-colors"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : `${step.accent}12`,
                      color: isDark ? "#9ca3af" : step.accent,
                    }}
                  >
                    <Brain className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-24 flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 18,
            delay: 0.25,
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0px ${step.accent}00`,
                `0 0 0 12px ${step.accent}00`,
              ],
            }}
            transition={{ duration: 0.25, repeat: Infinity }}
            className="relative z-10 w-14 h-14 rounded-full border-4 flex items-center justify-center text-2xl"
            style={{
              borderColor: step.accent,
              background: isDark ? "#111827" : step.lightCardBg,
              boxShadow: `0 4px 20px ${step.accent}30`,
            }}
          >
            {step.emoji}
          </motion.div>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="relative z-10 mt-2 px-2 text-[11px] font-black uppercase tracking-wider text-center"
          style={{
            color: step.accent,
            background: isDark ? "#030712" : "#ffffff",
          }}
        >
          {step.title}
        </motion.span>
      </div>
      <div className="w-[calc(50%-3rem)]" />
    </div>
  );
}

function MobileStepCard({
  step,
  index,
  isDark,
  badge,
  tutorialProgress,
}: {
  step: Step;
  index: number;
  isDark: boolean;
  badge?: { id: number; name: string; description: string; icon: string; isUnlocked: boolean; progress: number; requiredCount: number; color: string };
  tutorialProgress?: { slug: string; completed: number; total: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyState, setNotifyState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const cardBg = isDark ? "#111827" : step.lightCardBg;
  const textPri = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#4b5563";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.21, 1.02, 0.73, 1],
      }}
      className="relative pl-10 mb-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
        className="absolute left-0 top-4 z-10 w-8 h-8 rounded-full border-4 flex items-center justify-center text-sm"
        style={{
          borderColor: step.accent,
          background: isDark ? "#111827" : step.lightCardBg,
          boxShadow: `0 2px 12px ${step.accent}30`,
        }}
      >
        {step.emoji}
      </motion.div>
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer rounded-2xl p-5 overflow-hidden"
        style={{
          background: cardBg,
          border: `1.5px solid ${isDark ? `${step.accent}22` : step.lightBorder}`,
          boxShadow: `0 4px 20px ${step.accent}12`,
        }}
      >
        <div
          className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mb-4`}
        />
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0`}
          >
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <span
              className="relative z-10 px-1 text-[10px] font-black uppercase tracking-widest block"
              style={{
                color: step.accent,
                background: isDark ? "#111827" : step.lightCardBg,
              }}
            >
              Stage {step.number} · {step.time}
            </span>
            <h3 className="text-base font-extrabold" style={{ color: textPri }}>
              {step.fullTitle}
            </h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: textSec }}>
          {step.desc}
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex flex-wrap gap-1.5">
                {step.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-lg flex items-center gap-1"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.06)"
                        : `${step.accent}0d`,
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : step.lightBorder}`,
                      color: textSec,
                    }}
                  >
                    <CheckCircle2
                      className="w-3 h-3"
                      style={{ color: step.accent }}
                    />
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            {step.tutorialSlug ? (
              <Link
                href={`/tutorials/${step.tutorialSlug}`}
                onClick={(e) => e.stopPropagation()}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-xs font-bold`}
                style={{ boxShadow: `0 4px 12px ${step.accent}35` }}
              >
                <BookOpen className="w-3.5 h-3.5" /> Start{" "}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!notifyEmail) return;
                  setNotifyState("loading");
                  setTimeout(() => setNotifyState("success"), 800);
                }}
                className="flex-1 flex items-center gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="email"
                  required
                  placeholder="Get notified..."
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full min-w-0 h-9 px-3 rounded-xl text-xs outline-none"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
                    color: textPri,
                  }}
                />
                <button
                  type="submit"
                  disabled={
                    notifyState === "loading" || notifyState === "success"
                  }
                  className="h-9 px-3 rounded-xl text-xs font-bold text-white whitespace-nowrap disabled:opacity-50"
                  style={{
                    background:
                      notifyState === "success" ? "#10b981" : step.accent,
                  }}
                >
                  {notifyState === "success" ? "✓" : "Notify"}
                </button>
              </form>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="px-3 py-2.5 rounded-xl text-xs font-medium transition-colors shrink-0"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : `${step.accent}12`,
                color: isDark ? "#9ca3af" : step.accent,
              }}
            >
              {expanded ? "Less" : "Skills"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoadmapPage() {
  const totalLessons = tutorials.reduce((s, t) => s + t.lessons.length, 0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { getTutorialBadge } = useBadges();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const heroBg = isDark ? "#030712" : "#f9fafb";
  const dotColor = isDark ? "rgba(255,255,255,0.055)" : "rgba(99,102,241,0.10)";
  const tutorialProgress =
    typeof window !== "undefined"
      ? tutorials.map((tutorial) => {
          const stored = localStorage.getItem(
            getUserStorageKey(user?.id, `tutorial-progress-${tutorial.slug}`),
          );
          const completed: number[] = stored ? JSON.parse(stored) : [];
          return {
            slug: tutorial.slug,
            completed: completed.length,
            total: tutorial.lessons.length,
          };
        })
      : [];
  const completedLessons = tutorialProgress.reduce(
    (sum, item) => sum + item.completed,
    0,
  );
  const totalCompletedLessons = tutorialProgress.reduce(
    (sum, item) => sum + item.total,
    0,
  );
  const overallProgressPercent =
    totalCompletedLessons > 0
      ? Math.round((completedLessons / totalCompletedLessons) * 100)
      : 0;

  // Determine current stage based on progress
  const getCurrentStage = () => {
    // Check each tutorial's progress to determine the current stage
    const htmlProgress = tutorialProgress.find((t) => t.slug === "html");
    const cssProgress = tutorialProgress.find((t) => t.slug === "css");
    const jsProgress = tutorialProgress.find((t) => t.slug === "javascript");

    // If HTML is not started or not completed, user is on Stage 01
    if (!htmlProgress || htmlProgress.completed === 0) {
      return STEPS[0]; // HTML stage
    }

    // If HTML is in progress or completed and CSS not started, user should continue HTML or start CSS
    if (htmlProgress.completed < htmlProgress.total) {
      return STEPS[0]; // Still on HTML stage
    }

    // If HTML is completed and CSS is not completed, user is on Stage 02
    if (!cssProgress || cssProgress.completed < cssProgress.total) {
      return STEPS[1]; // CSS stage
    }

    // If both HTML and CSS are completed and JS is not completed, user is on Stage 03
    if (!jsProgress || jsProgress.completed < jsProgress.total) {
      return STEPS[2]; // JavaScript stage
    }

    // Default to the next uncompleted stage
    for (let i = 0; i < STEPS.length; i++) {
      const progress = tutorialProgress.find(
        (t) => t.slug === STEPS[i].tutorialSlug
      );
      if (!progress || progress.completed < progress.total) {
        return STEPS[i];
      }
    }

    // If all completed, return the first stage
    return STEPS[0];
  };

  const currentStage = getCurrentStage();
  const hasStarted = completedLessons > 0;

  // Calculate user's position on the roadmap (0-1 scale)
  const getUserProgressPosition = () => {
    const htmlProgress = tutorialProgress.find((t) => t.slug === "html");
    const cssProgress = tutorialProgress.find((t) => t.slug === "css");
    const jsProgress = tutorialProgress.find((t) => t.slug === "javascript");

    let totalCompletedInCore = 0;
    let totalLessonsInCore = 0;

    // Count only HTML, CSS, JS for the core roadmap position (first 3 stages)
    [htmlProgress, cssProgress, jsProgress].forEach((progress) => {
      if (progress) {
        totalCompletedInCore += progress.completed;
        totalLessonsInCore += progress.total;
      }
    });

    // Return progress as a percentage (0-1) through the first 3 stages
    if (totalLessonsInCore === 0) return 0;
    const coreProgress = totalCompletedInCore / totalLessonsInCore;
    
    // Map to specific step position (each step gets ~33%)
    return Math.min(coreProgress * 3, 3) / STEPS.length; // Normalize to 0-1 across all steps
  };

  const userPosition = getUserProgressPosition();
  const badgeBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.07)";
  const badgeBdr = isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.18)";
  const badgeText = isDark ? "rgba(255,255,255,0.50)" : "#3730a3";
  const headText = isDark ? "text-white" : "text-gray-900";
  const tipsBg = isDark ? "#0d1117" : "#f1f5f9";
  const tipsCard = isDark ? "#111827" : "#ffffff";
  const tipsCardB = isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0";
  const tipsNum = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";
  const tipsText = isDark ? "#d1d5db" : "#374151";
  const tipsHead = isDark ? "#ffffff" : "#0f172a";

  return (
    <div
      style={{ background: isDark ? "#030712" : "#ffffff" }}
      className="min-h-screen"
    >
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: heroBg }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            {
              color: isDark ? "rgba(249,115,22,0.12)" : "rgba(234,107,26,0.12)",
              left: "8%",
              top: "18%",
              size: 520,
            },
            {
              color: isDark ? "rgba(59,130,246,0.09)" : "rgba(37,99,235,0.09)",
              left: "72%",
              top: "8%",
              size: 460,
            },
            {
              color: isDark ? "rgba(139,92,246,0.08)" : "rgba(124,58,237,0.08)",
              left: "42%",
              top: "62%",
              size: 400,
            },
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: o.size,
                height: o.size,
                left: o.left,
                top: o.top,
                background: o.color,
              }}
              animate={{ x: [0, 25, -15, 0], y: [0, -18, 12, 0] }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${isDark ? "#030712" : "#ffffff"})`,
          }}
        />

        <div className="relative text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-10 backdrop-blur-sm"
            style={{
              background: badgeBg,
              border: `1px solid ${badgeBdr}`,
              color: badgeText,
            }}
          >
            🗺️ Interactive Roadmap · {totalLessons}+ free lessons
          </motion.div>

          <div className="mb-3">
            <SplitText
              text="Dev"
              delay={0.15}
              stagger={0.06}
              className={`text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none ${headText}`}
            />
          </div>
          <div className="mb-10">
            <SplitText
              text="Roadmap"
              delay={0.3}
              stagger={0.04}
              className="text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none bg-gradient-to-r from-orange-500 via-blue-500 to-violet-500 bg-clip-text text-transparent"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  y: -5,
                  scale: 1.08,
                  filter: "brightness(1.3) saturate(1.25)",
                  backgroundColor: `${s.accent}28`,
                  borderColor: `${s.accent}90`,
                  boxShadow: `0 8px 22px ${s.accent}35`,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  default: { duration: 0.1 },
                  opacity: { delay: 0.7 + i * 0.08, duration: 0.4 },
                  scale: { delay: 0.7 + i * 0.08, duration: 0.4 },
                }}
                className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-[filter,box-shadow] duration-200"
                style={{
                  border: `1px solid ${s.accent}30`,
                  color: s.accent,
                  background: `${s.accent}10`,
                }}
              >
                {s.emoji} {s.title}
              </motion.div>
            ))}
          </motion.div>

          {/*
          <motion.div
            initial={{ opacity: 0 }}
                >
                  <span>Roadmap progress</span>
                  <span>{overallProgressPercent}%</span>
                </div>
                <div
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${overallProgressPercent}%`,
                      background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 rounded-3xl border p-6"
              style={{
                background: isDark ? "#0f172a" : "#ffffff",
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Compass
                  className="w-5 h-5"
                  style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
                />
                <span
                  className="text-sm font-semibold uppercase tracking-[0.24em]"
                  style={{ color: isDark ? "#93c5fd" : "#2563eb" }}
                >
                  Sign in to personalize
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: isDark ? "#9ca3af" : "#475569" }}
              >
                Create an account to sync your tutorial progress and see your
                exact place in the roadmap with helpful milestone badges.
              </p>
            </motion.div>
          )}

          <div className="space-y-3">
            {stageCompletion.map((item, index) => (
              <HybridRoadmapCard
                key={item.phase}
                item={item}
                isDark={isDark}
                expanded={expandedStage === item.phase}
                onToggle={() =>
                  setExpandedStage(
                    expandedStage === item.phase ? null : item.phase,
                  )
                }
                statusLabel={
                  item.complete
                    ? "Completed"
                    : index === activeStageIndex
                      ? "Current focus"
                      : index < activeStageIndex
                        ? "Completed"
                        : "Upcoming"
                }
                isActive={index === activeStageIndex}
                isComplete={item.complete}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-3xl border p-6"
            style={{
              background: isDark ? "#0f172a" : "#ffffff",
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
            }}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Small steps",
                  text: "Do one stage at a time and finish a tiny project before moving on.",
                },
                {
                  title: "Build as you learn",
                  text: "Each phase gives you a practical goal so theory turns into momentum.",
                },
                {
                  title: "Keep the loop going",
                  text: "When a stage feels easy, add polish, tests, or a better version of the project.",
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-2xl p-4"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                  }}
                >
                  <div
                    className="text-sm font-black mb-2"
                    style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
                  >
                    {tip.title}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDark ? "#9ca3af" : "#475569" }}
                  >
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          */}
        </div>
      </section>

      <section
        className="relative hidden md:block py-24 overflow-hidden"
        style={{ background: isDark ? "#030712" : "#ffffff" }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #ea6b1a 10%, #2563eb 35%, #b45309 65%, #7c3aed 90%, transparent)",
          }}
        />
        
        {/* User Position Indicator */}
        {hasStarted && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{
              top: `${userPosition * 100}%`,
            }}
          >
            <motion.div
              animate={{
                y: [-2, 2, -2],
                boxShadow: [
                  "0 4px 20px rgba(99, 102, 241, 0.4)",
                  "0 6px 30px rgba(99, 102, 241, 0.6)",
                  "0 4px 20px rgba(99, 102, 241, 0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white dark:border-gray-900"
            >
              <div className="text-white text-lg">👤</div>
              
              {/* Pulsing ring effect */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-indigo-500"
              />
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap"
            >
              <div className="text-xs font-bold text-gray-900 dark:text-white">
                You are here
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                {completedLessons} lessons completed
              </div>
            </motion.div>
          </motion.div>
        )}
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {STEPS.map((step, i) => (
            <div key={step.id}>
              {step.arc !== STEPS[i - 1]?.arc && (
                <ArcHeading name={step.arc} isDark={isDark} />
              )}
              <StepCard 
                step={step} 
                index={i} 
                isDark={isDark} 
                badge={step.tutorialSlug ? getTutorialBadge(step.tutorialSlug) : undefined}
                tutorialProgress={tutorialProgress.find((t) => t.slug === step.tutorialSlug)}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        className="md:hidden py-12 px-5 relative"
        style={{ background: isDark ? "#030712" : "#ffffff" }}
      >
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #ea6b1a 10%, #2563eb 35%, #b45309 65%, #7c3aed 90%, transparent)",
          }}
        />
        
        {/* Mobile User Position Indicator */}
        {hasStarted && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="absolute left-4 -translate-x-1/2 z-10"
            style={{
              top: `${userPosition * 100}%`,
            }}
          >
            <motion.div
              animate={{
                y: [-2, 2, -2],
                boxShadow: [
                  "0 4px 20px rgba(99, 102, 241, 0.4)",
                  "0 6px 30px rgba(99, 102, 241, 0.6)",
                  "0 4px 20px rgba(99, 102, 241, 0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-3 border-white dark:border-gray-900"
            >
              <div className="text-white text-sm">👤</div>
              
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-indigo-500"
              />
            </motion.div>
          </motion.div>
        )}
        
        {STEPS.map((step, i) => (
          <div key={step.id}>
            {step.arc !== STEPS[i - 1]?.arc && (
              <ArcHeading name={step.arc} isDark={isDark} />
            )}
            <MobileStepCard 
              step={step} 
              index={i} 
              isDark={isDark}
              badge={step.tutorialSlug ? getTutorialBadge(step.tutorialSlug) : undefined}
              tutorialProgress={tutorialProgress.find((t) => t.slug === step.tutorialSlug)}
            />
          </div>
        ))}
      </section>

      <section className="py-24" style={{ background: tipsBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: tipsHead }}
            >
              Tips for the journey
            </h2>
            <p
              className="mt-3 text-base"
              style={{ color: isDark ? "#6b7280" : "#64748b" }}
            >
              Straight talk from everyone who has walked this path before you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                accent: "#ea6b1a",
                text: "Do not skip steps. HTML, CSS, JS is the order for a reason. Each one builds on the last.",
              },
              {
                n: "02",
                accent: "#2563eb",
                text: "Build something after each topic. A real mini-project beats watching 10 more tutorials.",
              },
              {
                n: "03",
                accent: "#b45309",
                text: "Take the quiz after each track. It surfaces the gaps you did not know you had.",
              },
              {
                n: "04",
                accent: "#7c3aed",
                text: "30 minutes every day beats 4-hour sessions on weekends. Consistency compounds.",
              },
              {
                n: "05",
                accent: "#ea6b1a",
                text: "When stuck, MDN is your bible. Every lesson has a direct MDN reference link.",
              },
              {
                n: "06",
                accent: "#2563eb",
                text: "Everything here is completely free. No paywalls. No upsells. Just start.",
              },
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 relative overflow-hidden cursor-default transition-shadow hover:shadow-xl"
                style={{
                  background: tipsCard,
                  border: `1.5px solid ${tipsCardB}`,
                  boxShadow: `0 2px 12px ${tip.accent}08`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl"
                  style={{ background: `${tip.accent}0e` }}
                />
                <div
                  className="text-5xl font-black mb-4 leading-none"
                  style={{ color: tipsNum }}
                >
                  {tip.n}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: tipsText }}
                >
                  {tip.text}
                </p>
                <div
                  className="mt-4 h-0.5 w-8 rounded-full"
                  style={{ background: tip.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-28 overflow-hidden"
        style={{ background: isDark ? "#030712" : "#0f172a" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 50%, rgba(234,107,26,0.12) 0%, transparent 65%)",
              "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)",
              "radial-gradient(ellipse at 50% 50%, rgba(234,107,26,0.12) 0%, transparent 65%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center max-w-2xl mx-auto px-6"
        >
          <motion.div
            className="text-6xl mb-6 block"
            animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {currentStage.emoji}
          </motion.div>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-5">
            Stage {currentStage.number}
            <br />
            <span className={`bg-gradient-to-r ${currentStage.gradient} bg-clip-text text-transparent`}>
              {hasStarted ? "continue learning" : "starts now"}
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            {hasStarted
              ? `Continue your ${currentStage.title} journey. ${currentStage.tagline}`
              : `${currentStage.title} is free and waiting. No account needed to begin your first lesson.`}
          </p>
          <Link
            href={currentStage.tutorialSlug ? `/tutorials/${currentStage.tutorialSlug}` : "/tutorials"}
            className={`inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r ${currentStage.gradient} text-white font-black rounded-2xl text-base hover:-translate-y-1 transition-all`}
            style={{ boxShadow: currentStage.shadow }}
          >
            {currentStage.icon && <currentStage.icon className="w-5 h-5" />}{" "}
            {hasStarted ? `Continue Stage ${currentStage.number}` : `Begin Stage ${currentStage.number}`}{" "}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
