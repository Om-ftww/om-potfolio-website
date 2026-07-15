import React from 'react';
import { Github, Linkedin, Mail, FileText, ArrowRight } from 'lucide-react';
import { MinimalistHero } from './ui/minimalist-hero';

export default function Hero() {
  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Mail, href: 'mailto:connector@example.com' },
  ];

  // Smooth scroll helper
  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="w-full relative">
      <MinimalistHero
        logoText="om."
        navLinks={navLinks}
        mainText="Bridging the gap between raw data insights and state-of-the-art AI. I engineer intelligent systems, clean pipelines, and interactive business intelligence engines."
        readMoreLink="#about"
        imageSrc="/profile.png"
        imageAlt="Om Narayanrao Mate profile photography"
        overlayText={{
          part1: 'less is',
          part2: 'more.',
        }}
        socialLinks={socialLinks}
        locationText="Nagpur, Maharashtra, IN"
        className="pt-24 md:pt-28" // Give headroom so the floating site header doesn't cover elements
      />
    </section>
  );
}
