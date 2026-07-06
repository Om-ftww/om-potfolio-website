import React, { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].name.toLowerCase());
          break;
        }
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
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[49] w-[90%] max-w-5xl glassmorphism px-6 py-4 rounded-full flex items-center justify-between transition-all duration-300 hover:border-white/15">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-2 text-slate-100 font-display font-bold text-xl tracking-wider select-none shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8a2be2] to-[#00f2fe] flex items-center justify-center shadow-lg shadow-[#8a2be2]/30">
            <Cpu className="w-4 h-4 text-slate-900" />
          </span>
          <span>OM.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const linkNameLower = link.name.toLowerCase();
            const isActive = activeSection === linkNameLower;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 select-none ${
                  isActive
                    ? "text-[#00f2fe]"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-white/5 rounded-full border border-white/5 -z-10 shadow-[0_0_15px_rgba(255,255,255,0.02)]" />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#8a2be2]/20 to-[#00f2fe]/20 hover:from-[#8a2be2]/30 hover:to-[#00f2fe]/30 border border-white/10 hover:border-[#00f2fe]/40 text-[#00f2fe] text-xs font-semibold uppercase tracking-widest transition-all duration-300 glow-button-blue"
          >
            Hire Agent
          </a>
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all duration-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[48] bg-[#030014]/90 backdrop-blur-lg md:hidden transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, idx) => {
            const linkNameLower = link.name.toLowerCase();
            const isActive = activeSection === linkNameLower;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-2xl font-display font-medium tracking-wide transition-all duration-300 ${
                  isActive ? "text-[#00f2fe] scale-110" : "text-slate-400 hover:text-slate-100"
                }`}
                style={{
                  transitionDelay: `${idx * 50}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)"
                }}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#00f2fe] text-slate-950 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
