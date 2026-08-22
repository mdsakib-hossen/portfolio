// =============================================
// CENTRAL DATA FILE
// সব data এখানে। এখানে change করলে
// website + resume দুই জায়গায় auto update হবে
// =============================================

export const profile = {
  name: "Md. Sakib Hossen",
  title: "Software Developer · Competitive Programmer · AI/ML Learner",
  email: "mdsakibhassan632@gmail.com",
  location: "Rajshahi, Bangladesh",
  institute: "Bangladesh Polytechnic Institute, Rajshahi",
  department: "Computer Science & Technology (CST)",
  photo: "/profile.jpg",
  github: "https://github.com/mdsakib-hossen",
  linkedin: "https://www.linkedin.com/in/mdsakib-hossen",
  facebook: "https://www.facebook.com/share/17rPGzDWHM/",
  quote: "Coding is not just my skill — it's how I turn ideas into reality, one problem at a time.",
  about: {
    en: "Computer Science & Technology student at Bangladesh Polytechnic Institute, Rajshahi. Passionate about Competitive Programming, Software Development, and Artificial Intelligence. Currently training with XPSC (Xtreme Problem Solvers Club) at Phitron and serving as Shohoj Coding Campus Ambassador. I build real-world projects that solve actual problems.",
    bn: "Bangladesh Polytechnic Institute, রাজশাহীতে Computer Science & Technology পড়ছি। Competitive Programming আর real-world software বানানো নিয়ে আমার গভীর আগ্রহ। Phitron এর XPSC-তে প্রশিক্ষণ নিচ্ছি এবং Shohoj Coding Campus Ambassador হিসেবে কাজ করছি।",
  },
  typingTexts: {
    en: [
      "Competitive Programmer",
      "Software Developer",
      "AI/ML Learner",
      "CST Student @ BPI Rajshahi",
      "Shohoj Coding Ambassador",
    ],
    bn: [
      "কম্পিটিটিভ প্রোগ্রামার",
      "সফটওয়্যার ডেভেলপার",
      "AI/ML শিক্ষার্থী",
      "BPI রাজশাহী CST ছাত্র",
    ],
  },
};

export const education = [
  {
    institute: "Bangladesh Polytechnic Institute, Rajshahi",
    degree: "Diploma in Engineering",
    field: "Computer Science & Technology (CST)",
    start: "2025",
    end: "2028",
    location: "Rajshahi, Bangladesh",
  },
  {
    institute: "Phitron (Programming Hero)",
    degree: "Certificate",
    field: "CSE Fundamentals, Backend Development, AI/ML",
    start: "2026",
    end: "2027",
    location: "Online",
  },
];

export const skills = [
  {
    category: { en: "Languages", bn: "ভাষা" },
    color: "from-purple-600 to-purple-400",
    items: [
      { name: "C++", level: 80 },
      { name: "C", level: 75 },
      { name: "Python", level: 78 },
      { name: "Java", level: 60 },
      { name: "JavaScript", level: 65 },
      { name: "HTML/CSS", level: 80 },
    ],
  },
  {
    category: { en: "Frameworks", bn: "ফ্রেমওয়ার্ক" },
    color: "from-pink-600 to-pink-400",
    items: [
      { name: "React Native", level: 75 },
      { name: "React", level: 70 },
      { name: "Flask", level: 75 },
      { name: "FastAPI", level: 65 },
      { name: "Expo", level: 70 },
      { name: "Next.js", level: 60 },
    ],
  },
  {
    category: { en: "Database & Tools", bn: "ডেটাবেস ও টুলস" },
    color: "from-blue-600 to-blue-400",
    items: [
      { name: "Firebase", level: 80 },
      { name: "PostgreSQL", level: 72 },
      { name: "MySQL", level: 68 },
      { name: "Git", level: 78 },
      { name: "VS Code", level: 90 },
      { name: "Linux", level: 60 },
    ],
  },
  {
    category: { en: "Concepts", bn: "কনসেপ্ট" },
    color: "from-cyan-600 to-cyan-400",
    items: [
      { name: "DSA", level: 78 },
      { name: "OOP", level: 80 },
      { name: "REST API", level: 75 },
      { name: "JWT Auth", level: 72 },
      { name: "Database Design", level: 70 },
      { name: "Machine Learning", level: 40 },
    ],
  },
];

export const cpProfiles = [
  { platform: "Codeforces", handle: "mdsakibhossen", url: "https://codeforces.com/profile/mdsakibhossen", color: "from-blue-600 to-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", icon: "CF" },
  { platform: "CodeChef", handle: "mdsakib_dev", url: "https://www.codechef.com/users/mdsakib_dev", color: "from-amber-600 to-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", icon: "CC" },
  { platform: "LeetCode", handle: "mdsakib-dev", url: "https://leetcode.com/u/mdsakib-dev/", color: "from-yellow-600 to-yellow-400", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", icon: "LC" },
  { platform: "AtCoder", handle: "mdsakibhossen", url: "https://atcoder.jp/users/mdsakibhossen", color: "from-gray-400 to-gray-200", bgColor: "bg-gray-500/10", borderColor: "border-gray-500/30", icon: "AC" },
  { platform: "HackerRank", handle: "hassanmdshakib61", url: "https://www.hackerrank.com/profile/hassanmdshakib61", color: "from-green-600 to-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/30", icon: "HR" },
  { platform: "VJudge", handle: "mdsakibhossen", url: "https://vjudge.net/user/mdsakibhossen", color: "from-cyan-600 to-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/30", icon: "VJ" },
];

export const projects = [
  {
    title: "BPI EduManage",
    subtitle: { en: "Digital Campus Management System", bn: "ডিজিটাল ক্যাম্পাস ম্যানেজমেন্ট সিস্টেম" },
    description: {
      en: "Full-stack mobile + web campus management system for Bangladesh Polytechnic Institute. Won 2nd Place at BPI Hobby Fair. Supports 5 roles: Admin, Teacher, Student, Guardian, Accountant.",
      bn: "Bangladesh Polytechnic Institute এর জন্য সম্পূর্ণ mobile + web ক্যাম্পাস ম্যানেজমেন্ট সিস্টেম। BPI Hobby Fair এ 2nd Place!",
    },
    tags: ["React Native", "Expo", "React", "Firebase", "Vite", "JWT Auth"],
    liveUrl: null,
    githubUrl: null,
    award: "🥈 BPI Hobby Fair 2nd Place",
    status: { en: "Private", bn: "প্রাইভেট" },
    statusType: "private",
    color: "from-purple-600 to-pink-600",
  },
  {
    title: "College Canteen Pre-Order System",
    subtitle: { en: "QR Token Food Pre-Order System", bn: "QR টোকেন ফুড প্রি-অর্ডার সিস্টেম" },
    description: {
      en: "Web-based canteen food pre-order system with QR Token generation. Students order online to skip queues. Deployed on Render with Neon PostgreSQL.",
      bn: "অনলাইনে ক্যান্টিনের খাবার আগেই অর্ডার করো এবং QR টোকেন পাও — আর লাইনে দাঁড়াতে হবে না!",
    },
    tags: ["Python", "Flask", "PostgreSQL", "Neon", "HTML", "CSS"],
    liveUrl: "https://college-canteen-mdhg.onrender.com",
    githubUrl: "https://github.com/mdsakib-hossen/college-canteen",
    award: null,
    status: { en: "Live", bn: "লাইভ" },
    statusType: "live",
    color: "from-green-600 to-cyan-600",
  },
  {
    title: "Karigori Result",
    subtitle: { en: "BTEB Result Platform", bn: "BTEB রেজাল্ট প্ল্যাটফর্ম" },
    description: {
      en: "Complete BTEB result platform for all Polytechnic students of Bangladesh (50%+ complete). Features: Quick Result, Grade Result via BTEB API, Institute/National Leaderboard, CGPA Calculator, Bangla/English toggle, AI Grade Prediction (upcoming).",
      bn: "বাংলাদেশের সব Polytechnic ছাত্রদের জন্য সম্পূর্ণ BTEB রেজাল্ট প্ল্যাটফর্ম। Quick Result, Leaderboard, CGPA Calculator, AI Prediction।",
    },
    tags: ["Python", "Flask", "PostgreSQL", "JavaScript", "BTEB API", "JWT"],
    liveUrl: null,
    githubUrl: null,
    award: null,
    status: { en: "In Development", bn: "নির্মাণাধীন" },
    statusType: "dev",
    color: "from-orange-600 to-red-600",
  },
];

export const achievements = [
  {
    icon: "🥈",
    title: { en: "2nd Place — BPI Hobby Fair", bn: "২য় স্থান — BPI Hobby Fair" },
    org: "Bangladesh Polytechnic Institute · EduManage",
    year: "2025",
    color: "from-gray-400 to-gray-200",
  },
  {
    icon: "🏆",
    title: { en: "XPSC Member — Xtreme Problem Solvers Club", bn: "XPSC সদস্য — Xtreme Problem Solvers Club" },
    org: "Phitron · Selected through competitive exam",
    year: "2026",
    color: "from-yellow-600 to-yellow-400",
  },
  {
    icon: "🏅",
    title: { en: "Certificate of Leadership — Campus Ambassador", bn: "নেতৃত্ব সনদ — Campus Ambassador" },
    org: "Shohoj Coding · August 2026",
    year: "2026",
    color: "from-purple-600 to-purple-400",
  },
  {
    icon: "🎓",
    title: { en: "Campus Ambassador", bn: "ক্যাম্পাস অ্যাম্বাসেডর" },
    org: "Shohoj Coding",
    year: "2025",
    color: "from-pink-600 to-pink-400",
  },
];

export const stats = [
  { value: 3, suffix: "+", label: { en: "Projects", bn: "প্রজেক্ট" } },
  { value: 100, suffix: "+", label: { en: "Problems Solved", bn: "সমস্যা সমাধান" } },
  { value: 6, suffix: "", label: { en: "CP Platforms", bn: "CP প্ল্যাটফর্ম" } },
  { value: 1, suffix: "", label: { en: "Award Won", bn: "পুরস্কার" } },
];
