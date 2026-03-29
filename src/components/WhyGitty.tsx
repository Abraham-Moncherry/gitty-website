"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Consistency vs Inconsistency visual ─────────────────── */
function ConsistencyVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeView, setActiveView] = useState<"without" | "with">("without");

  // Auto-toggle after a delay
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActiveView("with"), 2500);
    return () => clearTimeout(t);
  }, [inView]);

  const withoutData = [3, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0];
  const withData = [4, 3, 5, 2, 6, 3, 4, 5, 7, 3, 4, 6, 5, 8, 4, 3, 5, 6, 4, 7];
  const data = activeView === "with" ? withData : withoutData;
  const maxVal = 8;

  return (
    <div ref={ref} className="p-6 md:p-8">
      {/* Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveView("without")}
          className={`font-mono text-[10px] px-3 py-1.5 rounded-md transition-colors duration-200 ${
            activeView === "without"
              ? "bg-pink/10 text-pink"
              : "text-black/25 hover:bg-black/[0.03]"
          }`}
        >
          Without Gitty
        </button>
        <button
          onClick={() => setActiveView("with")}
          className={`font-mono text-[10px] px-3 py-1.5 rounded-md transition-colors duration-200 ${
            activeView === "with"
              ? "bg-teal/10 text-teal"
              : "text-black/25 hover:bg-black/[0.03]"
          }`}
        >
          With Gitty
        </button>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-[3px] h-32 mb-4">
        {data.map((val, i) => (
          <motion.div
            key={`${activeView}-${i}`}
            initial={{ height: 0 }}
            animate={inView ? { height: `${(val / maxVal) * 100}%` } : {}}
            transition={{
              duration: 0.4,
              delay: i * 0.03,
              ease: "easeOut",
            }}
            className="flex-1 rounded-t-[2px] min-h-[2px]"
            style={{
              backgroundColor:
                val === 0
                  ? "#e7e3db"
                  : activeView === "with"
                    ? "#00d4aa"
                    : "#ff5c8a",
              opacity: val === 0 ? 0.5 : 0.7 + (val / maxVal) * 0.3,
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[9px] text-black/20">20 days ago</span>
        <span className="font-mono text-[9px] text-black/20">Today</span>
      </div>

      {/* Stats comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className={`p-3 rounded-lg transition-colors duration-300 ${
            activeView === "without" ? "bg-pink/[0.06]" : "bg-canvas/50"
          }`}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-black/25 mb-1">
            Without Gitty
          </p>
          <p className="font-display text-lg tracking-[-0.02em] text-black/40">
            12 <span className="text-[11px] text-black/20">commits</span>
          </p>
          <p className="font-mono text-[9px] text-pink">0 day streak</p>
        </div>
        <div
          className={`p-3 rounded-lg transition-colors duration-300 ${
            activeView === "with" ? "bg-teal/[0.06]" : "bg-canvas/50"
          }`}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-black/25 mb-1">
            With Gitty
          </p>
          <p className="font-display text-lg tracking-[-0.02em] text-off-black">
            92 <span className="text-[11px] text-black/20">commits</span>
          </p>
          <p className="font-mono text-[9px] text-teal">20 day streak</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyGitty() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-gitty" className="relative bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading + visual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
              Why Gitty
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] mb-6">
              Your biggest enemy isn&apos;t imposter syndrome
            </h2>
            <p className="text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.1] tracking-[-0.02em] text-black/30 mb-10">
              It&apos;s inconsistency.
            </p>

            {/* Interactive visual */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-chalk rounded-lg overflow-hidden corner-marks corner-marks-bottom hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500"
            >
              <ConsistencyVisual />
            </motion.div>
          </motion.div>

          {/* Right — content cards */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-6">
            <PointCard
              number="01"
              title="It's not about talent"
              description="Most developers don't fail because they can't code. They stall because they can't stay consistent. Weeks pass. Side projects collect dust."
              delay={0}
            />
            <PointCard
              number="02"
              title="Consistency is invisible"
              description="Without tracking, you can't see your patterns. You don't notice the slumps. You don't celebrate the wins. You need to make progress visible."
              delay={0.1}
            />
            <PointCard
              number="03"
              title="Make it a game"
              description="Streaks, badges, and leaderboards tap into the same psychology that makes games compelling. Except here, the reward is real — you ship more code."
              delay={0.2}
            />

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8"
            >
              <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.03em] leading-[1.05]">
                &ldquo;The best developers aren&apos;t the smartest.{" "}
                <motion.span
                  className="text-black/30 inline"
                  whileHover={{ color: "rgba(0,0,0,0.7)" }}
                  transition={{ duration: 0.3 }}
                >
                  They&apos;re the most consistent.
                </motion.span>
                &rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PointCard({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}
      className="group p-8 bg-chalk rounded-lg cursor-default transition-colors duration-300"
    >
      <span className="font-mono text-[11px] text-pink tracking-[0.06em] mb-4 block">
        {number}
      </span>
      <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] mb-3 group-hover:text-black/70 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-black/40 leading-relaxed">{description}</p>
    </motion.div>
  );
}
