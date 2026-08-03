"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";

const FAQS = [
  {
    question: "Is BeeCodeFi really free?",
    answer:
      "Yes! All our core tracks (HTML, CSS, JavaScript) are 100% free forever. We believe foundational web development education should be accessible to everyone without paywalls.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to access lessons and tutorials! However, creating a free account lets you sync your progress across devices, track streaks, and access quiz history.",
  },
  {
    question: "Do I need any prior coding experience?",
    answer:
      "Not at all. Our HTML and CSS tracks are designed for complete beginners. If you know how to use a web browser, you can learn to code with us.",
  },
  {
    question: "Can I use BeeCodeFi on my phone or tablet?",
    answer:
      "Yes, our entire platform is mobile-responsive and works on all devices. However, for the best experience with the live code editor, we highly recommend using a desktop or laptop with a physical keyboard.",
  },
  {
    question: "How long does it take to complete the curriculum?",
    answer:
      "It depends on your pace! Most students complete the HTML and CSS tracks within 2-4 weeks, and JavaScript in another 4-6 weeks if they study for about an hour a day. You can learn at your own speed.",
  },
  {
    question: "Do I get a certificate when I finish?",
    answer:
      "Yes, when you complete all lessons in a track, you'll receive a digital certificate of completion that you can share on your portfolio or LinkedIn.",
  },
  {
    question: "What happens if I lose my daily streak?",
    answer:
      "Your streak resets to zero, but don't worry! Streaks are just a fun way to stay motivated. You can always start a new one tomorrow. Your learning progress is never lost.",
  },
  {
    question: "Are there video tutorials or just text?",
    answer:
      "We offer both! Our main interactive tutorials use text with live code editors, but we also have dedicated video courses for HTML and CSS on the Courses page. More videos are coming soon.",
  },
  {
    question: "Can I save lessons to review later?",
    answer:
      "Absolutely! Press the 'B' key while viewing any lesson to bookmark it. All your bookmarks are saved and accessible from the Bookmarks page in your account menu.",
  },
  {
    question: "What if I find a bug or have a suggestion?",
    answer:
      "We love feedback! Please use the Contact page to report bugs, suggest features, or ask questions. We read every message and continuously improve the platform based on your input.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-${question.substring(0, 20).replace(/\s+/g, '-')}`}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 ml-4"
        >
          <ChevronDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                Questions
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to know about learning with BeeCodeFi.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-800">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We&apos;re here to help you on your coding journey.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
