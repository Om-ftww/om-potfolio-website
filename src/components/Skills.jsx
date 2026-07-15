import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, BarChart3, Binary, BrainCircuit, Terminal } from "lucide-react";

// Animated skill bar that grows from 0 when it enters the viewport
function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-slate-300">
        <span className="font-display font-semibold select-none">{name}</span>
        <motion.span
          className="font-mono text-[#eab308]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Progress track */}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
        {/* Animated fill bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#eab308] to-[#d97706] rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: `${level}%` }}
        />
        {/* Shimmer effect */}
        {isInView && (
          <motion.div
            className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            initial={{ x: -48 }}
            animate={{ x: `${level + 10}vw` }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming & DBs",
      icon: <BarChart3 className="w-6 h-6 text-[#eab308]" />,
      color: "from-[#eab308]/20 to-transparent",
      glowColor: "group-hover:border-[#eab308]/30",
      skills: [
        { name: "Python", level: 90 },
        { name: "SQL (MySQL, SQL Server)", level: 85 },
        { name: "Jupyter Notebook", level: 80 },
        { name: "GitHub & Version Control", level: 85 },
      ],
    },
    {
      title: "Data Analytics Tools",
      icon: <BrainCircuit className="w-6 h-6 text-[#d97706]" />,
      color: "from-[#d97706]/20 to-transparent",
      glowColor: "group-hover:border-[#d97706]/30",
      skills: [
        { name: "Microsoft Excel", level: 85 },
        { name: "Power BI", level: 90 },
        { name: "Power Query", level: 85 },
        { name: "PDF Data Extraction", level: 80 },
      ],
    },
    {
      title: "Analytics Capabilities",
      icon: <Database className="w-6 h-6 text-[#eab308]" />,
      color: "from-[#eab308]/20 to-transparent",
      glowColor: "group-hover:border-[#eab308]/30",
      skills: [
        { name: "Data Cleaning & Transformation", level: 90 },
        { name: "Data Visualization", level: 85 },
        { name: "KPI Reporting", level: 85 },
        { name: "Dashboarding", level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 text-center"
      >
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center justify-center gap-2">
          <Terminal className="w-4 h-4 text-[#eab308]" />
          <span>Core Capabilities</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          My Tech System
        </h3>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto">
          Fusing programming and computer applications with advanced data analytics tools.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`group rounded-2xl glassmorphism p-6 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] border-white/5 border ${category.glowColor}`}
          >
            {/* Corner hover background glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${category.color} blur-2xl opacity-40 rounded-full group-hover:opacity-75 transition-opacity duration-500`} />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                {category.icon}
              </div>
              <h4 className="font-display font-bold text-xl text-slate-100 uppercase tracking-wide">
                {category.title}
              </h4>
            </div>

            {/* Skill list with animated bar meters */}
            <div className="space-y-6 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <SkillBar
                  key={sIdx}
                  name={skill.name}
                  level={skill.level}
                  delay={idx * 0.12 + sIdx * 0.08}
                />
              ))}
            </div>

            {/* Subtle base indicator badge */}
            <div className="mt-8 flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
              <Binary className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500">Verified System Tool</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
