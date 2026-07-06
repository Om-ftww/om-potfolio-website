import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track clickable items for scaling hover effect
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], select, .clickable'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    addHoverListeners();

    // Re-run listener attachment on DOM changes (e.g. dynamic page renders)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Smooth trail effect using linear interpolation
  useEffect(() => {
    let animationFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease speed (0.15 is smooth and responsive)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (hidden) return null;

  return (
    <>
      {/* Small Pointer Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00f2fe] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 0.5 : 1})`,
        }}
      />
      {/* Outer Floating Ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: hovered ? "50px" : "26px",
          height: hovered ? "50px" : "26px",
          border: hovered
            ? "1px solid rgba(138, 43, 226, 0.8)"
            : "1px solid rgba(0, 242, 254, 0.4)",
          background: hovered
            ? "rgba(138, 43, 226, 0.1)"
            : "rgba(0, 242, 254, 0.02)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
