import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";

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
  keywords: ["web development", "HTML", "CSS", "JavaScript", "tutorials", "quizzes", "free education"],
  openGraph: {
    title: "BEECODEFI — Free Web Dev Education",
    description: "Interactive tutorials, video courses, and quizzes. 100% free, no paywall.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${dmSans.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {/* Custom cursor — hidden automatically on touch */}
            <CustomCursor />
            <Navbar />
            <main className="flex-1 pt-16">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
