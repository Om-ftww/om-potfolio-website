import React, { useState, useEffect } from "react";
import { Menu, X, Cpu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Manage active link State
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].name.toLowerCase());
          break;
        }
      }

      // Manage collapsed navbar background
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
        className={`fixed left-1/2 z-[49] glassmorphism rounded-full flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 w-[85%] max-w-4xl py-2.5 px-6 shadow-[0_15px_45px_rgba(0,0,0,0.3)] border-white/10"
            : "top-6 w-[90%] max-w-5xl py-4 px-6 border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-2 font-display font-bold text-xl tracking-wider select-none shrink-0"
          style={{ color: 'var(--theme-text-primary)', transition: 'color 0.4s ease' }}
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#d97706] to-[#eab308] flex items-center justify-center shadow-lg shadow-[#eab308]/20">
            <Cpu className="w-4 h-4 text-slate-900" />
          </span>
          <span className="theme-nav-logo">OM.</span>
        </a>

        {/* Desktop Menu */}
        <div 
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navLinks.map((link) => {
            const linkNameLower = link.name.toLowerCase();
            const isActive = activeSection === linkNameLower;
            const isHovered = hoveredSection === linkNameLower;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                onMouseEnter={() => setHoveredSection(linkNameLower)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 select-none ${
                  isActive
                    ? "text-[#eab308]"
                    : theme === "light"
                      ? "text-slate-700 hover:text-slate-950"
                      : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {/* Active Indicator (layoutId ensures smooth sliding) */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-full border -z-10 ${
                      theme === "light"
                        ? "bg-black/5 border-black/5 shadow-[0_0_10px_rgba(0,0,0,0.02)]"
                        : "bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.025)]"
                    }`}
                  />
                )}
                {/* Hover Indicator (layoutId for smooth hover tracking) */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="hoverNavPill"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className={`absolute inset-0 rounded-full -z-10 ${
                      theme === "light"
                        ? "bg-black/5"
                        : "bg-white/5"
                    }`}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right side: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Day / Night Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle day/night mode"
            className="relative w-14 h-7 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center p-1 cursor-pointer overflow-hidden"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                theme === "light"
                  ? "bg-[#eab308] ml-auto"
                  : "bg-slate-700 mr-auto"
              }`}
            >
              {theme === "light" ? (
                <Sun className="w-3 h-3 text-slate-900" />
              ) : (
                <Moon className="w-3 h-3 text-slate-300" />
              )}
            </motion.span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#d97706]/10 to-[#eab308]/15 hover:from-[#d97706]/20 hover:to-[#eab308]/25 border border-white/10 hover:border-[#eab308]/40 text-[#eab308] text-xs font-semibold uppercase tracking-widest transition-all duration-300 glow-button-blue"
          >
            Hire Agent
          </a>
        </div>

        {/* Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle day/night mode"
            className="p-1.5 rounded-lg theme-nav-link hover:bg-white/5 transition-all duration-200"
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-[#eab308]" />
            ) : (
              <Moon className="w-5 h-5 text-slate-400" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg theme-nav-link hover:text-slate-100 hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`fixed inset-0 z-[48] md:hidden flex flex-col items-center justify-center gap-8 ${
              theme === "light" ? "bg-white/95 text-slate-900" : "bg-black/95 text-slate-100"
            }`}
          >
            {navLinks.map((link, idx) => {
              const linkNameLower = link.name.toLowerCase();
              const isActive = activeSection === linkNameLower;
              return (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-2xl font-display font-medium tracking-wide transition-all duration-300 ${
                    isActive ? "text-[#eab308] scale-110" : "text-slate-450 hover:text-[#eab308]"
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#d97706] to-[#eab308] text-slate-950 font-bold uppercase tracking-wider text-sm shadow-lg shadow-[#eab308]/20"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
