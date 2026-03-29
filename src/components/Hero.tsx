"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function useAnimatedNumber(target: number, inView: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = setInterval(() => {
      start++;
      setValue(Math.min(target, Math.round(increment * start)));
      if (start >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target, duration]);
  return value;
}

function CommitGrid() {
  const [cells, setCells] = useState<number[]>([]);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

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
          onMouseEnter={() => setHoveredCell(i)}
          onMouseLeave={() => setHoveredCell(null)}
          className="aspect-square rounded-[2px] cursor-default transition-transform duration-150"
          style={{
            backgroundColor:
              hoveredCell === i
                ? "var(--color-pink)"
                : val > 0.75
                  ? "var(--color-pink)"
                  : val > 0.5
                    ? "var(--color-teal)"
                    : val > 0.25
                      ? "var(--color-canvas)"
                      : "var(--color-chalk)",
            transform: hoveredCell === i ? "scale(1.8)" : "scale(1)",
            zIndex: hoveredCell === i ? 10 : 0,
            position: "relative",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const cardX = useTransform(springX, [-1, 1], [8, -8]);
  const cardY = useTransform(springY, [-1, 1], [6, -6]);
  const labelX = useTransform(springX, [-1, 1], [-4, 4]);
  const labelY = useTransform(springY, [-1, 1], [-3, 3]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const commits = useAnimatedNumber(1247, inView);
  const streak = useAnimatedNumber(47, inView, 1500);

  return (
    <section
      ref={containerRef}
      className="relative bg-white pt-32 pb-20 md:pt-44 md:pb-28 lg:pt-52 lg:pb-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Label — subtle float */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ x: labelX, y: labelY }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-black/30 mb-6"
        >
          Chrome Extension for Developers
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.04em] max-w-4xl mb-8"
        >
          Turn your commits
          <br />
          into a{" "}
          <motion.span
            className="text-pink inline-block"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            daily habit
          </motion.span>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4 mb-20 md:mb-28"
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="px-7 py-3 bg-off-black text-white text-[15px] rounded-md hover:bg-charcoal transition-colors duration-200"
          >
            Add to Chrome
          </motion.a>
        </motion.div>

        {/* Commit grid card — parallax on mouse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ x: cardX, y: cardY }}
          className="relative bg-chalk rounded-lg p-6 md:p-10 corner-marks corner-marks-bottom"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-1.5">
                Your 2026
              </p>
              <p className="font-display text-2xl md:text-3xl tracking-[-0.03em]">
                {commits.toLocaleString()}{" "}
                <span className="text-black/30 text-lg">commits</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-1">
                  Streak
                </p>
                <p className="font-display text-xl tracking-[-0.02em] text-pink">
                  {streak} days
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
            {["chalk", "canvas", "teal", "pink"].map((c, i) => (
              <div
                key={i}
                className={`w-[10px] h-[10px] rounded-[2px] ${
                  c === "chalk" ? "bg-chalk" : c === "canvas" ? "bg-canvas" : c === "teal" ? "bg-teal" : "bg-pink"
                }`}
              />
            ))}
            <span className="text-[10px] font-mono text-black/30">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
