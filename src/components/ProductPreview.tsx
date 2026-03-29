"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const tabs = [
  {
    id: "streaks",
    label: "Streaks",
    title: "Build daily commit streaks",
    description:
      "Your streak tracks consecutive days with at least one commit. Miss a day and it resets. Simple, motivating, effective.",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    title: "Compete with friends and globally",
    description:
      "See who's shipping the most code this week. Add friends, climb ranks, and stay motivated through friendly competition.",
  },
  {
    id: "badges",
    label: "Badges",
    title: "Unlock achievements as you go",
    description:
      "Hit milestones, earn badges. From your first commit to a 365-day streak — every achievement is tracked and displayed.",
  },
];

const contentVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function StreakContent() {
  return (
    <div className="p-8 md:p-12">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-display text-[4rem] md:text-[5rem] tracking-[-0.04em] leading-none">
          47
        </span>
        <span className="text-black/30 text-lg">days</span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-8">
        Current streak &middot; Best: 112 days
      </p>
      <div className="flex gap-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 400 }}
            whileHover={{ scale: 1.15, y: -2 }}
            className={`w-10 h-10 rounded-md flex items-center justify-center font-mono text-xs cursor-default transition-colors ${
              i < 6
                ? "bg-pink/10 text-pink"
                : "bg-canvas text-black/20 border border-dashed border-black/10"
            }`}
          >
            {day}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardContent() {
  const entries = [
    { rank: 1, name: "sarah_dev", commits: 2847, isUser: false },
    { rank: 2, name: "codex_mike", commits: 2651, isUser: false },
    { rank: 3, name: "you", commits: 2583, isUser: true },
    { rank: 4, name: "rust_ninja", commits: 2341, isUser: false },
    { rank: 5, name: "jess.codes", commits: 2189, isUser: false },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="space-y-1">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.02)" }}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors cursor-default ${
              entry.isUser ? "bg-teal/[0.06]" : ""
            }`}
          >
            <span
              className={`font-mono text-xs w-5 ${entry.rank <= 3 ? "text-teal" : "text-black/20"}`}
            >
              {entry.rank}
            </span>
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono ${
                entry.isUser
                  ? "bg-teal text-white"
                  : "bg-canvas text-black/40"
              }`}
            >
              {entry.name[0].toUpperCase()}
            </div>
            <span
              className={`font-mono text-sm flex-1 ${entry.isUser ? "text-teal" : "text-off-black"}`}
            >
              {entry.name}
            </span>
            <span className="font-mono text-xs text-black/30">
              {entry.commits.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BadgesContent() {
  const badges = [
    { name: "First Push", icon: "01", unlocked: true },
    { name: "Week Warrior", icon: "02", unlocked: true },
    { name: "Centurion", icon: "03", unlocked: true },
    { name: "Night Owl", icon: "04", unlocked: false },
    { name: "1K Club", icon: "05", unlocked: false },
    { name: "Streak Legend", icon: "06", unlocked: false },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
            whileHover={
              badge.unlocked
                ? { scale: 1.08, y: -4 }
                : { scale: 1.02 }
            }
            className={`p-4 rounded-lg text-center cursor-default transition-colors ${
              badge.unlocked
                ? "bg-pink/[0.06] hover:bg-pink/[0.12]"
                : "bg-canvas/60 opacity-40"
            }`}
          >
            <div
              className={`font-mono text-xl mb-2 ${badge.unlocked ? "text-pink" : "text-black/20"}`}
            >
              {badge.icon}
            </div>
            <p className="font-mono text-[10px] text-black/50">{badge.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProductPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="preview" className="relative bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Text side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:py-12"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-6">
              Product Preview
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] mb-6">
              Everything you need,{" "}
              <span className="text-black/30">right in your browser</span>
            </h2>
            <p className="text-black/50 leading-relaxed mb-10 max-w-md">
              Gitty lives in your Chrome toolbar. One click to see your stats,
              streaks, rank, and badges — no extra tabs, no context switching.
            </p>

            {/* Tabs */}
            <div className="flex flex-col gap-1">
              {tabs.map((tab, i) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ x: activeTab === i ? 0 : 3 }}
                  transition={{ duration: 0.15 }}
                  className={`group flex items-center justify-between w-full text-left px-5 py-4 rounded-lg transition-colors duration-200 ${
                    activeTab === i ? "bg-chalk" : "hover:bg-chalk/50"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-medium mb-0.5 transition-colors ${
                        activeTab === i ? "text-off-black" : "text-black/40"
                      }`}
                    >
                      {tab.title}
                    </p>
                    <p className="text-xs text-black/30 leading-relaxed max-w-xs">
                      {tab.description}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-xs transition-colors ${
                      activeTab === i ? "text-pink" : "text-black/15"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Card side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-chalk rounded-lg corner-marks corner-marks-bottom min-h-[400px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full"
                >
                  {activeTab === 0 && <StreakContent />}
                  {activeTab === 1 && <LeaderboardContent />}
                  {activeTab === 2 && <BadgesContent />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
