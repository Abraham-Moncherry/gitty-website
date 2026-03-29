"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyGitty() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-gitty" className="relative bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading + image */}
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

            {/* Image placeholder */}
            <div className="relative bg-chalk rounded-lg aspect-[4/3] overflow-hidden corner-marks corner-marks-bottom">
              <img
                src="/why-gitty.png"
                alt="Why Gitty"
                className="w-full h-full object-cover"
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
                    <p class="text-black/15 text-sm">Why Gitty</p>
                  `;
                  target.parentElement!.appendChild(placeholder);
                }}
              />
            </div>
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
                <span className="text-black/30">
                  They&apos;re the most consistent.
                </span>
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
      className="group p-8 bg-chalk rounded-lg"
    >
      <span className="font-mono text-[11px] text-pink tracking-[0.06em] mb-4 block">
        {number}
      </span>
      <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] mb-3">
        {title}
      </h3>
      <p className="text-black/40 leading-relaxed">{description}</p>
    </motion.div>
  );
}
