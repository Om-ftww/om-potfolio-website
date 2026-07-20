import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Database, LineChart, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Cursor Spotlight Tracking
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.getElementById('home');
      if (section) {
        const rect = section.getBoundingClientRect();
        setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll to projects
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Particles
  const [particles] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      size: Math.random() * 3.5 + 1.5,
      x: Math.random() * 95 + 2.5,
      y: Math.random() * 95 + 2.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
    }))
  );

  // Animation variants
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 140, damping: 14 },
    },
  };

  // CardGlass — theme-aware background
  const CardGlass = ({ children, className = '', floatDuration = 5, floatDelay = 0 }) => (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      className={`glassmorphism backdrop-blur-xl rounded-2xl p-3.5 flex flex-col gap-1.5 min-w-[155px] max-w-[175px] select-none text-left pointer-events-none shadow-[0_8px_28px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );

  // Slide-out entrance: cards come FROM behind the circle center outward
  const cardEntrance = (fromLeft, delay) => ({
    initial: { x: fromLeft ? 110 : -110, opacity: 0, scale: 0.7 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 pt-28 pb-16 lg:py-24"
      style={{ backgroundColor: isLight ? '#FAF8F2' : '#000000' }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: isLight
            ? `radial-gradient(550px circle at ${spotlight.x}px ${spotlight.y}px, rgba(234,179,8,0.045), transparent 82%)`
            : `radial-gradient(650px circle at ${spotlight.x}px ${spotlight.y}px, rgba(234,179,8,0.065), transparent 82%)`,
          zIndex: 1,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(to right,rgba(0,0,0,0.012) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.012) 1px,transparent 1px)'
            : 'linear-gradient(to right,rgba(255,255,255,0.006) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.006) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          zIndex: 1,
        }}
      />

      {/* Chart lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M -100 380 Q 250 180 550 400 T 1150 220 T 1700 420"
          fill="none" stroke={isLight ? '#eab308' : '#facc15'} strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M -100 460 Q 350 250 750 440 T 1350 280 T 1900 480"
          fill="none" stroke={isLight ? '#111827' : '#ffffff'} strokeWidth="1.2" strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow-400/30 dark:bg-yellow-500/20 pointer-events-none z-[1]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Large background glow behind portrait */}
      <div
        className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 72%)'
            : 'radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 72%)',
          right: '5%', top: '5%',
        }}
      />

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* LEFT – TEXT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left select-text"
        >
          {/* Status pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 font-mono text-[10.5px] font-bold uppercase tracking-wider mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for Data Analyst Roles
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.08] tracking-tight text-white"
          >
            Data Analyst &amp; <br className="hidden sm:inline" />
            <span className="text-[#eab308]">Business Intelligence</span> <br className="hidden sm:inline" />
            Developer
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-slate-350 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl mt-6 mb-8"
          >
            Transforming raw data into actionable business insights using Python, SQL, Power BI, Excel, Pandas, and Machine Learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <motion.a
              href="#projects"
              onClick={handleScrollToProjects}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full bg-[#eab308] hover:bg-[#d97706] text-black hover:text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_12px_24px_rgba(234,179,8,0.15)] hover:shadow-[0_12px_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2 select-none cursor-pointer border border-[#eab308] hover:border-[#d97706]"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/OM_MATE_Resume_updated.pdf"
              download="OM_MATE_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full border border-white/10 text-slate-200 bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.07] backdrop-blur-md font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Tech pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 max-w-xl">
            {['Python', 'SQL', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Scikit-Learn'].map((tech) => (
              <motion.span
                key={tech}
                variants={pillVariants}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/5 text-slate-350 border border-white/5 tracking-tight"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT – PORTRAIT */}
        <div className="lg:col-span-5 flex justify-center items-end relative h-[480px] sm:h-[560px] lg:h-[680px] w-full">
          {/* Inner portrait container — all children are relative to this */}
          <div className="relative flex justify-center items-end h-[420px] sm:h-[520px] lg:h-[620px] w-[320px] sm:w-[400px] lg:w-[480px]">

            {/* Z-LAYER MAP:
                z-0  → Yellow circle
                z-[5] → Analytics cards (behind photo, above circle)
                z-10 → Clip container + photo (on top of cards, face always clear)
            */}

            {/* Yellow Circle */}
            <motion.div
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 z-0 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full select-none shadow-[0_24px_60px_rgba(234,179,8,0.28)]"
              style={{ background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)' }}
            />

            {/* Ambient Glow */}
            <div className="absolute bottom-0 z-[-1] w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full bg-yellow-400/22 blur-2xl pointer-events-none select-none" />

            {/* ── CARDS at z-[5] — BEHIND the photo ──
                 Positioned at left/right edges at two heights:
                   Upper row: bottom-[36%] → shoulder level (below chin, above waist)
                   Lower row: bottom-[13%] → waist/body level
                 Entrance: slide OUT from circle center, then float gently */}

            {/* Card 1: Dashboard — LEFT UPPER (shoulder) */}
            <motion.div
              className="absolute z-[5] hidden sm:block -left-[45px] lg:-left-[75px]"
              style={{ bottom: '48%' }}
              {...cardEntrance(true, 1.0)}
            >
              <CardGlass floatDuration={5.5} floatDelay={0.2}>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-green-500/10 text-green-500"><TrendingUp className="w-3.5 h-3.5" /></span>
                  <span className="font-display font-bold text-[11px] text-slate-400">Dashboard</span>
                </div>
                <div className="font-display font-black text-sm text-white flex items-center gap-1.5">
                  Revenue <span className="text-green-500 font-extrabold text-xs">↑24.6%</span>
                </div>
              </CardGlass>
            </motion.div>

            {/* Card 2: SQL Analytics — RIGHT UPPER (shoulder) */}
            <motion.div
              className="absolute z-[5] hidden sm:block -right-[60px] lg:-right-[100px]"
              style={{ bottom: '36%' }}
              {...cardEntrance(false, 1.15)}
            >
              <CardGlass floatDuration={4.5} floatDelay={0.5}>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#eab308]/10 text-[#eab308]"><Database className="w-3.5 h-3.5" /></span>
                  <span className="font-display font-bold text-[11px] text-slate-400">SQL Analytics</span>
                </div>
                <div className="font-display font-black text-sm text-white pl-0.5">150+ Queries</div>
                <div className="text-[9px] font-mono font-bold text-slate-355 pl-0.5 border-t border-white/5 pt-1 mt-0.5">
                  MySQL • PostgreSQL
                </div>
              </CardGlass>
            </motion.div>

            {/* Card 3: Python — LEFT LOWER (waist) */}
            <motion.div
              className="absolute z-[5] hidden sm:block -left-[75px] lg:-left-[115px]"
              style={{ bottom: '13%' }}
              {...cardEntrance(true, 1.3)}
            >
              <CardGlass floatDuration={6} floatDelay={0.8}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-500"><Code className="w-3.5 h-3.5" /></span>
                  <span className="font-display font-bold text-[11px] text-slate-400">Python</span>
                </div>
                <div className="flex flex-col gap-0.5 pl-1.5 border-l-2 border-sky-400/30">
                  <span className="text-[10.5px] font-mono font-bold text-slate-200">Pandas</span>
                  <span className="text-[10.5px] font-mono font-bold text-slate-200">NumPy</span>
                  <span className="text-[10.5px] font-mono font-bold text-slate-200">Scikit-Learn</span>
                </div>
              </CardGlass>
            </motion.div>

            {/* Card 4: Power BI — RIGHT LOWER (waist) */}
            <motion.div
              className="absolute z-[5] hidden sm:block -right-[75px] lg:-right-[115px]"
              style={{ bottom: '13%' }}
              {...cardEntrance(false, 1.45)}
            >
              <CardGlass floatDuration={5} floatDelay={1.1}>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#eab308]/10 text-[#eab308]"><LineChart className="w-3.5 h-3.5" /></span>
                  <span className="font-display font-bold text-[11px] text-slate-400">Power BI</span>
                </div>
                <div className="font-display font-black text-sm text-[#eab308] pl-0.5">
                  Interactive Dashboards
                </div>
              </CardGlass>
            </motion.div>

            {/* Clip container at z-10 — renders ON TOP of all cards.
                rounded-b-full clips only the bottom → hair pops out above the circle.
                The face is always above the cards because the photo is inside z-10. */}
            <div className="absolute bottom-0 z-10 overflow-hidden w-[280px] h-[340px] sm:w-[360px] sm:h-[430px] lg:w-[440px] lg:h-[530px] rounded-b-full flex items-end justify-center pointer-events-none select-none">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop', delay: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <motion.img
                  src="/profile.png"
                  alt="Om Narayanrao Mate profile"
                  className="absolute left-1/2 -translate-x-1/2 w-auto max-w-none object-contain select-none origin-bottom bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-40px] h-[108%]"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x550/eab308/ffffff?text=Om+Mate'; }}
                />
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
