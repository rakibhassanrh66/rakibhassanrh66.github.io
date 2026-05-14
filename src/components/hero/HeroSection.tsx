import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiShield } from 'react-icons/fi';
import ParticleBackground from '@/components/hero/ParticleBackground';
import CVDownload from '@/components/ui/CVDownload';
import SocialLinks from '@/components/ui/SocialLinks';
import { portfolioData } from '@/data/portfolio';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

const typingTexts = [
  'Cyber Security Engineer',
  'Penetration Tester',
  'Backend Developer',
  'Security Researcher',
];

function TypeWriter() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const current = typingTexts[textIndex];

  useEffect(() => {
    const speed = isDeleting ? 30 : 60;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % typingTexts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, current]);

  return (
    <span className="text-neon-cyan">
      {current.slice(0, charIndex)}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-neon-cyan ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  );
}

export default function HeroSection() {
  const { deviceType, isLowPower } = useDeviceDetect();

    return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-bg-from)] via-[var(--hero-bg-via)] to-[var(--hero-bg-to)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* 3D Particles */}
      {!isLowPower && deviceType === 'desktop' && <ParticleBackground />}

      {/* Animated orbs for mobile/tablet */}
      {isLowPower && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-neon-cyan/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-electric-purple/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </>
      )}

      {/* Content Container - Changed to flex-row on large screens */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col lg:flex-row items-center justify-between px-6 gap-12 lg:gap-20">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiShield className="h-4 w-4 text-neon-cyan" />
            <span className="text-xs font-medium tracking-wider text-neon-cyan uppercase">
              Cyber Security Portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-[Orbitron]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {portfolioData.name.split(' ').map((word, i) => (
              <span key={i}>
                {i === 1 && <span className="gradient-text">{word}</span>}
                {i !== 1 && word}
                {i === 0 && ' '}
              </span>
            ))}
          </motion.h1>

          {/* Typing effect */}
          <motion.div
            className="mb-4 text-lg sm:text-xl lg:text-2xl font-medium text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypeWriter />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mb-8 max-w-xl text-sm sm:text-base text-white/40 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {portfolioData.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mb-10 flex gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CVDownload variant="button" />
            {/* You can add a 'Hire Me' button here if you have one, otherwise leave as is */}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <SocialLinks iconSize="md" />
          </motion.div>
        </div>

        {/* Right Side: Your Profile Picture */}
        <motion.div 
          className="hidden lg:flex relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Glowing effect behind the image */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur opacity-75 animate-pulse"></div>
          
          {/* The Image */}
          <img
          src="/images/rakib.jpg"
          alt="Rakib Hassan"
          className="relative w-72 h-72 rounded-full object-cover border-2 border-white/10 shadow-2xl"
          style={{ objectPosition: "50% 18%" }}
          />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiChevronDown className="h-6 w-6 text-white/30" />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--hero-fade)] to-transparent pointer-events-none" />
    </section>
  );;
}
