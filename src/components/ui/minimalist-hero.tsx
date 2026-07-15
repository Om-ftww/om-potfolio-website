import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialLinkItem {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: SocialLinkItem[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground">
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className?: string }> }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-transparent p-8 font-sans md:p-12',
        className
      )}
    >

      {/* ── Main Content ────────────────────────────────────── */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">

        {/* Left – description text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font"
          >
            Read More
          </a>
        </motion.div>

        {/* Center – Portrait with popping head and floating image inside stable circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-end h-[350px] md:h-[460px] lg:h-[570px]">
          
          {/* A. Stable Yellow Circle Background */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute bottom-0 z-0 h-[280px] w-[280px] rounded-full bg-yellow-400 md:h-[360px] md:w-[360px] lg:h-[450px] lg:w-[450px] shadow-[0_20px_60px_rgba(234,179,8,0.25)]"
          />

          {/* B. Stable Ambient Glow beneath Circle */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute bottom-0 z-[-1] h-[280px] w-[280px] rounded-full bg-yellow-400/25 blur-2xl pointer-events-none md:h-[360px] md:w-[360px] lg:h-[450px] lg:w-[450px]"
          />

          {/* C. Stable Clipping Container (rounded bottom edge matching the circle, taller top to support head pop-out) */}
          <div className="absolute bottom-0 z-10 overflow-hidden w-[280px] h-[340px] rounded-b-full md:w-[360px] md:h-[430px] lg:w-[450px] lg:h-[540px] flex items-end justify-center pointer-events-none">
            
            {/* Inner Floating Wrapper: Only animates the image inside */}
            <motion.div
              animate={{
                y: [0, -16, 0],
              }}
              transition={{
                y: {
                  duration: 2.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop',
                  delay: 1.5,
                },
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* The PNG Image with entrance animation */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="absolute left-1/2 -translate-x-1/2 w-auto max-w-none object-contain select-none origin-bottom bottom-[-25px] h-[105%] md:bottom-[-35px] lg:bottom-[-45px]"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/400x600/eab308/ffffff?text=?';
                }}
              />
            </motion.div>

          </div>
        </div>

        {/* Right – big type */}
        <div className="z-20 order-3 flex items-center justify-center text-center md:justify-start">
          <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl leading-[1.05]">
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                {overlayText.part1}
              </motion.div>
            </div>
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
              >
                {overlayText.part2}
              </motion.div>
            </div>
          </h1>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
