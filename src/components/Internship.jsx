import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckSquare, Layers } from "lucide-react";

export default function Internship() {
  const experiences = [
    {
      role: "Data Analyst Intern",
      company: "Widesoftech Private Limited, Nagpur",
      duration: "Jan 2026 – Jun 2026",
      bullets: [
        "Built interactive Power BI dashboards to track and present key business KPIs for stakeholder reporting.",
        "Imported and consolidated data from multiple Excel sources, applying sorting, filtering, and validation rules to ensure accuracy before loading.",
        "Cleaned and transformed raw datasets using Power Query, resolving duplicates, missing values, and formatting inconsistencies.",
        "Wrote SQL queries to extract, join, and analyze data from relational databases to support ad hoc business requests.",
        "Modeled cleaned data within Power BI and structured relationships to enable accurate, real-time reporting.",
        "Translated raw data into clear visual dashboards, helping stakeholders track KPIs and make informed decisions."
      ],
      tech: ["Power BI", "SQL", "Excel", "Power Query"]
    }
  ];

  return (
    <section id="experience" className="py-32 w-full max-w-5xl mx-auto px-6 relative">
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 text-center"
      >
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center justify-center gap-2">
          <Briefcase className="w-4 h-4 text-[#eab308]" />
          <span>Professional History</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Internship Experience
        </h3>
        <p className="text-slate-400 mt-4 max-w-md mx-auto">
          Hands-on professional experience building dynamic business intelligence pipelines.
        </p>
      </motion.div>

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
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#000000] border-2 border-[#eab308] flex items-center justify-center scale-100 group-hover:scale-125 group-hover:border-[#d97706] transition-transform duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] group-hover:bg-[#d97706] transition-colors" />
            </span>

            {/* Glass Container Card */}
            <div className="glassmorphism rounded-2xl p-6 md:p-8 border-white/5 border transition-all duration-300 hover:border-[#d97706]/30 hover:shadow-[0_0_25px_rgba(217,119,6,0.03)] cursor-default">
              
              {/* Header Box */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-100 group-hover:text-[#eab308] transition-colors duration-200">
                    {exp.role}
                  </h4>
                  <span className="text-slate-400 text-sm font-semibold mt-1 block">
                    {exp.company}
                  </span>
                </div>
                
                {/* Date indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-[#d97706] font-mono w-fit font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Achievements Checklist */}
              <ul className="space-y-3.5 mb-8">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-slate-350 text-sm leading-relaxed text-slate-400">
                    <CheckSquare className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
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
                    className="px-2.5 py-1 rounded bg-[#000000] text-[10px] font-mono text-slate-300 border border-white/5"
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
