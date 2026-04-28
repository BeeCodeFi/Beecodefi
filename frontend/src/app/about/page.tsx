"use client";

import { motion } from "framer-motion";
import {
  User, Briefcase, GraduationCap, Code2, Mail, MapPin, Phone,
  ExternalLink, Calendar, Cpu, Database, Cloud,
  TestTube, Sparkles
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const experience = [
  {
    company: "Cybage Software",
    role: "Full-Stack Software Engineer",
    period: "Nov 2023 — Present",
    highlights: [
      "Built and maintained scalable React-based SPAs, improving UI performance and responsiveness",
      "Developed reusable and modular React components, reducing development time by ~15%",
      "Designed and built RESTful APIs using Node.js and .NET, handling authentication, data persistence, and third-party integrations",
      "Integrated REST APIs with frontend using React hooks and async workflows",
      "Built backend services with Express.js and ASP.NET Core, implementing JWT authentication and role-based access control",
      "Managed database design and migrations with MongoDB and SQL Server/SQLite using EF Core",
      "Built UI prototypes using AI Agents (Copilot, Claude) and automated repetitive tasks with AI-assisted workflows",
      "Achieved 95% test coverage using Jest, React Testing Library, and backend unit tests",
      "Worked in Agile teams, contributing to sprint planning and feature delivery",
      "Managed Git workflows, branching strategies, and code reviews via Pull Requests on GitHub",
    ],
  },
];

const projects = [
  {
    title: "Social Media Platform",
    subtitle: "Full-Stack Web Application",
    tech: ["Angular", "Node.js", "MongoDB", "JWT"],
    description: "Full-stack social media platform with JWT authentication, role-based access, dynamic feeds, real-time updates, and AI-powered smart captions using OpenAI APIs.",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Hospitality & Travel Web APP",
    subtitle: "Multi-Framework Booking Platform",
    tech: ["React.js", "Redux", "Zustand", "REST APIs", "Jest"],
    description: "Feature-rich travel booking app with global state management (Zustand), REST API integration for real-time data fetching, and optimized frontend performance.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "BEECODEFI",
    subtitle: "Free Education Platform",
    tech: ["Next.js", "Tailwind CSS", "ASP.NET Core", "SQLite", "Framer Motion"],
    description: "Full-stack educational platform with interactive tutorials, topic-based quizzes, user progress tracking, and modern animations — the site you're on right now!",
    color: "from-indigo-500 to-purple-500",
  },
];

const skillCategories = [
  {
    category: "Frontend",
    icon: Code2,
    skills: ["JavaScript (ES6+)", "React.js", "Angular", "Vue", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Redux", "Zustand"],
  },
  {
    category: "Backend",
    icon: Cpu,
    skills: ["Node.js", "Express.js", "ASP.NET Core", ".NET", "C#", "REST APIs", "JWT Authentication"],
  },
  {
    category: "Database",
    icon: Database,
    skills: ["MongoDB", "SQL Server", "SQLite", "Entity Framework Core"],
  },
  {
    category: "DevOps & Tools",
    icon: Cloud,
    skills: ["AWS", "Git", "GitHub", "Vite", "NPM", "Postman", "CI/CD", "Docker"],
  },
  {
    category: "Testing",
    icon: TestTube,
    skills: ["Jest", "Vitest", "React Testing Library", "xUnit", "FluentAssertions"],
  },
  {
    category: "AI & Other",
    icon: Sparkles,
    skills: ["LLM Integration", "Copilot", "Claude", "OpenAI APIs", "Gen AI", "Agile (Scrum)", "Responsive Design", "SPA Architecture"],
  },
];

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
            <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-4xl font-bold text-white">AK</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Ayush Kumar</h1>
            <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-4">
              Full-Stack Software Engineer
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Full-Stack Developer specializing in React.js, Node.js, .NET, and modern JavaScript ecosystems.
              Building scalable, high-performance web applications with expertise spanning frontend architecture,
              backend APIs, database design, and cloud deployment. Passionate about clean UI, performance optimization,
              and delivering seamless user experiences.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Gandhinagar, India
              </span>
              <a href="mailto:kumaryursh@gmail.com" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Mail className="w-4 h-4" /> kumaryursh@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> 7004900272
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-4`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">B.Tech — Computer Science & Engineering</h3>
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
