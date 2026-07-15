import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Globe, Activity } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#eab308]" />,
      title: "Education",
      desc: "MCA (CGPA 6.04) & BCCA (CGPA 6.69)",
      subtitle: "Nagpur, India",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#d97706]" />,
      title: "Focus Areas",
      desc: "Power BI, Excel, SQL, Data Cleaning & Visuals",
      subtitle: "Actionable Insights",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#eab308]" />,
      title: "Core Ethos",
      desc: "Raw data to decision-ready insights.",
      subtitle: "Streamlining Reports",
    },
  ];

  return (
    <section id="about" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      {/* Decorative Orbs */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-[#8a2be2]/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-left"
      >
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>About Me</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Deciphering Data. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-[#d97706]">
            Architecting Automation.
          </span>
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Side: Mock Developer Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 glassmorphism rounded-2xl overflow-hidden shadow-2xl relative border-white/5 flex flex-col h-full"
        >
          {/* Terminal Title Bar */}
          <div className="bg-black/40 px-4 py-3 flex items-center gap-2 border-b border-white/5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-[11px] font-mono text-zinc-500 ml-4">om_profile.json</span>
          </div>

          {/* Terminal Workspace */}
          <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto flex-grow bg-black/20">
            <span className="text-teal-400">{"{"}</span>
            <div className="pl-6">
              <span className="text-pink-400">"candidate"</span>: <span className="text-[#eab308]">"Om Mate"</span>,
              <br />
              <span className="text-pink-400">"location"</span>: <span className="text-[#d97706]">"Nagpur, Maharashtra, India"</span>,
              <br />
              <span className="text-pink-400">"academics"</span>: <span className="text-orange-400">["MCA Graduate", "BCCA Graduate"]</span>,
              <br />
              <span className="text-pink-400">"skillsets"</span>: <span className="text-purple-400">{"{"}</span>
              <div className="pl-6">
                <span className="text-pink-400">"programming"</span>: <span className="text-yellow-300">["Python"]</span>,
                <br />
                <span className="text-pink-400">"databases"</span>: <span className="text-yellow-300">["SQL (MySQL, SQL Server)"]</span>,
                <br />
                <span className="text-pink-400">"analytics_tools"</span>: <span className="text-yellow-300">["Excel", "Power BI", "Power Query"]</span>
              </div>
              <span className="text-purple-400">{"}"}</span>,
              <br />
              <span className="text-pink-400">"vision"</span>: <span className="text-yellow-100">"Turning raw, unstructured data into clear, decision-ready insights."</span>
            </div>
            <span className="text-teal-400">{"}"}</span>
          </div>
        </motion.div>

        {/* Right Side: Description and Stats Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I am a <strong className="text-[#eab308]">Data Analyst</strong> with hands-on internship experience building Power BI dashboards, writing SQL queries, and cleaning data in Excel to support business reporting.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I recently completed my <strong className="text-[#d97706]">Master of Computer Applications (MCA)</strong>, which strengthened my foundation in programming, databases, and data structures. I also have project experience in Python and LLM-based automation, including building an AI resume screening tool.
            </p>
          </motion.div>

          {/* Core Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(234, 179, 8, 0.2)" }}
                className="glassmorphism p-4 rounded-xl flex flex-col gap-3 border-white/5 transition-all duration-300 select-none cursor-default"
              >
                <div className="p-2 rounded-lg bg-white/5 w-fit shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-200">{card.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 block font-medium">
                    {card.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple statistics meter */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 text-center lg:text-left">
            <div>
              <div className="text-3xl font-bold font-display text-white">1</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Internship Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display text-white">5+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Data Tools Used</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display text-white">100%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Data-Driven Focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
