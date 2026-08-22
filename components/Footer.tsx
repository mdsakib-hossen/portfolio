"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { language } = useTheme();

  return (
    <footer className="border-t border-purple-500/10 py-8 text-center">
      <p className="text-gray-500 text-sm">
        {language === "en"
          ? "Designed & Built by "
          : "ডিজাইন ও নির্মাণ করেছেন "}
        <span className="gradient-text font-semibold">Md. Sakib Hossen</span>
        {" • "}
        <span className="text-purple-400">
          {language === "en"
            ? "\"Coding is not just my skill — it's how I turn ideas into reality.\""
            : "\"কোডিং শুধু আমার দক্ষতা নয় — এটা আমার স্বপ্নকে বাস্তবে রূপ দেওয়ার উপায়।\""}
        </span>
      </p>
    </footer>
  );
}
