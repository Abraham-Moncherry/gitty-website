"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const tabs = [
  {
    id: "streaks",
    label: "Streaks",
    title: "Build daily commit streaks",
    description:
      "Your streak tracks consecutive days with at least one commit. Miss a day and it resets. Simple, motivating, effective.",
    content: {
      streak: 47,
      best: 112,
      week: ["M", "T", "W", "T", "F", "S", "S"],
      active: [true, true, true, true, true, true, false],
    },
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    title: "Compete with friends and globally",
    description:
      "See who's shipping the most code this week. Add friends, climb ranks, and stay motivated through friendly competition.",
    content: {
      entries: [
        { rank: 1, name: "sarah_dev", commits: 2847, isUser: false },
        { rank: 2, name: "codex_mike", commits: 2651, isUser: false },
        { rank: 3, name: "you", commits: 2583, isUser: true },
        { rank: 4, name: "rust_ninja", commits: 2341, isUser: false },
        { rank: 5, name: "jess.codes", commits: 2189, isUser: false },
      ],
    },
  },
  {
    id: "badges",
    label: "Badges",
    title: "Unlock achievements as you go",
    description:
      "Hit milestones, earn badges. From your first commit to a 365-day streak — every achievement is tracked and displayed.",
    content: {
      badges: [
        { name: "First Push", icon: "01", unlocked: true },
        { name: "Week Warrior", icon: "02", unlocked: true },
        { name: "Centurion", icon: "03", unlocked: true },
        { name: "Night Owl", icon: "04", unlocked: false },
        { name: "1K Club", icon: "05", unlocked: false },
        { name: "Streak Legend", icon: "06", unlocked: false },
      ],
    },
  },
];

function StreakContent({ content }: { content: (typeof tabs)[0]["content"] }) {
  const data = content as {
    streak: number;
    best: number;
    week: string[];
    active: boolean[];
  };
  return (
    <div className="p-8 md:p-12">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-display text-[4rem] md:text-[5rem] tracking-[-0.04em] leading-none">
          {data.streak}
        </span>
        <span className="text-black/30 text-lg">days</span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/30 mb-8">
        Current streak &middot; Best: {data.best} days
      </p>
      <div className="flex gap-2">
        {data.week.map((day, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-md flex items-center justify-center font-mono text-xs transition-colors ${
              data.active[i]
                ? "bg-pink/10 text-pink"
                : "bg-canvas text-black/20"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardContent({
  content,
}: {
  content: (typeof tabs)[1]["content"];
}) {
  const data = content as {
    entries: { rank: number; name: string; commits: number; isUser: boolean }[];
  };
  return (
    <div className="p-8 md:p-12">
      <div className="space-y-1">
        {data.entries.map((entry) => (
          <div
            key={entry.name}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              entry.isUser ? "bg-teal/[0.06]" : "hover:bg-black/[0.02]"
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
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgesContent({ content }: { content: (typeof tabs)[2]["content"] }) {
  const data = content as {
    badges: { name: string; icon: string; unlocked: boolean }[];
  };
  return (
    <div className="p-8 md:p-12">
      <div className="grid grid-cols-3 gap-3">
        {data.badges.map((badge) => (
          <div
            key={badge.name}
            className={`p-4 rounded-lg text-center transition-all ${
              badge.unlocked
                ? "bg-pink/[0.06] hover:bg-pink/[0.1]"
                : "bg-canvas/60 opacity-40"
            }`}
          >
            <div
              className={`font-mono text-xl mb-2 ${badge.unlocked ? "text-pink" : "text-black/20"}`}
            >
              {badge.icon}
            </div>
            <p className="font-mono text-[10px] text-black/50">{badge.name}</p>
          </div>
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={`group flex items-center justify-between w-full text-left px-5 py-4 rounded-lg transition-colors duration-200 ${
                    activeTab === i
                      ? "bg-chalk"
                      : "hover:bg-chalk/50"
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
                </button>
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
            <div className="bg-chalk rounded-lg corner-marks corner-marks-bottom min-h-[400px] flex items-center">
              <div className="w-full">
                {activeTab === 0 && (
                  <StreakContent content={tabs[0].content} />
                )}
                {activeTab === 1 && (
                  <LeaderboardContent content={tabs[1].content} />
                )}
                {activeTab === 2 && (
                  <BadgesContent content={tabs[2].content} />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
