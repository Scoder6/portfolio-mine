"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ArcherAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'approaching' | 'running' | 'aiming' | 'firing' | 'hit'>('approaching');
  const [showDialogue, setShowDialogue] = useState(false);

  // Sound effect functions
  const playApproachSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail if audio is not supported
    }
  };

  const playHitSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silent fail if audio is not supported
    }
  };

  useEffect(() => {
    const sequence = async () => {
      // Show dialogue first
      setShowDialogue(true);
      // Play approach sound
      playApproachSound();
      await new Promise(r => setTimeout(r, 800));
      setShowDialogue(false);
      await new Promise(r => setTimeout(r, 400));
      setPhase('running');
      // Run in
      await new Promise(r => setTimeout(r, 1500));
      setPhase('aiming');
      // Aim
      await new Promise(r => setTimeout(r, 800));
      setPhase('firing');
      // Arrow flies and hits
      await new Promise(r => setTimeout(r, 600));
      setPhase('hit');
      // Play hit sound
      playHitSound();
      // Complete
      await new Promise(r => setTimeout(r, 400));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-32 scale-125"
      animate={phase === 'hit' ? {
        x: [0, -2, 2, -2, 2, 0],
        y: [0, -1, 1, -1, 1, 0]
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Target - always visible */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-red-500">
          {/* Outer ring */}
          <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Middle ring */}
          <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Inner ring */}
          <circle cx="30" cy="30" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Bullseye */}
          <motion.circle
            cx="30"
            cy="30"
            r="6"
            fill="#ef4444"
            animate={phase === 'hit' ? { scale: [1, 2.5, 1], fill: ['#ef4444', '#22c55e', '#ef4444'] } : {}}
            transition={{ duration: 0.4 }}
          />
        </svg>
      </motion.div>

      {/* Dialogue */}
      <AnimatePresence>
        {showDialogue && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-background border-2 border-primary rounded-lg px-4 py-2 shadow-lg"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-primary font-bold text-sm">Hey wait!</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-background"></div>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Running Archer */}
      <AnimatePresence mode="wait">
        {phase === 'running' && (
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 80, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Stick figure runner - larger */}
            <svg width="80" height="90" viewBox="0 0 80 90" className="text-foreground">
              {/* Head */}
              <motion.circle cx="40" cy="15" r="10" fill="currentColor" />
              {/* Body */}
              <line x1="40" y1="25" x2="40" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Running legs animation */}
              <motion.path
                d="M40 50 L25 75"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: ["M40 50 L25 75", "M40 50 L30 75 L50 75", "M40 50 L55 75"] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <motion.path
                d="M40 50 L55 75"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: ["M40 50 L55 75", "M40 50 L50 75 L30 75", "M40 50 L25 75"] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              {/* Arms with bow */}
              <motion.path
                d="M40 35 L15 45"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: ["M40 35 L15 45", "M40 35 L10 35"] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <motion.path
                d="M40 35 L55 30"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ d: ["M40 35 L55 30", "M40 35 L65 35"] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              {/* Bow */}
              <motion.path
                d="M20 20 Q5 35 20 50"
                stroke="#8b5cf6"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </motion.div>
        )}

        {/* Aiming stance */}
        {phase === 'aiming' && (
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="80" height="90" viewBox="0 0 80 90" className="text-foreground">
              {/* Head */}
              <circle cx="40" cy="15" r="10" fill="currentColor" />
              {/* Body angled towards target */}
              <line x1="40" y1="25" x2="35" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Front leg */}
              <line x1="35" y1="50" x2="25" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Back leg */}
              <line x1="35" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Drawing bow arm - extended left */}
              <line x1="40" y1="35" x2="15" y2="30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Bow holding arm */}
              <line x1="40" y1="35" x2="50" y2="25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Bow */}
              <path d="M15 15 Q0 35 15 55" stroke="#8b5cf6" strokeWidth="4" fill="none" />
              {/* Bow string pulled back */}
              <motion.line
                x1="15" y1="15" x2="15" y2="55"
                stroke="#ec4899"
                strokeWidth="2"
                initial={{ x2: 15 }}
                animate={{ x2: 30 }}
                transition={{ duration: 0.6 }}
              />
              {/* Arrow nocked - pointing left */}
              <motion.line
                x1="30" y1="35" x2="50" y2="35"
                stroke="#22c55e"
                strokeWidth="3"
                initial={{ x1: 30, x2: 50 }}
                animate={{ x1: 15, x2: 35 }}
                transition={{ duration: 0.6 }}
              />
              {/* Arrow head - pointing left */}
              <motion.polygon
                points="50,30 50,40 58,35"
                fill="#22c55e"
                initial={{ points: "50,30 50,40 58,35" }}
                animate={{ points: "15,30 15,40 8,35" }}
                transition={{ duration: 0.6 }}
              />
            </svg>
          </motion.div>
        )}

        {/* Flying Arrow - CRAZY VERSION */}
        {phase === 'firing' && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            initial={{ x: 80, opacity: 1, rotate: 0 }}
            animate={{ x: 10, opacity: 1, rotate: [-10, 10, -5, 5, 0] }}
            transition={{ 
              x: { duration: 0.3, ease: "easeIn" },
              rotate: { duration: 0.1, repeat: 10 }
            }}
          >
            <svg width="120" height="40" viewBox="0 0 120 40" className="overflow-visible">
              {/* CRAZY TRAIL EFFECTS */}
              {[...Array(5)].map((_, i) => (
                <motion.path
                  key={i}
                  d="M0 20 L100 20"
                  stroke="url(#arrowGradient)"
                  strokeWidth={8 - i * 1.5}
                  opacity={0.6 - i * 0.1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                />
              ))}
              
              {/* CRAZY GLOW EFFECT */}
              <motion.path
                d="M0 20 L100 20"
                stroke="#22c55e"
                strokeWidth="12"
                opacity={0.4}
                initial={{ pathLength: 0, filter: "blur(0px)" }}
                animate={{ pathLength: 1, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              />
              
              {/* CRAZY PARTICLES */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={i * 15}
                  cy={20}
                  r="3"
                  fill="#22c55e"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 0], 
                    opacity: [0, 1, 0],
                    y: [0, Math.sin(i) * 10, 0]
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.03,
                    repeat: 2,
                    repeatType: "reverse"
                  }}
                />
              ))}
              
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="80%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              
              {/* CRAZY ARROW - POINTING LEFT */}
              <g transform="translate(100, 20)">
                <motion.line 
                  x1="-50" y1="0" x2="0" y2="0" 
                  stroke="#22c55e" 
                  strokeWidth="6"
                  animate={{ strokeWidth: [6, 8, 6] }}
                  transition={{ duration: 0.1, repeat: 5 }}
                />
                <motion.polygon 
                  points="-50,-8 -50,8 -60,0" 
                  fill="#22c55e"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.1, repeat: 5 }}
                />
                <motion.polygon 
                  points="0,-10 0,10 15,0" 
                  fill="#dc2626"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.2, repeat: 3 }}
                />
                {/* CRAZY SPARKLES */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={-25 + i * 10}
                    cy={0}
                    r="2"
                    fill="#fbbf24"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 2, 0], 
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </g>
            </svg>
          </motion.div>
        )}

        {/* Impact flash and screen shake */}
        {phase === 'hit' && (
          <>
            <motion.div
              className="absolute left-2 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 4, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md" />
            </motion.div>
            {/* Impact particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                  x: [0, Math.cos((i * Math.PI * 2) / 8) * 40],
                  y: [0, Math.sin((i * Math.PI * 2) / 8) * 40],
                }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Title({text, className}: {text: string, className?: string}) {
    const [showAnimation, setShowAnimation] = useState(true);
    const [showIcon, setShowIcon] = useState(false);

    const handleAnimationComplete = () => {
        setShowAnimation(false);
        setShowIcon(true);
    };

    // Check if this is the Skills title (contains 🎯 or "Skills")
    const isSkillsTitle = text.includes("🎯") || text.toLowerCase().includes("skills");

    return(
        <div className={className}>
            <div className="relative inline-flex flex-col items-center">
                <div className="relative inline-flex items-center gap-4">
                    <h1 className="text-3xl font-bold group-hover:text-green-400 transition-all">
                        {text}
                    </h1>

                    {/* Skills-specific dramatic animation */}
                    {isSkillsTitle && (
                        <div className="relative w-48 h-20">
                            {showAnimation && (
                                <ArcherAnimation onComplete={handleAnimationComplete} />
                            )}
                            <AnimatePresence>
                                {showIcon && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="text-4xl"
                                    >
                                        🎯
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Non-skills titles just show icon */}
                    {!isSkillsTitle && text.includes("🎯") && (
                        <span className="text-4xl">🎯</span>
                    )}
                </div>
                
                {/* PERFECTLY ALIGNED COLORED LINES */}
                <div className="flex flex-col gap-1 mt-3">
                    <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/50"></div>
                    <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                </div>
            </div>
        </div>
    )
}