import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const triggerRef = useRef(null);
  const scrollRef = useRef(null);

  const certificates = [
    {
      title: "Microsoft certified: Power BI Data Analyst Associate (PL-300)",
      org: "Microsoft",
      date: "Jan 2026",
      desc: "Demonstrated expertise in cleaning, transforming, and modeling data, building reports, and optimizing advanced DAX expressions.",
      id: "MS-PL300-OM",
      link: "#"
    },
    {
      title: "Python for Data Science Specialization",
      org: "IBM / Coursera",
      date: "Oct 2025",
      desc: "Comprehensive certification covering Pandas, NumPy, Scikit-learn, exploratory data analysis, and predictive model deployment.",
      id: "IBM-PYDS-922",
      link: "#"
    },
    {
      title: "Advanced SQL & Database Scripting",
      org: "HackerRank Gold Badge",
      date: "Aug 2025",
      desc: "Earned Gold tier verification in PostgreSQL problem-solving, covering trigger procedures, complex joins, and sub-queries optimization.",
      id: "HR-SQL-GOLD",
      link: "#"
    },
    {
      title: "LangChain & LLM Agent Orchestration",
      org: "DeepLearning.AI",
      date: "Feb 2026",
      desc: "Designed and implemented chain pipelines, cognitive decision routers, function tools, memory loops, and RAG architectures.",
      id: "DLAI-LC-AGENT",
      link: "#"
    },
    {
      title: "Data structures & Algorithms in Python",
      org: "Stanford Online / Coursera",
      date: "Jul 2025",
      desc: "Validated deep understanding of data arrays, trees, heaps, search complexity, and graph optimization algorithms.",
      id: "ST-DSA-PY",
      link: "#"
    }
  ];

  useEffect(() => {
    // Only perform the horizontal scroll effect on wider screens (desktop)
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    let scrollTween;

    const initScrollTrigger = () => {
      if (!scrollRef.current || !triggerRef.current) return;
      
      const scrollWidth = scrollRef.current.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      if (amountToScroll > 0) {
        scrollTween = gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
          }
        });
      }
    };

    if (mediaQuery.matches) {
      // Small timeout to let DOM dimensions settle
      const timeout = setTimeout(initScrollTrigger, 100);
      return () => {
        clearTimeout(timeout);
        if (scrollTween) {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        }
      };
    }

    // Handle viewport resize or orientation swaps
    const listener = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <div ref={triggerRef} id="certificates" className="relative bg-[#000000] overflow-hidden min-h-screen md:flex md:items-center">
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#eab308]/5 blur-[120px] pointer-events-none" />

      {/* Container for Desktop Horizontal Scroll OR Mobile Stacked Layout */}
      <div className="w-full py-24 md:py-0 px-6 md:px-0">
        
        {/* Header container */}
        <div className="max-w-6xl mx-auto px-0 md:px-12 mb-16 md:absolute md:top-12 md:left-0 md:right-0">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-[#eab308]" />
            <span>Professional Credentials</span>
          </h2>
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Certifications
          </h3>
          <p className="text-slate-400 mt-2 text-sm max-w-sm hidden sm:block">
            Scroll vertically to slide through verified learning courses.
          </p>
        </div>

        {/* Certificates Horizontal Rail */}
        <div 
          ref={scrollRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 md:pl-28 md:pr-12 w-full md:w-max md:flex-nowrap relative z-10"
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="w-full md:w-[420px] shrink-0 glassmorphism rounded-2xl p-6 md:p-8 border-white/5 border flex flex-col justify-between hover:border-[#eab308]/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.03)] transition-all duration-300 group cursor-default select-none"
            >
              <div>
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#eab308]/10 group-hover:border-[#eab308]/20 transition-all duration-300 text-slate-350 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-[#eab308]" />
                  </div>
                  <span className="text-xs font-mono text-[#eab308] font-semibold">{cert.org}</span>
                </div>

                {/* Info titles */}
                <h4 className="font-display font-bold text-lg text-slate-100 mb-3 group-hover:text-[#eab308] transition-all duration-200 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {cert.desc}
                </p>
              </div>

              {/* Extra details */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-4">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Date Issued</div>
                  <div className="text-sm font-semibold text-slate-300 font-display mt-0.5">{cert.date}</div>
                </div>
                
                <a
                  href={cert.link}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#eab308]/20 text-slate-300 hover:text-white border border-white/5 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  title="Verify Credential"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
