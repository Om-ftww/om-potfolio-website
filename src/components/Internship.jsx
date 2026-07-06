import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckSquare, Layers } from "lucide-react";

export default function Internship() {
  const experiences = [
    {
      role: "AI Agent Developer & Researcher",
      company: "Cognitive Automation Labs",
      duration: "Dec 2025 - Present",
      bullets: [
        "Architected scalable autonomous agent workflows integrating custom tool bindings, search APIs, and RAG architectures.",
        "Refined agentic prompting loops and query routers to increase answer matching accuracy from 72% to 91%.",
        "Configured React frontends which communicate with LLM endpoints displaying real-time reasoning trails.",
        "Optimized scraper systems saving candidate resumes directly into Vector Database pipelines for automated grading."
      ],
      tech: ["LangChain", "Vector DBs", "OpenAI / Claude API", "FastAPI", "React"]
    },
    {
      role: "Data Analyst Intern",
      company: "Apex Analytics Group",
      duration: "May 2025 - Nov 2025",
      bullets: [
        "Drafted automated SQL scripts consolidating multiple relational data charts into clean summary schemas.",
        "Engineered a unified corporate Power BI sales report for executive dashboards, saving 15 hours of manual analysis per week.",
        "Cleaned and queried raw database rows utilizing Python Pandas arrays to detect and remove records anomalies.",
        "Formulated key performance indicator presentations highlighting regional growth indices and churn predictions."
      ],
      tech: ["Python", "Pandas", "PostgreSQL", "Power BI", "Excel VBA"]
    }
  ];

  return (
    <section id="experience" className="py-32 w-full max-w-5xl mx-auto px-6 relative">
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#8a2be2] mb-2 font-bold flex items-center justify-center gap-2">
          <Briefcase className="w-4 h-4 text-[#8a2be2]" />
          <span>Professional History</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Internship Experience
        </h3>
        <p className="text-slate-400 mt-4 max-w-md mx-auto">
          Proven contributions in analytics labs and AI agent development operations.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-12 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group progress-event-node"
          >
            {/* Pulsing Timeline Marker */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#030014] border-2 border-[#00f2fe] flex items-center justify-center scale-100 group-hover:scale-125 group-hover:border-[#8a2be2] transition-transform duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] group-hover:bg-[#8a2be2] transition-colors" />
            </span>

            {/* Glass Container Card */}
            <div className="glassmorphism rounded-2xl p-6 md:p-8 border-white/5 border transition-all duration-300 hover:border-[#8a2be2]/30 hover:shadow-[0_0_25px_rgba(138,43,226,0.03)] cursor-default">
              
              {/* Header Box */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-100 group-hover:text-[#00f2fe] transition-colors duration-200">
                    {exp.role}
                  </h4>
                  <span className="text-slate-400 text-sm font-semibold mt-1 block">
                    {exp.company}
                  </span>
                </div>
                
                {/* Date indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-[#8a2be2] font-mono w-fit font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Achievements Checklist */}
              <ul className="space-y-3.5 mb-8">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-slate-350 text-sm leading-relaxed text-slate-400">
                    <CheckSquare className="w-4 h-4 text-[#00f2fe] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1 mr-1 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                  <Layers className="w-3 h-3 text-zinc-500" />
                  <span>Stack:</span>
                </div>
                {exp.tech.map((item, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded bg-[#030014] text-[10px] font-mono text-slate-300 border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
