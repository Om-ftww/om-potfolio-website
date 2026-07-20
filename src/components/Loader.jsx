import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   LOGO MARK — animated SVG icon
   A square tile with a diagonal accent line (matches the portfolio's
   yellow-on-black identity). Strokes draw themselves in sequence,
   then the whole loader fades away.
═══════════════════════════════════════════════════════════════════ */
function LogoMark({ size = 72 }) {
  const s = size;
  const pad = s * 0.18;
  const r = s * 0.14; // corner radius

  // Points for the inner accent: top-right to bottom-left diagonal
  const ax1 = s - pad;
  const ay1 = pad;
  const ax2 = pad;
  const ay2 = s - pad;

  // Small tick mark at bottom-right corner
  const tickLen = s * 0.18;

  const stroke = { stroke: "#eab308", strokeWidth: 2.5, fill: "none", strokeLinecap: "round" };
  const strokeWhite = { stroke: "rgba(255,255,255,0.9)", strokeWidth: 2.5, fill: "none", strokeLinecap: "round" };

  const drawTransition = (delay, duration = 0.55) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} overflow="visible">
      {/* Outer rounded square — draws itself */}
      <motion.rect
        x={pad * 0.5}
        y={pad * 0.5}
        width={s - pad}
        height={s - pad}
        rx={r}
        {...strokeWhite}
        style={{ opacity: 0.15 }}
      />

      {/* Main border square in gold */}
      <motion.rect
        x={pad * 0.5}
        y={pad * 0.5}
        width={s - pad}
        height={s - pad}
        rx={r}
        {...stroke}
        {...drawTransition(0.1, 0.7)}
      />

      {/* Diagonal accent line: top-right → bottom-left */}
      <motion.line
        x1={ax1} y1={ay1} x2={ax2} y2={ay2}
        {...stroke}
        strokeOpacity={0.6}
        {...drawTransition(0.55, 0.45)}
      />

      {/* Small horizontal tick — bottom right */}
      <motion.line
        x1={s - pad - tickLen}
        y1={s - pad}
        x2={s - pad + pad * 0.3}
        y2={s - pad}
        {...stroke}
        {...drawTransition(0.75, 0.3)}
      />

      {/* Small vertical tick — top left */}
      <motion.line
        x1={pad * 0.5}
        y1={pad * 0.5}
        x2={pad * 0.5}
        y2={pad * 0.5 + tickLen}
        {...stroke}
        {...drawTransition(0.9, 0.3)}
      />

      {/* Centre dot */}
      <motion.circle
        cx={s / 2}
        cy={s / 2}
        r={3.5}
        fill="#eab308"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.35, type: "spring", stiffness: 320, damping: 18 }}
        style={{ originX: `${s / 2}px`, originY: `${s / 2}px` }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN LOADER
   Phases:
     "in"   — logo draws in                 (0 – 1.8s)
     "out"  — fades away                    (1.8 – 2.6s)
     "done" — unmounts                      (2.6s+)
═══════════════════════════════════════════════════════════════════ */
export default function Loader({ onFinished }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"),  1800);
    const t2 = setTimeout(() => setPhase("done"), 2700);
    const t3 = setTimeout(() => onFinished?.(),   2800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onFinished]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center select-none"
      style={{ zIndex: 99999, background: "#000" }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Logo mark + thin tagline below */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {/* SVG logo icon */}
        <LogoMark size={80} />

        {/* Thin golden underline that draws itself */}
        <motion.div
          className="rounded-full"
          style={{
            height: "1.5px",
            width: "48px",
            background: "linear-gradient(90deg, transparent, #eab308, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        />
      </motion.div>
    </motion.div>
  );
}
