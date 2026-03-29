"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CommitGrid() {
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    setCells(Array.from({ length: 364 }, () => Math.random()));
  }, []);

  if (cells.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(52,1fr)] gap-[3px]">
      {cells.map((val, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.001, duration: 0.2 }}
          className="aspect-square rounded-[2px]"
          style={{
            backgroundColor:
              val > 0.75
                ? "#ff5c8a"
                : val > 0.5
                  ? "#00d4aa"
                  : val > 0.25
                    ? "#e7e3db"
                    : "#f1eee9",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white pt-32 pb-20 md:pt-44 md:pb-28 lg:pt-52 lg:pb-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-black/30 mb-6"
        >
          Chrome Extension for Developers
        </motion.p>

        {/* Headline — tight tracking, light weight, large */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.04em] max-w-4xl mb-8"
        >
          Turn your commits
          <br />
          into a{" "}
          <span className="text-pink">daily habit</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-black/50 max-w-lg leading-relaxed mb-12"
        >
          Gitty tracks your commits, builds streaks, and lets you compete with
          friends. Consistency has never felt this good.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4 mb-20 md:mb-28"
        >
          <a
            href="#cta"
            className="px-7 py-3 bg-off-black text-white text-[15px] rounded-md hover:bg-charcoal transition-colors duration-200"
          >
            Add to Chrome
          </a>
        </motion.div>

        {/* Commit grid card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative bg-chalk rounded-lg p-6 md:p-10 corner-marks corner-marks-bottom"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-1.5">
                Your 2026
              </p>
              <p className="font-display text-2xl md:text-3xl tracking-[-0.03em]">
                1,247 <span className="text-black/30 text-lg">commits</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-1">
                  Streak
                </p>
                <p className="font-display text-xl tracking-[-0.02em] text-pink">
                  47 days
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-1">
                  Rank
                </p>
                <p className="font-display text-xl tracking-[-0.02em] text-teal">
                  #3
                </p>
              </div>
            </div>
          </div>
          <CommitGrid />
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-[10px] font-mono text-black/30">Less</span>
            {["#f1eee9", "#e7e3db", "#00d4aa", "#ff5c8a"].map((color, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-[10px] font-mono text-black/30">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
