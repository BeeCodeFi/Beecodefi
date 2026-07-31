import { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | BEECODEFI",
  description: "Read the BeeCodeFi Privacy Policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p>
              At BeeCodeFi, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              When you create an account, we collect your name, email address, and password. We also track your progress through our courses, your quiz scores, and your daily learning streaks to provide you with a personalized learning experience.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information strictly for the following purposes:</p>
            <ul>
              <li>To provide, maintain, and improve our services.</li>
              <li>To track your progress and award certificates of completion.</li>
              <li>To communicate with you about your account or provide customer support.</li>
              <li>To send you updates about new courses if you opt-in.</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. Your password is encrypted before it is stored in our database. However, please be aware that no method of transmission over the internet is 100% secure.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may use third-party service providers to help us operate our business, such as hosting providers or analytics tools, who may have access to your data only to perform tasks on our behalf.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time through your account settings. If you wish to completely delete your account and all associated data, you can do so from the <Link href="/account" className="text-indigo-600 dark:text-indigo-400 hover:underline">account settings page</Link>.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:kumaryursh@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">kumaryursh@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
