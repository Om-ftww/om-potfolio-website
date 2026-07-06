import React from "react";
import { Database, BarChart3, Binary, BrainCircuit, Terminal } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Data Analytics",
      icon: <BarChart3 className="w-6 h-6 text-[#00f2fe]" />,
      color: "from-[#00f2fe]/20 to-transparent",
      glowColor: "group-hover:border-[#00f2fe]/30",
      skills: [
        { name: "Python (Pandas, NumPy, Scikit-learn)", level: 90 },
        { name: "SQL (MySQL, PostgreSQL)", level: 85 },
        { name: "Power BI (DAX, Reports)", level: 80 },
        { name: "Excel (VBA, Pivot Tables)", level: 90 },
      ],
    },
    {
      title: "AI & Agentic Dev",
      icon: <BrainCircuit className="w-6 h-6 text-[#8a2be2]" />,
      color: "from-[#8a2be2]/20 to-transparent",
      glowColor: "group-hover:border-[#8a2be2]/30",
      skills: [
        { name: "LLMs (OpenAI, Gemini API Integration)", level: 85 },
        { name: "LangChain (RAG, Chatbots)", level: 80 },
        { name: "AI Agents (Automated Hiring, Scrapers)", level: 90 },
        { name: "Vector Databases (Pinecone, Chroma)", level: 75 },
      ],
    },
    {
      title: "Software & MCA Core",
      icon: <Database className="w-6 h-6 text-[#ff007f]" />,
      color: "from-[#ff007f]/20 to-transparent",
      glowColor: "group-hover:border-[#ff007f]/30",
      skills: [
        { name: "Data Structures & Algorithms", level: 80 },
        { name: "DBMS & Systems Engineering", level: 85 },
        { name: "React.js & Tailwind CSS", level: 90 },
        { name: "Git & Version Control", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="mb-20 text-center">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#8a2be2] mb-2 font-bold flex items-center justify-center gap-2">
          <Terminal className="w-4 h-4 text-[#8a2be2]" />
          <span>Core Capabilities</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          My Tech System
        </h3>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto">
          Fusing computer applications principles with visual modeling frameworks and agentic intelligence.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
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

            {/* Skill list with bar meters */}
            <div className="space-y-6 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-300">
                    <span className="font-display font-semibold select-none">{skill.name}</span>
                    <span className="font-mono text-[#00f2fe]">{skill.level}%</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                    {/* Animated Fill */}
                    <div
                      className="h-full bg-gradient-to-r from-[#00f2fe] to-[#8a2be2] rounded-full transition-all duration-1000 ease-out origin-left"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Subtle base indicator badge */}
            <div className="mt-8 flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
              <Binary className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500">Verified System Tool</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
