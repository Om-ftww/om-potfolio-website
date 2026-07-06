import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";

function LoadingMesh({ progress }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      // Mesh rotates faster as page load progress increases
      const speedMultiplier = 1 + progress * 0.05;
      ref.current.rotation.x += delta * 0.3 * speedMultiplier;
      ref.current.rotation.y += delta * 0.5 * speedMultiplier;
      
      // Morph scale slightly based on loading progress
      const scaleValue = 1.0 + Math.sin(state.clock.getElapsedTime() * 4) * 0.05;
      ref.current.scale.set(scaleValue, scaleValue, scaleValue);
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />
      <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.8} />
    </mesh>
  );
}

export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef();
  const loaderTextRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // Simulate loading progress
    const duration = 2.4; // 2.4 seconds loading
    const obj = { val: 0 };
    
    const anim = gsap.to(obj, {
      val: 100,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      },
      onComplete: () => {
        // Play exit animations
        const tl = gsap.timeline({
          onComplete: () => {
            if (onFinished) onFinished();
          }
        });

        tl.to(loaderTextRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        })
        .to(containerRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0,
          duration: 0.75,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    });

    return () => anim.kill();
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#030014] flex flex-col items-center justify-center select-none"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* 3D Animated Shape */}
      <div className="w-56 h-56 mb-4 relative">
        <Canvas camera={{ position: [0, 0, 2.2] }}>
          <ambientLight intensity={0.5} />
          <LoadingMesh progress={progress} />
        </Canvas>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8a2be2]/10 to-[#00f2fe]/10 blur-xl -z-10 animate-pulse" />
      </div>

      {/* Loading progress labels */}
      <div ref={loaderTextRef} className="text-center font-display w-72">
        <div className="text-xs uppercase tracking-[0.3em] text-[#00f2fe] mb-1 font-semibold">
          Om Narayanrao Mate
        </div>
        <div className="text-2xl font-bold tracking-widest text-slate-100 flex justify-between items-baseline mb-3">
          <span>SYSTEM LOAD</span>
          <span className="text-[#8a2be2] font-mono">{progress}%</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#00f2fe] to-[#8a2be2] rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-[#00f2fe] shimmer animate-pulse"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px #00f2fe" }}
          />
        </div>

        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 animate-pulse">
          Retrieving Portfolio Assets...
        </div>
      </div>
    </div>
  );
}
