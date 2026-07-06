import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Code2, Database, BrainCircuit, BarChart } from "lucide-react";

export default function Projects() {
  const projectList = [
    {
      title: "AI Hiring Agent & Profile Screener",
      desc: "An intelligent autonomous workflow integrating custom LLM pipelines, semantic vector search, and resume extraction algorithms. Automatically aggregates candidates, grades technical fits, and compiles profile assessments.",
      tags: ["React", "Python", "LangChain", "OpenAI API", "Pinecone"],
      icon: <BrainCircuit className="w-5 h-5 text-[#00f2fe]" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Corporate Sales dashboard",
      desc: "A decision-grade Power BI dashboard visualizing complex multi-channel corporate sales matrices. Developed customized DAX formulas for active MoM growth tracking, forecasting, and regional analytics.",
      tags: ["Power BI", "DAX", "SQL Server", "ETL", "Excel"],
      icon: <BarChart className="w-5 h-5 text-[#8a2be2]" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "SQL Financial Data pipeline",
      desc: "Architected a high-throughput financial database schema with optimized PostgreSQL scripting, query caching, and materialized views, decreasing dashboard query latency times by 40%.",
      tags: ["PostgreSQL", "Database Optimization", "Analytical Queries", "Indexes"],
      icon: <Database className="w-5 h-5 text-[#ff007f]" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "E-Commerce Transaction Fraud Model",
      desc: "Constructed an exploratory machine learning pipeline in Python. Ran anomaly detection algorithms to flag high-risk transactions. Produced rich report metrics with Seaborn and Pandas.",
      tags: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
      icon: <Code2 className="w-5 h-5 text-[#00f2fe]" />,
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      <div className="absolute right-0 bottom-1/3 w-80 h-80 rounded-full bg-[#8a2be2]/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="mb-20 text-left">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#00f2fe] mb-2 font-bold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          <span>Selected Projects</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Data & AI Showcase
        </h3>
        <p className="text-slate-400 mt-4 max-w-lg">
          Explore concrete examples demonstrating algorithms design, data systems visualization, and autonomous agent orchestration.
        </p>
      </div>

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
            className="group glassmorphism rounded-2xl p-6 border-white/5 border flex flex-col justify-between transition-all duration-300 hover:border-[#00f2fe]/20 hover:shadow-[0_0_30px_rgba(0,242,254,0.05)] cursor-default h-full"
          >
            <div>
              {/* Card Title Box */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#00f2fe]/10 transition-colors duration-300">
                  {project.icon}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={project.codeLink}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#00f2fe] bg-white/0 hover:bg-white/5 transition-all duration-200"
                    title="View Codebase"
                  >
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demoLink}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#00f2fe] bg-white/0 hover:bg-white/5 transition-all duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Title & Desc */}
              <h4 className="font-display font-bold text-xl text-slate-100 mb-3 group-hover:text-[#00f2fe] transition-colors duration-200">
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
