import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certificates() {
  const certificates = [
    {
      title: "Data Analyst Internship Certificate",
      org: "Wide Softech Pvt Ltd",
      date: "Jan 2026 – Jun 2026",
      desc: "Successfully completed a 6-month hands-on Data Analyst internship. Built interactive Power BI dashboards, cleaned and transformed raw datasets in Power Query, and wrote optimized SQL queries under the guidance of Mr. Harshal Fulmali.",
      id: "Ref: WSPLN/1133/10/06/2026",
      link: "/Om_Narayanrao_Mate_Cirtificate.pdf"
    },
    {
      title: "Python Language Certification",
      org: "G H Raisoni Skill Tech University",
      date: "2025",
      desc: "Earned academic certification in Python Programming, validating expertise in core programming methodologies, data structures, and computer application analytics.",
      id: "GHRSTU-PY-2025",
      link: "#"
    }
  ];

  // Container variants for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Card variants for flying/fade up animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div id="certificates" className="relative bg-[#000000] overflow-hidden min-h-[75vh] py-24 flex items-center">
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#eab308]/3 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header container */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-3 font-bold flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-[#eab308]" />
            <span>Professional Credentials</span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-white"
          >
            Certifications
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 mt-3 text-sm max-w-md mx-auto"
          >
            Verified credentials highlighting professional internship experience and academic qualifications.
          </motion.p>
        </div>

        {/* Certificates Grid - Responsive layout that scrolls naturally */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col justify-between hover:border-[#eab308]/30 hover:shadow-[0_12px_30px_rgba(234,179,8,0.04)] transition-all duration-300 group cursor-default select-none relative"
            >
              <div>
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#eab308]/10 group-hover:border-[#eab308]/20 transition-all duration-300 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-[#eab308]" />
                  </div>
                  <span className="text-xs font-mono text-[#eab308] font-semibold">{cert.org}</span>
                </div>

                {/* Info titles */}
                <h4 className="font-display font-bold text-xl text-slate-100 mb-3 group-hover:text-[#eab308] transition-all duration-200 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {cert.desc}
                </p>
              </div>

              {/* Extra details */}
              <div className="border-t border-white/5 pt-5 flex items-center justify-between mt-4">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Date Issued</div>
                  <div className="text-sm font-semibold text-slate-350 font-display mt-0.5">{cert.date}</div>
                </div>
                
                {cert.link !== "#" ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#eab308]/10 hover:bg-[#eab308]/20 text-[#eab308] hover:text-white border border-[#eab308]/20 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    title="Verify Credential"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    Academic Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
