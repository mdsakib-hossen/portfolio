"use client";

const academics = [
  {
    icon: "🎓",
    school: "Bangladesh Polytechnic Institute, Rajshahi",
    degree: "Diploma in Engineering — CST",
    year: "2025 – 2028",
    location: "Rajshahi, Bangladesh",
    current: true,
  },
  {
    icon: "🏛️",
    school: "Modhupur High School",
    degree: "JSC & SSC",
    year: "2021 – 2024",
    location: "Naogaon",
  },
  {
    icon: "🏫",
    school: "Majgram Modhupur Govt. Primary School",
    degree: "Primary School Certificate (PSC)",
    year: "2018",
    location: "Raninagar, Naogaon",
  },
];

const courses = [
  {
    icon: "🏅",
    title: "Certificate of Leadership",
    subtitle: "Campus Ambassador",
    org: "Shohoj Coding",
    year: "August 2026",
    status: "Completed",
  },
  {
    icon: "💻",
    title: "Office Management for Information & Technology",
    subtitle: "Computer Course",
    org: "Bashundhara Computer Training Center",
    year: "2024",
    status: "Completed",
  },
  {
    icon: "⚡",
    title: "CSE Fundamentals",
    subtitle: "DSA, OOP, Database, Backend, AI/ML",
    org: "Phitron (Programming Hero)",
    year: "2026 – 2027",
    status: "Ongoing",
  },
];

export default function EducationSection() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="shead">
          <span className="tag">Education</span>
          <h2>
            Background &amp; <em>learning</em>
          </h2>
          <p className="sdesc">My academic journey and ongoing learning.</p>
        </div>
        <div className="edu-grid">
          <div className="rv">
            <div className="subh">🎓 Academic Education</div>
            <div className="tl">
              {academics.map((a, i) => (
                <div className="it" key={i}>
                  <div className="y">{a.year}</div>
                  <h4>
                    {a.icon} {a.degree}
                    {a.current && <span className="now">Current</span>}
                  </h4>
                  <p>{a.school}</p>
                  <p style={{ fontSize: "12px", marginTop: "2px" }}>{a.location}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rv">
            <div className="subh">🏅 Courses &amp; Certifications</div>
            {courses.map((c, i) => (
              <div className="cert" key={i}>
                <span className={`st ${c.status === "Completed" ? "done" : "ongoing"}`}>{c.status}</span>
                <div className="em">{c.icon}</div>
                <h4>{c.title}</h4>
                <div className="sub">{c.subtitle}</div>
                <span className="org">{c.org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
