import Link from "next/link";
import { FileQuestion, BookOpen, Brain, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="text-center max-w-lg">
        {/* Big 404 number */}
        <div className="text-[9rem] font-black leading-none text-gray-100 dark:text-gray-800/60 select-none mb-2">
          404
        </div>
        <div className="w-16 h-16 mx-auto -mt-8 mb-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
          Here are some useful links instead:
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { href: "/tutorials", icon: BookOpen, label: "Tutorials", color: "text-indigo-500" },
            { href: "/quiz",      icon: Brain,    label: "Quizzes",   color: "text-purple-500" },
            { href: "/roadmap",   icon: Map,      label: "Roadmap",   color: "text-orange-500" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-indigo-500/20">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
