import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Code2, Database, BrainCircuit, BarChart } from "lucide-react";

export default function Projects() {
  const projectList = [
    {
      title: "AI Hiring Agent for Resume Analysis",
      desc: "Built an AI-powered hiring system to automatically analyze and evaluate candidate resumes. Extracted structured information from PDFs, integrated Github API metrics to evaluate coding activity, and generated candidate rankings.",
      tags: ["Python", "LLM", "GitHub API", "PDF Processing"],
      icon: <BrainCircuit className="w-5 h-5 text-[#eab308]" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Python Data Analysis Project",
      desc: "Developed Python applications focused on data handling, logic building, and exploratory data analysis. Built custom data processing pipelines and worked with real-world datasets to practice data structuring and reporting.",
      tags: ["Python", "Pandas", "NumPy", "Data Cleaning", "Data Analysis"],
      icon: <Code2 className="w-5 h-5 text-[#d97706]" />,
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      <div className="absolute right-0 bottom-1/3 w-80 h-80 rounded-full bg-[#8a2be2]/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 text-left"
      >
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          <span>Selected Projects</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Data & AI Showcase
        </h3>
        <p className="text-slate-400 mt-4 max-w-lg">
          Explore concrete projects detailing data intelligence pipelines and automations.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projectList.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group glassmorphism rounded-2xl p-6 border-white/5 border flex flex-col justify-between transition-all duration-300 hover:border-[#eab308]/20 hover:shadow-[0_0_30px_rgba(234,179,8,0.03)] cursor-default h-full"
          >
            <div>
              {/* Card Title Box */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#eab308]/10 transition-colors duration-300">
                  {project.icon}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={project.codeLink}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#eab308] bg-white/0 hover:bg-white/5 transition-all duration-200"
                    title="View Codebase"
                  >
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demoLink}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#eab308] bg-white/0 hover:bg-white/5 transition-all duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Title & Desc */}
              <h4 className="font-display font-bold text-xl text-slate-100 mb-3 group-hover:text-[#eab308] transition-colors duration-200">
                {project.title}
              </h4>
              <p className="text-sm text-slate-450 leading-relaxed mb-8 text-slate-400">
                {project.desc}
              </p>
            </div>

            {/* Tags Box */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono font-medium text-slate-300 group-hover:bg-white/8 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
