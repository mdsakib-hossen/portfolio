"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User, FolderOpen, Trophy, FileText,
  MessageSquare, LogOut, LayoutDashboard,
  Menu, X, Wrench, BarChart2, Settings
} from "lucide-react";

const navItems = [
  { href: "/sakib-cp-2035/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sakib-cp-2035/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/sakib-cp-2035/dashboard/profile", label: "Profile", icon: User },
  { href: "/sakib-cp-2035/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/sakib-cp-2035/dashboard/achievements", label: "Achievements", icon: Trophy },
  { href: "/sakib-cp-2035/dashboard/skills", label: "Skills", icon: Wrench },
  { href: "/sakib-cp-2035/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/sakib-cp-2035/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/sakib-cp-2035/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/sakib-cp-2035");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "rgba(13,11,30,0.98)", borderRight: "1px solid rgba(167,139,250,0.1)" }}>

        {/* Logo */}
        <div className="p-6 border-b border-purple-500/10">
          <div className="text-xl font-bold" style={{
            background: "linear-gradient(135deg, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>{"<Sakib />"}</div>
          <p className="text-gray-500 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  active
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                style={active ? { background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.2))", border: "1px solid rgba(167,139,250,0.3)" } : {}}
              >
                <Icon size={18} className={active ? "text-purple-400" : ""} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-500/10">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium w-full">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-purple-500/10"
          style={{ background: "rgba(13,11,30,0.8)", backdropFilter: "blur(10px)" }}>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-400 text-sm">mdsakibhassan632@gmail.com</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

