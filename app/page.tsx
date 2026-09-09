import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import CPSection from "@/components/CPSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CPSection />
      <ProjectsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
