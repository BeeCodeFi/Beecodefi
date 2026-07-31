import { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";
import Link from "next/link";
import { Shield, Database, Lock, Users, Key, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | BEECODEFI",
  description: "Read the BeeCodeFi Privacy Policy to understand how we collect, use, and protect your data.",
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: "When you create an account, we collect your name, email address, and password. We also track your progress through our courses, your quiz scores, and your daily learning streaks to provide you with a personalized learning experience.",
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: "We use your information strictly to provide, maintain, and improve our services. This includes tracking your progress, awarding certificates of completion, communicating about your account, providing customer support, and sending you updates about new courses if you opt-in.",
  },
  {
    icon: Lock,
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your personal information. Your password is encrypted before it is stored in our database. However, please be aware that no method of transmission over the internet is 100% secure.",
  },
  {
    icon: Users,
    title: "Third-Party Services",
    content: "We do not sell, trade, or rent your personal identification information to others. We may use third-party service providers to help us operate our business, such as hosting providers or analytics tools, who may have access to your data only to perform tasks on our behalf.",
  },
  {
    icon: Key,
    title: "Your Rights",
    content: "You have the right to access, update, or delete your personal information at any time through your account settings. If you wish to completely delete your account and all associated data, you can do so from the account settings page.",
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Privacy Policy
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              At BeeCodeFi, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {index + 1}. {section.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                      {section.title === "Your Rights" && (
                        <Link
                          href="/account"
                          className="inline-flex items-center gap-1 mt-3 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm"
                        >
                          Go to account settings →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Questions?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <a
                  href="mailto:kumaryursh@gmail.com"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  kumaryursh@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
