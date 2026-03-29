"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Animated Streak Counter ─────────────────────────────── */
function StreakCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const target = 47;
    const step = () => {
      current += 1;
      setCount(current);
      if (current < target) requestAnimationFrame(step);
    };
    const timeout = setTimeout(step, 300);
    return () => clearTimeout(timeout);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-chalk rounded-lg p-8 md:p-10 corner-marks corner-marks-bottom"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
        Streak Counter
      </p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-[5rem] md:text-[6rem] tracking-[-0.04em] leading-none">
          {count}
        </span>
        <span className="text-black/30 text-lg">days</span>
      </div>
      <p className="text-black/30 text-sm mb-8">
        3 more days to unlock <span className="text-teal">Week Warrior</span>
      </p>
      <div className="flex gap-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
            className={`w-10 h-10 rounded-md flex items-center justify-center font-mono text-xs ${
              i < 6
                ? "bg-pink/10 text-pink"
                : "bg-canvas text-black/20 border border-dashed border-black/10"
            }`}
          >
            {day}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Commit Heatmap Animation ────────────────────────────── */
function CommitHeatmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    setCells(Array.from({ length: 140 }, () => Math.random()));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-chalk rounded-lg p-8 md:p-10 corner-marks corner-marks-bottom"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30">
          Last 20 weeks
        </p>
        <p className="font-mono text-[11px] text-pink">342 commits</p>
      </div>
      <div className="grid grid-cols-[repeat(20,1fr)] gap-[3px]">
        {cells.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.003, duration: 0.15 }}
            className="aspect-square rounded-[2px]"
            style={{
              backgroundColor:
                val > 0.75
                  ? "#ff5c8a"
                  : val > 0.5
                    ? "#00d4aa"
                    : val > 0.2
                      ? "#e7e3db"
                      : "#f1eee9",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Daily Progress Bar ──────────────────────────────────── */
function DailyProgress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 80) {
          clearInterval(interval);
          return 80;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-chalk rounded-lg p-8 md:p-10 corner-marks corner-marks-bottom lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30">
          Daily Goal
        </p>
        <p className="font-mono text-[11px] text-black/30">
          8 / 10 commits
        </p>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-display text-[3rem] tracking-[-0.04em] leading-none text-teal">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar segments */}
      <div className="flex gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.04 }}
            className="h-8 flex-1 rounded-[2px] origin-bottom transition-colors duration-300"
            style={{
              backgroundColor:
                i < Math.round(progress / 5)
                  ? i < 14
                    ? "#00d4aa"
                    : "#ff5c8a"
                  : "#e7e3db",
            }}
          />
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] text-black/30">
        2 more commits to hit your daily target
      </p>
    </motion.div>
  );
}

/* ── Main Section ────────────────────────────────────────── */
export default function Interactive() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
            See it in action
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] max-w-2xl">
            Real-time feedback{" "}
            <span className="text-black/30">that keeps you going</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StreakCounter />
          <CommitHeatmap />
          <DailyProgress />
        </div>
      </div>
    </section>
  );
}
