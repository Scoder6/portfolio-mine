"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Gamepad2, X, Zap, ChevronRight } from "lucide-react";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenWelcomeModal");
    if (!seen) {
      setHasSeenModal(false);
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
    setHasSeenModal(true);
  };

  const handlePlay = () => {
    localStorage.setItem("hasSeenWelcomeModal", "true");
    setHasSeenModal(true);
    setIsOpen(false);
    router.push("/play");
  };

  const handleExplore = () => {
    handleClose();
    // Smooth scroll to work experience
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  if (hasSeenModal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-3xl shadow-2xl max-w-lg w-full p-8 pointer-events-auto relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl" />
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-6"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                    First Time Here?
                  </span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  <span className="text-foreground">Bored from my</span>{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    portfolio?
                  </span>
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Wanna play a game instead? I built a whole arcade of chaos just for you. 
                  Or explore my work first — your call!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlay}
                    className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Let's Go for the Chaos</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExplore}
                    className="flex-1 px-6 py-4 bg-secondary hover:bg-secondary/80 rounded-xl font-bold text-secondary-foreground transition-colors"
                  >
                    Show Me Your Work First
                  </motion.button>
                </div>

                <p className="text-xs text-muted-foreground mt-6">
                  Don't worry, you can always come back and play from the Fun Zone at the bottom!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
