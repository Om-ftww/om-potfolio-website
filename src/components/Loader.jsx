import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
   ─────────────────────────────────────────────────────────────── */
const SHUTTER_COUNT = 9;          // number of horizontal panels
const NAME_CHARS = "OM MATE".split("");
const TITLE_CHARS = "DATA ANALYST".split("");

/* ease curves */
const SLAM   = [0.76, 0, 0.24, 1];
const SPRING = { type: "spring", stiffness: 340, damping: 28 };

/* ─────────────────────────────────────────────────────────────────
   GLITCH TEXT – random character scramble on mount
   ─────────────────────────────────────────────────────────────── */
const GLITCH_CHARS = "!@#$%&0123456789ABCXYZ";
function GlitchText({ text, delay = 0, className = "" }) {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, "_"));
  const [done, setDone]       = useState(false);

  useEffect(() => {
    let frame = 0;
    const total = 22;
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        frame++;
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              const revealAt = Math.floor((i / text.length) * total * 0.75);
              if (frame > revealAt + Math.random() * 4) return ch;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );
        if (frame >= total) {
          clearInterval(id);
          setDisplay(text);
          setDone(true);
        }
      }, 55);
      return () => clearInterval(id);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className} data-done={done}>
      {display}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COUNTER – ticks from 0 → 100
   ─────────────────────────────────────────────────────────────── */
function Counter({ duration = 2200, delay = 400, onComplete }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now() + delay;
    function tick(now) {
      if (now < start) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min((now - start) / duration, 1);
      // ease-out expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else if (onComplete) onComplete();
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, delay, onComplete]);
  return (
    <span className="font-mono tabular-nums">
      {String(val).padStart(3, "0")}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SINGLE SHUTTER PANEL
   ─────────────────────────────────────────────────────────────── */
function Shutter({ index, total, phase }) {
  const pct      = ((index + 1) / total) * 100;
  const fromLeft = index % 2 === 0;
  const panelH   = 100 / total;

  /* Unique explosion direction per panel */
  const angle = (index / (total - 1)) * 280 - 140; // spread from -140° to +140°
  const dist  = 100 + index * 14;
  const dx    = Math.cos((angle * Math.PI) / 180) * dist;
  const dy    = Math.sin((angle * Math.PI) / 180) * dist;

  const isReveal = phase === "reveal";

  return (
    <motion.div
      className="absolute left-0 right-0 overflow-hidden"
      style={{
        top:    `${index * panelH}%`,
        height: `${panelH + 0.15}%`,   /* tiny overlap to kill 1px gaps */
        background: `linear-gradient(
          105deg,
          #080808 ${pct - 8}%,
          #1c1400 ${pct - 2}%,
          #080808 ${pct + 4}%
        )`,
        zIndex: 10,
        transformOrigin: fromLeft ? "left center" : "right center",
        willChange: "transform, opacity",
      }}
      initial={{ x: fromLeft ? "-105%" : "105%", skewX: fromLeft ? -5 : 5 }}
      animate={
        isReveal
          ? {
              x:      `${dx}vw`,
              y:      `${dy}vh`,
              skewX:  fromLeft ? 15 : -15,
              opacity: 0,
              scale:   0.55,
            }
          : { x: "0%", skewX: 0, y: 0, opacity: 1, scale: 1 }
      }
      transition={
        isReveal
          ? {
              duration: 0.6,
              delay:    0.025 * index,
              ease:     [0.55, 0, 1, 0.45],
            }
          : {
              duration: 0.52,
              delay:    0.045 * index,
              ease:     SLAM,
            }
      }
    >
      {/* Bright edge line on each panel */}
      <div
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(234,179,8,0.35), transparent)",
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCAN LINE – sweeps top→bottom while counting
   ─────────────────────────────────────────────────────────────── */
function ScanLine({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #eab308, #fff, #eab308, transparent)",
            boxShadow: "0 0 18px 4px rgba(234,179,8,0.6)",
            zIndex: 50,
          }}
          initial={{ top: "0%", opacity: 1 }}
          animate={{ top: "100%", opacity: [1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "linear", delay: 0.45 }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PARTICLE BURST – radiates outward on reveal
   ─────────────────────────────────────────────────────────────── */
function Particle({ angle, delay }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 120 + Math.random() * 80;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width:  Math.random() * 5 + 2,
        height: Math.random() * 5 + 2,
        background: Math.random() > 0.5 ? "#eab308" : "#fff",
        top: "50%",
        left: "50%",
        boxShadow: "0 0 6px rgba(234,179,8,0.8)",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.8 + Math.random() * 0.5, delay, ease: "easeOut" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN LOADER
   Phases:
     "slam"    – shutters crash in                  (0 → 0.6s)
     "count"   – counter, glitch text, scan line    (0.6 → 2.8s)
     "reveal"  – shutters explode out               (2.8 → 3.5s)
     "done"    – unmount                            (3.5s+)
   ─────────────────────────────────────────────────────────────── */
export default function Loader({ onFinished }) {
  const [phase,     setPhase]     = useState("slam");
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("count"),  600);
    const t2 = setTimeout(() => {
      setPhase("reveal");
      // Generate burst particles
      setParticles(
        Array.from({ length: 40 }, (_, i) => ({
          id: i,
          angle: (i / 40) * 360 + Math.random() * 9,
          delay: Math.random() * 0.25,
        }))
      );
    }, 2900);
    const t3 = setTimeout(() => setPhase("done"),  3650);
    const t4 = setTimeout(() => { onFinished?.(); }, 3750);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onFinished]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 select-none overflow-hidden"
      style={{ zIndex: 99999 }}
    >
      {/* ── SHUTTERS ── */}
      {Array.from({ length: SHUTTER_COUNT }).map((_, i) => (
        <Shutter
          key={i}
          index={i}
          total={SHUTTER_COUNT}
          phase={phase}
        />
      ))}

      {/* ── SCAN LINE ── */}
      <ScanLine active={phase === "count"} />

      {/* ── CENTRE CONTENT (sits above shutters) ── */}
      <AnimatePresence>
        {(phase === "count" || phase === "reveal") && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 60 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "reveal" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Top label ── */}
            <motion.div
              className="font-display text-[10px] uppercase tracking-[0.5em] text-[#eab308] mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              Portfolio · 2025
            </motion.div>

            {/* ── Counter ── */}
            <motion.div
              className="font-display font-black text-[9vw] leading-none text-white mb-2 tracking-tighter"
              style={{ textShadow: "0 0 60px rgba(234,179,8,0.4)" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, ...SPRING }}
            >
              <Counter duration={2000} delay={200} />
              <span className="text-[#eab308]">%</span>
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              className="w-40 h-[1px] mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #eab308, transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: SLAM }}
            />

            {/* ── Name (glitch) ── */}
            <motion.div
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-[0.15em] text-white mb-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: SLAM }}
            >
              <GlitchText text="OM MATE" delay={0.3} />
            </motion.div>

            {/* ── Title (glitch) ── */}
            <motion.div
              className="font-display font-bold text-sm md:text-base uppercase tracking-[0.6em] text-[#eab308] mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <GlitchText text="DATA ANALYST" delay={0.5} />
            </motion.div>

            {/* ── Progress bar ── */}
            <motion.div
              className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #d97706, #eab308, #fff, #eab308, #d97706)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: "0%", backgroundPosition: "100% 0" }}
                animate={{
                  width: "100%",
                  backgroundPosition: "0% 0",
                }}
                transition={{ delay: 0.4, duration: 2.0, ease: "easeInOut" }}
              />
              {/* Glow shimmer */}
              <motion.div
                className="absolute inset-y-0 w-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                }}
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{
                  delay: 0.4,
                  duration: 2.0,
                  ease: "easeInOut",
                  repeat: 0,
                }}
              />
            </motion.div>

            {/* ── Status text ── */}
            <motion.div
              className="mt-4 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.6, duration: 2.0, times: [0, 0.1, 0.8, 1] }}
            >
              Initializing Portfolio Assets…
            </motion.div>

            {/* ── Corner ornaments ── */}
            {["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"].map(
              (pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-8 h-8 pointer-events-none`}
                  style={{
                    borderTop:    i < 2 ? "1px solid rgba(234,179,8,0.5)" : "none",
                    borderBottom: i >= 2 ? "1px solid rgba(234,179,8,0.5)" : "none",
                    borderLeft:   i % 2 === 0 ? "1px solid rgba(234,179,8,0.5)" : "none",
                    borderRight:  i % 2 !== 0 ? "1px solid rgba(234,179,8,0.5)" : "none",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PARTICLE BURST on reveal ── */}
      {phase === "reveal" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 70 }}
        >
          {particles.map((p) => (
            <Particle key={p.id} angle={p.angle} delay={p.delay} />
          ))}
        </div>
      )}

      {/* ── FINAL FLASH on reveal ── */}
      {phase === "reveal" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 80,
            background: "radial-gradient(circle at center, rgba(234,179,8,0.25) 0%, transparent 70%)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
