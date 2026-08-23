import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://mdsakib-hossen.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Md. Sakib Hossen | Software Developer & Competitive Programmer",
    template: "%s | Md. Sakib Hossen",
  },
  description:
    "Portfolio of Md. Sakib Hossen — CST Student at BPI Rajshahi, Competitive Programmer, Software Developer, and AI/ML Learner. Building real-world projects and aiming for CP Grandmaster.",
  keywords: [
    "Md. Sakib Hossen",
    "Sakib Hossen",
    "mdsakib-hossen",
    "Competitive Programmer Bangladesh",
    "Software Developer Bangladesh",
    "BPI Rajshahi CST",
    "Bangladesh Polytechnic Institute",
    "Codeforces Bangladesh",
    "Next.js Developer Bangladesh",
    "Flask Developer Bangladesh",
    "React Native Developer",
    "AI ML Learner Bangladesh",
  ],
  authors: [{ name: "Md. Sakib Hossen", url: BASE_URL }],
  creator: "Md. Sakib Hossen",
  publisher: "Md. Sakib Hossen",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "C2cse6Qi1qHCwmzJIyLQojvptkYWCTBEzAdTn9mwoMs",
  },
  openGraph: {
    type: "profile",
    firstName: "Md. Sakib",
    lastName: "Hossen",
    username: "mdsakib-hossen",
    title: "Md. Sakib Hossen | Software Developer & Competitive Programmer",
    description:
      "CST Student at BPI Rajshahi • Competitive Programmer • Software Developer • AI/ML Learner • Building real-world projects",
    url: BASE_URL,
    siteName: "Md. Sakib Hossen Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Md. Sakib Hossen - Software Developer & Competitive Programmer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Sakib Hossen | Software Developer",
    description: "Competitive Programmer | Software Developer | AI/ML Learner",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md. Sakib Hossen",
  alternateName: ["Sakib Hossen", "mdsakib-hossen"],
  description:
    "Computer Science & Technology student at Bangladesh Polytechnic Institute, Rajshahi. Competitive Programmer, Software Developer, and AI/ML Learner.",
  url: BASE_URL,
  email: "mdsakibhassan632@gmail.com",
  jobTitle: "Software Developer & Competitive Programmer",
  affiliation: {
    "@type": "EducationalOrganization",
    name: "Bangladesh Polytechnic Institute, Rajshahi",
    url: "https://bpi.gov.bd",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bangladesh Polytechnic Institute, Rajshahi",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rajshahi",
    addressCountry: "BD",
  },
  sameAs: [
    "https://github.com/mdsakib-hossen",
    "https://www.linkedin.com/in/mdsakib-hossen",
    "https://codeforces.com/profile/mdsakibhossen",
    "https://leetcode.com/u/mdsakib-dev/",
    "https://www.codechef.com/users/mdsakib_dev",
  ],
  knowsAbout: [
    "Competitive Programming",
    "Software Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures and Algorithms",
    "React Native",
    "Flask",
    "Python",
    "C++",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
