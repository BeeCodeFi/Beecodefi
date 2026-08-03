import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/ui/CustomCursor";
import CursorTrail from "@/components/ui/CursorTrail";
import PageTransition from "@/components/ui/PageTransition";
import { ToastProvider } from "@/context/ToastContext";
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// Inter — body text (readable, neutral)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// DM Sans — display headings (geometric, premium feel like Vercel/Linear)
const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BEECODEFI — Free Web Dev Education for Everyone",
  description:
    "Learn HTML, CSS, JavaScript and more with free interactive tutorials, video courses and quizzes. BEECODEFI provides world-class web development education — completely free.",
  keywords: [
    "web development",
    "HTML",
    "CSS",
    "JavaScript",
    "tutorials",
    "quizzes",
    "free education",
  ],
  openGraph: {
    title: "BEECODEFI — Free Web Dev Education",
    description:
      "Interactive tutorials, video courses, and quizzes. 100% free, no paywall.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <ToastProvider>
              {/* Skip to content — visible on focus for keyboard users */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-semibold focus:text-sm focus:shadow-lg"
              >
                Skip to content
              </a>
              {/* Custom cursor — hidden automatically on touch */}
              <CustomCursor />
              <CursorTrail />
              <Navbar />
              <main className="flex-1 pt-16" id="main-content" role="main">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <OnboardingTour />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
