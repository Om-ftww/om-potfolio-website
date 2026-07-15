import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Internship from "./components/Internship";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedSection({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {/* 3D Loader Layer */}
      {isLoading && <Loader onFinished={() => setIsLoading(false)} />}

      {/* Main Interactive Site Canvas */}
      {!isLoading && (
        <div
          className="relative min-h-screen font-sans"
          style={{ color: "var(--theme-text-primary)", transition: "color 0.4s ease" }}
        >
          <CustomCursor />
          <Navbar />

          <main className="relative z-10 w-full">
            {/* Hero has its own entrance animations — no wrapper needed */}
            <Hero />

            <AnimatedSection><About /></AnimatedSection>
            <AnimatedSection><Skills /></AnimatedSection>
            <AnimatedSection><Projects /></AnimatedSection>
            <AnimatedSection><Internship /></AnimatedSection>
            <AnimatedSection><Certificates /></AnimatedSection>
            <AnimatedSection><Contact /></AnimatedSection>
          </main>

          {/* Simple Premium Footer */}
          <footer
            className="relative z-10 py-12 border-t border-white/5 bg-black/20 text-center select-none"
            style={{ borderColor: "var(--theme-footer-border)" }}
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm font-medium" style={{ color: "var(--theme-text-muted)" }}>
              <div>
                © {new Date().getFullYear()} Om Narayanrao Mate. All rights reserved.
              </div>
              <div className="flex items-center gap-1.5 font-display text-xs">
                <span>Designed with Precision</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                <span>Powered by React &amp; Framer Motion</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </ThemeProvider>
  );
}
