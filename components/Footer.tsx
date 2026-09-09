"use client";

import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "@/lib/data";

const MailIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socials = [
  { Icon: GithubIcon, href: profile.github, label: "GitHub" },
  { Icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
  { Icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
  { Icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="text-xl font-bold text-cyan-500">{"<Sakib />"}</div>

        {/* Quote */}
        <p className="text-slate-400 text-sm text-center max-w-md leading-relaxed">
          &ldquo;{profile.quote}&rdquo;
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={label}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:border-cyan-300 hover:text-cyan-500 transition-all"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} Md. Sakib Hossen · Designed &amp; Built with ❤️
        </p>
      </div>
    </footer>
  );
}
