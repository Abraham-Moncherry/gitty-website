"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Streaks", href: "#preview" },
  { label: "Leaderboards", href: "#preview" },
  { label: "Badges", href: "#preview" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abrahammoncherry/" },
  { label: "GitHub", href: "https://github.com/Abraham-Moncherry" },
  { label: "Website", href: "https://abrahamm.dev" },
];

function FooterLinkColumn({
  title,
  links,
  delay,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  delay: number;
  external?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="md:col-span-3"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/20 mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -5 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: delay + i * 0.05 }}
          >
            <a
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="relative text-sm text-white/40 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300" />
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <footer className="border-t" style={{ backgroundColor: "#1a1210", color: "#ffffff", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          {/* Logo column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="col-span-2 md:col-span-6 mb-4 md:mb-0"
          >
            <motion.a
              href="#"
              className="flex items-center gap-2.5 mb-5"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15 }}
            >
              <img
                src="/Gitty - G - logo.png"
                alt="Gitty"
                className="w-7 h-7 rounded-md"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-display text-lg tracking-[-0.04em]">
                Gitty
              </span>
            </motion.a>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The Chrome extension that turns your Git commits into a daily
              habit. Track, compete, and ship more code.
            </p>
          </motion.div>

          <FooterLinkColumn title="Product" links={productLinks} delay={0.1} />
          <FooterLinkColumn
            title="Creator"
            links={socialLinks}
            delay={0.2}
            external
          />
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="font-mono text-[11px] text-white/20">
            &copy; 2026 Gitty. Ship more code.
          </p>
          <p className="font-mono text-[11px] text-white/20">
            Made for developers who want to be consistent.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
