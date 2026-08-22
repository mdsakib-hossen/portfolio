import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Md. Sakib Hossen | Software Developer & Competitive Programmer",
  description:
    "Portfolio of Md. Sakib Hossen — CST Student at BPI Rajshahi, Competitive Programmer, Software Developer, and AI/ML Learner.",
  keywords: [
    "Md. Sakib Hossen",
    "Sakib Hossen",
    "Competitive Programmer",
    "Software Developer",
    "BPI Rajshahi",
    "Bangladesh",
  ],
  verification: {
    google: "C2cse6Qi1qHCwmzJIyLQojvptkYWCTBEzAdTn9mwoMs",
  },
  openGraph: {
    title: "Md. Sakib Hossen | Software Developer",
    description: "Competitive Programmer | Software Developer | AI/ML Learner",
    url: "https://mdsakib-hossen.vercel.app",
    siteName: "Md. Sakib Hossen Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
