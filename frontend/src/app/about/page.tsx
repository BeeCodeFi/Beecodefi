"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Calendar,
  Cpu,
  Database,
  Cloud,
  TestTube,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const experience = [
  {
    company: "Cybage Software",
    role: "Software Engineer, Enterprise Products Division",
    period: "Nov 2023 — Present",
    highlights: [
      "Architected scalable React.js and Vue.js front-end applications for enterprise financial products, improving reliability across customer-facing modules used by thousands of end users.",
      "Engineered reusable component libraries adopted by 3+ product teams, cutting feature development effort by 15% and accelerating release cycles by 1-2 sprints on average.",
      "Integrated REST APIs with .NET Core backend services in microservice-based architectures, ensuring secure, low-latency data flow across distributed systems.",
      "Optimized UI performance via lazy loading, memoization, and code splitting, reducing page load times and improving Core Web Vitals across key user flows.",
      "Achieved 95% unit/integration test coverage with Jest and React Testing Library, measurably reducing production defects and rollback incidents.",
      "Leveraged GitHub Copilot and Claude AI to accelerate development velocity while maintaining code consistency across sprint deliverables.",
    ],
  },
];

const templates = [
  {
    title: "Forge Industries",
    subtitle: "Advanced Manufacturing Website",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    description:
      "A precision manufacturing template for CNC machining, robotic automation, quality assurance, facility showcases, and industrial enquiries.",
    color: "from-orange-500 to-red-500",
    link: "https://manufacturing-template.vercel.app/",
    github: "https://github.com/BeeCodeFi/Template/tree/manufacturing-website",
    image:
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&h=675&q=85",
  },
  {
    title: "VitalCare",
    subtitle: "Healthcare & Medical Clinic Website",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    description:
      "A healthcare template focused on departments, specialists, appointments, patient stories, FAQs, and a trusted clinical experience.",
    color: "from-cyan-500 to-blue-500",
    link: "https://pharma-template-eta.vercel.app/",
    github: "https://github.com/BeeCodeFi/Template/tree/pharma-website",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=675&q=85",
  },
  {
    title: "Elevate Coaching",
    subtitle: "Coaching & Personal Growth Website",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    description:
      "A premium coaching template with transformation programs, success stories, impact metrics, a guided process, FAQs, and consultation CTAs.",
    color: "from-violet-500 to-purple-500",
    link: "https://coaching-template-nine.vercel.app/",
    github: "https://github.com/BeeCodeFi/Template/tree/coaching",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=675&q=85",
  },
  {
    title: "Rasa",
    subtitle: "Modern Indian Restaurant Website",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    description:
      "An editorial restaurant template for signature dishes, menus, gallery storytelling, chef profiles, reservations, awards, and guest reviews.",
    color: "from-rose-500 to-orange-500",
    link: "https://restaurant-template-three-beta.vercel.app/",
    github:
      "https://github.com/BeeCodeFi/Template/tree/Restaurant/Restaurant%20Website",
    image:
      "https://restaurant-template-three-beta.vercel.app/assets/images/hero.jpg",
  },
  {
    title: "Aditya Kumar Portfolio",
    subtitle: "Creative Developer Portfolio Website",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js", "Vercel"],
    description:
      "An immersive portfolio template combining project storytelling, animated transitions, 3D/WebGL presentation, skills, experience, testimonials, and contact sections.",
    color: "from-indigo-500 to-fuchsia-500",
    link: "https://portfolio-template-eight-ivory.vercel.app/",
    github: "https://github.com/BeeCodeFi/Template/tree/portfolio",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=675&q=85",
  },
];

const projects = [
  {
    title: "BEECODEFI",
    subtitle: "Free Education Platform",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "ASP.NET Core",
      "SQLite",
      "Framer Motion",
    ],
    description:
      "Full-stack educational platform with interactive tutorials, topic-based quizzes, user progress tracking, and modern animations — the site you're on right now!",
    color: "from-indigo-500 to-purple-500",
    link: "https://beecodefi-edu.vercel.app/",
  },
  {
    title: "Currency Converter",
    subtitle: "Currency Converter Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "ExchangeRate API", "Vercel"],
    description:
      "A real-time currency converter web application that allows users to instantly convert between global currencies using live exchange rates.",
    color: "from-green-500 to-emerald-500",
    link: "https://currency-converter-pi-peach.vercel.app/",
  },
  {
    title: "YouWe Tech",
    subtitle: "IT Services & Software Development Company Website",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "Turborepo",
      "Framer Motion",
      "Vercel",
    ],
    description:
      "YouWe Tech is a technology solutions company offering web development, software services, and digital solutions to help businesses build modern and scalable products.",
    color: "from-blue-500 to-indigo-500",
    link: "https://youwe-tech.vercel.app/",
  },
  {
    title: "Pitstop Detailing Studio",
    subtitle: "Auto Detailing & Garage Management Software",
    tech: [
      "React 19",
      "Tailwind CSS",
      "ASP.NET Core 8",
      "C#",
      "Gemini API",
      "Vercel",
    ],
    description:
      "Pitstop Detailing Studio Billbook is a management and billing system designed for auto detailing businesses to handle invoices, customers, and service records efficiently.",
    color: "from-red-500 to-orange-500",
    link: "https://pitstop-detailing-studio-billbook.vercel.app/admin/dashboard",
  },
];

const skillCategories = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "Angular",
      "Vue",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Redux",
      "Zustand",
    ],
  },
  {
    category: "Backend",
    icon: Cpu,
    skills: [
      "Node.js",
      "Express.js",
      "ASP.NET Core",
      ".NET",
      "C#",
      "REST APIs",
      "JWT Authentication",
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: ["MongoDB", "SQL Server", "SQLite", "Entity Framework Core"],
  },
  {
    category: "DevOps & Tools",
    icon: Cloud,
    skills: [
      "AWS",
      "Git",
      "GitHub",
      "Vite",
      "NPM",
      "Postman",
      "CI/CD",
      "Docker",
    ],
  },
  {
    category: "Testing",
    icon: TestTube,
    skills: [
      "Jest",
      "Vitest",
      "React Testing Library",
      "xUnit",
      "FluentAssertions",
    ],
  },
  {
    category: "AI & Other",
    icon: Sparkles,
    skills: [
      "LLM Integration",
      "Copilot",
      "Claude",
      "OpenAI APIs",
      "Gen AI",
      "Agile (Scrum)",
      "Responsive Design",
      "SPA Architecture",
    ],
  },
];

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0] & { github?: string; image?: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {project.image && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-5 overflow-hidden rounded-xl aspect-[16/9] bg-gray-100 dark:bg-gray-900"
          >
            <Image
              src={project.image}
              alt={`${project.title} home page preview`}
              width={1600}
              height={900}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </a>
        )}
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-4`}
        />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          {project.title}
          <ExternalLink className="w-4 h-4 text-indigo-500" />
        </h3>
        <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Live demo <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <ExternalLink className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold">Projects</h2>
        </motion.div>

        {/* Standalone Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 0.1} />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-14 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Website Templates
            </h3>
            <p className="text-sm text-gray-500">
              Five ready-to-explore designs from the BeeCodeFi template
              collection
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative w-36 h-36 mx-auto mb-6">
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ padding: 3 }}
              />
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-xl">
                <Image
                  src="/ayush.png"
                  alt="Ayush Kumar"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to initials if image not found
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                {/* Initials fallback */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">AK</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Ayush Kumar</h1>
            <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-4">
              Full-Stack Software Engineer
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Full Stack Software Engineer with 2+ years of experience building
              and shipping production web applications using React.js, Vue.js,
              Angular, Node.js, and .NET Core. Built reusable component
              libraries adopted across 3+ product teams, integrated REST APIs
              within microservice architectures, and achieved 95% unit test
              coverage on customer-facing enterprise financial products.
              Experienced in AWS deployment, CI/CD automation, and Agile/Scrum
              delivery, with hands-on experience integrating LLM/OpenAI APIs
              into production features.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Ranchi, Jharkhand, India
              </span>
              <a
                href="mailto:kumaryursh@gmail.com"
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
              >
                <Mail className="w-4 h-4" /> kumaryursh@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> +91-7004900272
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <a
                href="https://github.com/BeeCodeFi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/ayushku"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@BeeCodeFi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-red-600 dark:text-red-400"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </motion.div>

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-gray-950" />
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4" /> {exp.period}
                </p>
              </div>
              <ul className="space-y-2 mt-4">
                {exp.highlights.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 }}
                    className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <ProjectsSection />

      {/* Skills */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-2 mb-4">
                  <cat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold">Education</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              B.Tech — Computer Science & Engineering
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
              Kalinga Institute of Industrial Technology (KIIT)
            </p>
            <p className="text-sm text-gray-500 mt-1">Bhubaneswar, India</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium">
              <GraduationCap className="w-4 h-4" />
              CGPA: 8.0
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
