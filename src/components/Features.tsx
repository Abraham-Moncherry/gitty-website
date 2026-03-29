"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";

/* ── Mini Heatmap ────────────────────────────────────────── */
function HeatmapVisual() {
  const [cells, setCells] = useState<number[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    setCells(Array.from({ length: 168 }, () => Math.random()));
  }, []);

  return (
    <div ref={ref} className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30">
          2026 Activity
        </p>
        <p className="font-mono text-[11px] text-pink">1,247 commits</p>
      </div>
      <div className="grid grid-cols-[repeat(24,1fr)] gap-[3px]">
        {cells.map((val, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.003, duration: 0.15 }}
            className="aspect-square rounded-[2px] cursor-default hover:scale-150 transition-transform duration-150"
            style={{
              backgroundColor:
                val > 0.75
                  ? "var(--color-pink)"
                  : val > 0.5
                    ? "var(--color-teal)"
                    : val > 0.25
                      ? "var(--color-canvas)"
                      : "var(--color-chalk)",
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          {["Jan", "Apr", "Jul", "Oct"].map((m) => (
            <span key={m} className="font-mono text-[9px] text-black/20">
              {m}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-black/20">Less</span>
          {["chalk", "canvas", "teal", "pink"].map((c, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-[1px] ${
                c === "chalk" ? "bg-chalk" : c === "canvas" ? "bg-canvas" : c === "teal" ? "bg-teal" : "bg-pink"
              }`}
            />
          ))}
          <span className="text-[9px] font-mono text-black/20">More</span>
        </div>
      </div>
    </div>
  );
}

/* ── Streak Counter ──────────────────────────────────────── */
function StreakVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = () => {
      current += 1;
      setCount(current);
      if (current < 47) requestAnimationFrame(step);
    };
    const t = setTimeout(step, 200);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref} className="p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-5">
        Current Streak
      </p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-display text-[3.5rem] md:text-[4.5rem] tracking-[-0.04em] leading-none">
          {count}
        </span>
        <span className="text-black/25 text-base">days</span>
      </div>
      <p className="font-mono text-[10px] text-black/25 mb-6">
        Best: 112 days
      </p>
      <div className="flex gap-1.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              delay: 0.4 + i * 0.06,
              type: "spring",
              stiffness: 400,
            }}
            className={`flex-1 h-9 rounded-md flex items-center justify-center font-mono text-[10px] ${
              i < 6
                ? "bg-teal/10 text-teal"
                : "bg-canvas text-black/15 border border-dashed border-black/8"
            }`}
          >
            {day}
          </motion.div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-black/25 mt-3">
        3 more days to <span className="text-teal">Week Warrior</span>
      </p>
    </div>
  );
}

/* ── Reminder Toggle ─────────────────────────────────────── */
function ReminderVisual() {
  const [enabled, setEnabled] = useState(true);
  const [time, setTime] = useState("6:00 PM");

  return (
    <div className="p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
        Daily Reminder
      </p>

      {/* Toggle row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-off-black mb-0.5">
            Commit reminder
          </p>
          <p className="font-mono text-[10px] text-black/30">
            Get nudged if you haven&apos;t pushed today
          </p>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
            enabled ? "bg-pink" : "bg-canvas"
          }`}
        >
          <motion.div
            animate={{ x: enabled ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
          />
        </button>
      </div>

      {/* Time selector */}
      <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg mb-4">
        <p className="text-sm text-black/50">Remind me at</p>
        <div className="flex gap-1.5">
          {["5:00 PM", "6:00 PM", "9:00 PM"].map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`font-mono text-[10px] px-2.5 py-1.5 rounded-md transition-colors duration-200 ${
                time === t
                  ? "bg-pink/10 text-pink"
                  : "text-black/30 hover:bg-black/[0.03]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Preview notification */}
      <motion.div
        animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
      >
        <div className="w-7 h-7 rounded-md bg-pink/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg
            className="w-3.5 h-3.5 text-pink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-off-black mb-0.5">
            Don&apos;t break your streak!
          </p>
          <p className="font-mono text-[10px] text-black/30">
            You haven&apos;t committed today. Push some code to keep your 47-day
            streak alive.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Mini Leaderboard ────────────────────────────────────── */
function LeaderboardVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const entries = [
    { rank: 1, name: "sarah_dev", commits: 2847, isUser: false },
    { rank: 2, name: "codex_mike", commits: 2651, isUser: false },
    { rank: 3, name: "you", commits: 2583, isUser: true },
    { rank: 4, name: "rust_ninja", commits: 2341, isUser: false },
    { rank: 5, name: "jess.codes", commits: 2189, isUser: false },
  ];

  return (
    <div ref={ref} className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30">
          Global Leaderboard
        </p>
        <span className="font-mono text-[9px] text-teal px-2 py-1 bg-teal/8 rounded-md">
          LIVE
        </span>
      </div>
      <div className="space-y-1">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            whileHover={{ x: 3 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-default transition-colors ${
              entry.isUser
                ? "bg-teal/[0.06]"
                : "hover:bg-black/[0.02]"
            }`}
          >
            <span
              className={`font-mono text-[10px] w-4 ${
                entry.rank <= 3 ? "text-teal" : "text-black/20"
              }`}
            >
              {entry.rank}
            </span>
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono ${
                entry.isUser
                  ? "bg-teal text-white"
                  : "bg-canvas text-black/30"
              }`}
            >
              {entry.name[0].toUpperCase()}
            </div>
            <span
              className={`font-mono text-xs flex-1 ${
                entry.isUser ? "text-teal" : "text-off-black"
              }`}
            >
              {entry.name}
            </span>
            <span className="font-mono text-[10px] text-black/25">
              {entry.commits.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Badge Collection ────────────────────────────────────── */
function BadgesVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const badges = [
    { name: "First Push", num: "01", unlocked: true },
    { name: "Week Warrior", num: "02", unlocked: true },
    { name: "Centurion", num: "03", unlocked: true },
    { name: "Night Owl", num: "04", unlocked: false },
    { name: "1K Club", num: "05", unlocked: false },
    { name: "Streak Legend", num: "06", unlocked: false },
  ];

  return (
    <div ref={ref} className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30">
          Badge Collection
        </p>
        <span className="font-mono text-[10px] text-pink">3/6 unlocked</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 300 }}
            whileHover={
              badge.unlocked ? { scale: 1.06, y: -3 } : { scale: 1.02 }
            }
            className={`relative p-3 rounded-lg text-center cursor-default transition-colors ${
              badge.unlocked
                ? "bg-pink/[0.06] hover:bg-pink/[0.1]"
                : "bg-canvas/50 opacity-40"
            }`}
          >
            <div
              className={`font-mono text-lg mb-1.5 ${
                badge.unlocked ? "text-pink" : "text-black/15"
              }`}
            >
              {badge.unlocked ? badge.num : "??"}
            </div>
            <p className="font-mono text-[9px] text-black/40 leading-tight">
              {badge.name}
            </p>
            {badge.unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-2 h-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature visual map ──────────────────────────────────── */
const featureVisuals: Record<string, ReactNode> = {
  "01": <HeatmapVisual />,
  "02": <StreakVisual />,
  "03": <ReminderVisual />,
  "04": <LeaderboardVisual />,
  "05": <BadgesVisual />,
};

/* ── Feature data ────────────────────────────────────────── */
const features = [
  {
    number: "01",
    title: "Yearly commit tracking",
    description:
      "See every commit across all your repos in one place. Your entire year of coding, visualized in a single heatmap.",
    accent: "pink" as const,
  },
  {
    number: "02",
    title: "Streak system",
    description:
      "Consecutive days with at least one commit. Miss a day and it resets. The simplest, most effective motivator there is.",
    accent: "teal" as const,
  },
  {
    number: "03",
    title: "Smart reminders",
    description:
      "A gentle nudge when you haven't committed today. Set your preferred time. Never accidentally break a streak again.",
    accent: "pink" as const,
  },
  {
    number: "04",
    title: "Leaderboards",
    description:
      "Compete with friends or climb the global rankings. See who's shipping the most code this week, month, or year.",
    accent: "teal" as const,
  },
  {
    number: "05",
    title: "Badges and achievements",
    description:
      "Unlock badges for milestones — first 100-day streak, 1000 commits, weekend warrior. Collect them all.",
    accent: "pink" as const,
  },
];

/* ── Feature Card ────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
        index > 0 ? "mt-10 md:mt-16" : ""
      }`}
    >
      {/* Text */}
      <div className={isReversed ? "lg:order-2" : ""}>
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: 24 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
          className={`block h-[2px] mb-4 ${
            feature.accent === "pink" ? "bg-pink" : "bg-teal"
          }`}
        />
        <span
          className={`font-mono text-[11px] tracking-[0.06em] mb-4 block ${
            feature.accent === "pink" ? "text-pink" : "text-teal"
          }`}
        >
          {feature.number}
        </span>
        <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] mb-4 group-hover:text-black/70 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-black/40 leading-relaxed max-w-md">
          {feature.description}
        </p>
      </div>

      {/* Visual component */}
      <motion.div
        className={isReversed ? "lg:order-1" : ""}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative bg-chalk rounded-lg overflow-hidden corner-marks corner-marks-bottom group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500">
          {featureVisuals[feature.number]}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
            Features
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] max-w-2xl">
            Everything you need to{" "}
            <span className="text-black/30">stay consistent</span>
          </h2>
        </motion.div>

        <div>
          {features.map((feature, i) => (
            <FeatureCard key={feature.number} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
