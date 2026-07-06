import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Sparkles } from "lucide-react";

export default function Hero() {
  const words = [
    "Data Analyst",
    "MCA Graduate",
    "AI Hiring Agent Developer",
    "Power BI Dashboard Builder",
    "Python Developer"
  ];
  
  const [wordIdx, setWordIdx] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Typing speed configuration
  useEffect(() => {
    if (subIndex === words[wordIdx].length + 1 && !isDeleting) {
      // Pause at full word
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting]);

  useEffect(() => {
    setTypedText(words[wordIdx].substring(0, subIndex));
  }, [subIndex, wordIdx]);

  // Handle local CV download action (sends a sample mock CV or notification)
  const handleDownloadCV = () => {
    // We create a temporary virtual anchor tag to download a resume placeholder or actual CV
    const link = document.createElement("a");
    link.href = "#";
    // For now, prompt the user that downloading has started
    alert("CV downloading is initialized! Feel free to replace the document path inside src/components/Hero.jsx.");
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-0"
    >
      {/* Dynamic Cyberpunk background grids */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8a2be2]/10 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00f2fe]/10 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs tracking-[0.2em] font-semibold text-[#00f2fe] uppercase mb-8 select-none"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00f2fe]" />
          <span>Available for Roles & Internships</span>
        </motion.div>

        {/* Big Name Hook */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6 select-none"
        >
          Om Narayanrao{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#8a2be2] to-[#ff007f] relative">
            Mate
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-[#00f2fe] to-[#8a2be2] blur-[4px] opacity-40 rounded-full" />
          </span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-10 sm:h-12 font-display text-xl sm:text-3xl font-semibold text-slate-100 flex items-center mb-8 selection:bg-purple-900 select-none"
        >
          <span className="text-slate-300">I am a&nbsp;</span>
          <span className="text-[#00f2fe] font-bold border-r-2 border-[#00f2fe] pr-1.5 animate-pulse">
            {typedText}
          </span>
        </motion.div>

        {/* Summary Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-12"
        >
          Bridging the gap between raw data insights and state-of-the-art AI. I engineer intelligent systems, custom 
          data pipelines, and interactive business intelligence engines designed to supercharge operations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-16"
        >
          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f2fe] text-slate-950 font-bold tracking-wide shadow-lg shadow-[#00f2fe]/20 hover:shadow-[#00f2fe]/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </button>
          
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-[#00f2fe]/40 bg-white/5 text-slate-100 hover:text-[#00f2fe] font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 glow-button-blue"
          >
            <span>Let's Connect</span>
          </a>
        </motion.div>

        {/* Social Platforms Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center gap-6 text-zinc-500 hover:text-zinc-400"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/5 hover:border-[#00f2fe]/20 bg-white/3 hover:bg-[#00f2fe]/10 text-slate-400 hover:text-[#00f2fe] transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/5 hover:border-[#8a2be2]/20 bg-white/3 hover:bg-[#8a2be2]/10 text-slate-400 hover:text-[#8a2be2] transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Down button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-[#00f2fe] font-medium">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-[#00f2fe]" />
      </div>
    </section>
  );
}
