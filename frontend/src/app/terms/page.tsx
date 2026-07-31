import { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";
import { Shield, User, FileText, AlertCircle, Scale, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | BEECODEFI",
  description: "Read the BeeCodeFi Terms of Service that govern your use of our platform.",
};

const sections = [
  {
    icon: Shield,
    title: "Use of the Service",
    content: "BeeCodeFi provides free educational content for web development. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.",
  },
  {
    icon: User,
    title: "User Accounts",
    content: "To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: "All content on BeeCodeFi, including text, graphics, code examples, logos, and software, is the property of BeeCodeFi and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission. You are, however, encouraged to use the knowledge and code snippets provided in the tutorials for your own personal and commercial projects.",
  },
  {
    icon: FileText,
    title: "User Content",
    content: "If you submit any feedback, suggestions, or other content to us, you grant BeeCodeFi a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, and publish such content.",
  },
  {
    icon: AlertCircle,
    title: "Disclaimer of Warranties",
    content: 'The service is provided "as is" without any warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or completely secure. Your use of the service is at your own risk.',
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    content: "In no event shall BeeCodeFi be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.",
  },
  {
    icon: RefreshCw,
    title: "Changes to Terms",
    content: "We reserve the right to modify these Terms of Service at any time. We will post the revised terms on this page, and your continued use of the service after such changes have been posted constitutes your acceptance of the new terms.",
  },
];

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Terms of Service
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Welcome to BeeCodeFi. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.
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
                  If you have any questions about these Terms of Service, please contact us at:
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
