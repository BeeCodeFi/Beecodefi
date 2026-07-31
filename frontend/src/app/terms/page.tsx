import { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | BEECODEFI",
  description: "Read the BeeCodeFi Terms of Service that govern your use of our platform.",
};

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p>
              Welcome to BeeCodeFi. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.
            </p>

            <h2>1. Use of the Service</h2>
            <p>
              BeeCodeFi provides free educational content for web development. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              All content on BeeCodeFi, including text, graphics, code examples, logos, and software, is the property of BeeCodeFi and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission. You are, however, encouraged to use the knowledge and code snippets provided in the tutorials for your own personal and commercial projects.
            </p>

            <h2>4. User Content</h2>
            <p>
              If you submit any feedback, suggestions, or other content to us, you grant BeeCodeFi a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, and publish such content.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The service is provided "as is" without any warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or completely secure. Your use of the service is at your own risk.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall BeeCodeFi be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will post the revised terms on this page, and your continued use of the service after such changes have been posted constitutes your acceptance of the new terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at <a href="mailto:kumaryursh@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">kumaryursh@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
