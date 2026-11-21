import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import CPSection from "@/components/CPSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import GitHubSection from "@/components/GitHubSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const marqueeItems = [
  "C++", "C", "Python", "Java", "JavaScript", "React Native",
  "React", "Next.js", "Flask", "FastAPI", "Firebase", "PostgreSQL",
  "MySQL", "Git",
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* HIGHLIGHTS STRIP */}
      <div className="spot">
        <div className="in">
          <span className="lead">Highlights</span>
          <a className="pill cc" href="https://www.codechef.com/users/mdsakib_dev" target="_blank" rel="noopener noreferrer">
            ⭐⭐ CodeChef 2-Star
          </a>
          <span className="pill xp">🏋️ XPSC Member</span>
          <span className="pill amb">🎖️ Shohoj Coding Ambassador</span>
          <span className="pill now">
            <span className="d" /> Building Karigori Result
          </span>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="mq" aria-hidden="true">
        <p className="lbl">Tools &amp; technologies I use every day</p>
        <div className="mq-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="mchip" key={i}>
              <span className="d" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <AboutSection />
      <SkillsSection />
      <CPSection />
      <ProjectsSection />
      <AchievementsSection />
      <GitHubSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
