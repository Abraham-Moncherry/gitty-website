"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "Yearly commit tracking",
    description:
      "See every commit across all your repos in one place. Your entire year of coding, visualized in a single heatmap.",
    accent: "pink" as const,
    image: "/features/feature-tracking.png",
  },
  {
    number: "02",
    title: "Streak system",
    description:
      "Consecutive days with at least one commit. Miss a day and it resets. The simplest, most effective motivator there is.",
    accent: "teal" as const,
    image: "/features/feature-streaks.png",
  },
  {
    number: "03",
    title: "Smart reminders",
    description:
      "A gentle nudge when you haven't committed today. Set your preferred time. Never accidentally break a streak again.",
    accent: "pink" as const,
    image: "/features/feature-reminders.png",
  },
  {
    number: "04",
    title: "Leaderboards",
    description:
      "Compete with friends or climb the global rankings. See who's shipping the most code this week, month, or year.",
    accent: "teal" as const,
    image: "/features/feature-leaderboards.png",
  },
  {
    number: "05",
    title: "Badges and achievements",
    description:
      "Unlock badges for milestones — first 100-day streak, 1000 commits, weekend warrior. Collect them all.",
    accent: "pink" as const,
    image: "/features/feature-badges.png",
  },
];

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

      {/* Image placeholder */}
      <motion.div
        className={isReversed ? "lg:order-1" : ""}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative bg-chalk rounded-lg aspect-[4/3] overflow-hidden corner-marks corner-marks-bottom group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              target.parentElement!.classList.add(
                "flex",
                "items-center",
                "justify-center"
              );
              const placeholder = document.createElement("div");
              placeholder.className = "text-center px-8";
              placeholder.innerHTML = `
                <p class="font-mono text-[11px] uppercase tracking-[0.06em] text-black/20 mb-2">Image placeholder</p>
                <p class="text-black/15 text-sm">${feature.title}</p>
              `;
              target.parentElement!.appendChild(placeholder);
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

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
