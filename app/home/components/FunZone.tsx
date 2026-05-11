"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Zap, ChevronRight } from "lucide-react";

const FunZone = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-yellow-500/10" />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-8"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              The Fun Zone
            </span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>

          {/* Main text */}
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Beyond Internships.</span>
            <br />
            <span className="text-foreground">Beyond Projects.</span>
            <br />
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Ready to Join the Chaos?
            </motion.span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            You have seen my work. Now test your skills in the <strong className="text-primary">Chaos Arcade</strong> — 6 games designed to push your reflexes, memory, and strategy to the limit.
          </p>

          {/* CTA Button */}
          <Link href="/play">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 rounded-2xl font-bold text-xl text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative flex items-center gap-3">
                <Gamepad2 className="w-6 h-6" />
                Enter the Chaos Zone
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          {/* Features */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              { icon: Zap, text: "6 Arcade Games" },
              { icon: Gamepad2, text: "Reflex & Strategy" },
              { icon: Gamepad2, text: "Beat the High Scores" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FunZone;
