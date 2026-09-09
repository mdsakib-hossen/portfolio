"use client";

import { education } from "@/lib/data";

const phitronCourses = [
  { name: "CSE Fundamentals", status: "Ongoing" },
  { name: "Backend Development with Python & Django", status: "Upcoming" },
  { name: "AI / Machine Learning", status: "Upcoming" },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Education</h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            My academic journey and ongoing learning
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mb-14">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-5 bottom-5 w-0.5 hidden sm:block"
            style={{ background: "linear-gradient(to bottom, #06b6d4, #e2e8f0)" }}
          />

          <div className="flex flex-col gap-10">
            {education.map((item, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border-4 border-white shadow-sm items-center justify-center z-10"
                  style={{ background: "#06b6d4" }}>
                  <span className="text-white text-xs font-bold">🎓</span>
                </div>

                {/* Card */}
                <div className="card flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {item.institute}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                      style={{ background: "#f0fdfe", color: "#06b6d4", border: "1px solid #a5f3fc" }}
                    >
                      {item.start} – {item.end}
                    </span>
                  </div>

                  <p className="text-slate-700 font-semibold text-sm mb-2">{item.degree}</p>
                  <p className="text-slate-500 text-sm mb-3">{item.field}</p>
                  <p className="text-slate-400 text-xs">📍 {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phitron courses */}
        <div className="max-w-3xl mx-auto">
          <div className="card md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0ea5e9)" }}
              >
                P
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Phitron — Programming Hero</h3>
                <p className="text-slate-400 text-xs">Online Courses · 2026–2027</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {phitronCourses.map((course) => (
                <div
                  key={course.name}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <span className="text-slate-700 text-sm font-medium">{course.name}</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                    style={
                      course.status === "Ongoing"
                        ? { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }
                        : { background: "#f8fafc", color: "#94a3b8", border: "1px solid #e2e8f0" }
                    }
                  >
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
