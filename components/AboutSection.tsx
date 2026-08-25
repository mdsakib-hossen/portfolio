"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { stats } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default function AboutSection() {
  const { language } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data }) => {
      if (data) setProfileData(data);
    });
  }, []);

  const name = profileData?.name || "Md. Sakib Hossen";
  const photo = profileData?.photo_url || "";
  const about = language === "en"
    ? (profileData?.about_en || "Computer Science & Technology student at Bangladesh Polytechnic Institute, Rajshahi. Passionate about Competitive Programming, Software Development, and AI/ML.")
    : (profileData?.about_bn || "Bangladesh Polytechnic Institute, রাজশাহীতে Computer Science & Technology পড়ছি। Competitive Programming আর real-world software বানানো নিয়ে আমার গভীর আগ্রহ।");
  const location = profileData?.location || "Rajshahi, Bangladesh";
  const email = profileData?.email || "mdsakibhassan632@gmail.com";

  return (
    <section id="about" className="section-padding w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// GET TO KNOW ME" : "// আমার সম্পর্কে"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            {language === "en" ? "About Me" : "পরিচয়"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 scale-105" />
              <div className="gradient-border relative w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden">
                {photo ? (
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-6xl">
                    👤
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 glass px-2 sm:px-3 py-1.5 rounded-full flex items-center gap-2 max-w-[90%]">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-xs text-green-400 truncate">
                  {language === "en" ? "Open to Collaboration" : "কোলাবোরেশনে আগ্রহী"}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {language === "en" ? "Hi, I'm Sakib 👋" : "হ্যালো, আমি সাকিব 👋"}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{about}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: language === "en" ? "Institute" : "প্রতিষ্ঠান", value: "Bangladesh Polytechnic Institute" },
                { label: language === "en" ? "Department" : "বিভাগ", value: "CST" },
                { label: language === "en" ? "Location" : "অবস্থান", value: location },
                { label: language === "en" ? "Email" : "ইমেইল", value: email },
              ].map(({ label, value }) => (
                <div key={label} className="glass p-3 sm:p-4 rounded-xl min-w-0 overflow-hidden">
                  <p className="text-purple-400 text-xs font-mono mb-1">{label}</p>
                  <p className="text-white text-sm font-medium truncate">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-4 sm:p-6 rounded-2xl text-center glow-purple">
              <div className="text-2xl sm:text-4xl font-bold gradient-text mb-2">
                {inView && <CountUp end={value} duration={2} suffix={suffix} />}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">{label[language]}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}



