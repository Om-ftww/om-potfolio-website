import React, { useState } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Internship from "./components/Internship";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 3D Loader Layer */}
      {isLoading && <Loader onFinished={() => setIsLoading(false)} />}

      {/* Main Interactive Site Canvas */}
      {!isLoading && (
        <div className="relative min-h-screen text-slate-100 font-sans selection:bg-[#8a2be2]/30 selection:text-white">
          <CustomCursor />
          <Background3D />
          <Navbar />
          
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Internship />
            <Certificates />
            <Contact />
          </main>

          {/* Simple Premium Footer */}
          <footer className="relative z-10 py-12 border-t border-white/5 bg-black/20 text-center select-none">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500 font-medium">
              <div>
                © {new Date().getFullYear()} Om Narayanrao Mate. All rights reserved.
              </div>
              <div className="flex items-center gap-1.5 font-display text-xs">
                <span>Designed with Precision</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                <span>Powered by React & 3D WebGL</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
