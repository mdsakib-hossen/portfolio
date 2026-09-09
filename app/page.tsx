import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import CPStatsSection from "@/components/CPStatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050b14]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CPStatsSection />
      <ProjectsSection />
      <AchievementsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
