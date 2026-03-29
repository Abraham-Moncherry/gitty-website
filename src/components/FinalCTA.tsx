"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="cta" className="relative bg-off-black text-white py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/30 mb-6">
            Get started
          </p>

          <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] tracking-[-0.04em] leading-[0.92] mb-8">
            Stop thinking about coding.{" "}
            <span className="text-white/30">Start shipping.</span>
          </h2>

          <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-lg">
            Join thousands of developers who turned their commits into a daily
            habit. It takes 10 seconds to install.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-off-black rounded-md hover:bg-off-white transition-colors duration-200 text-[15px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 2.848a5.454 5.454 0 0 1 5.37-4.398c1.392 0 2.647.527 3.601 1.382l3.172-3.172A9.94 9.94 0 0 0 12 0z" />
                <path d="M1.931 7.701A11.944 11.944 0 0 0 0 12c0 1.535.29 3.003.816 4.353l4.553-3.478-.002-.02L1.931 7.7z" />
                <path d="M12 24c3.033 0 5.788-1.135 7.892-2.99l-3.726-3.05A5.964 5.964 0 0 1 12 19.5c-2.838 0-5.238-1.923-5.942-4.535L.903 18.291A11.98 11.98 0 0 0 12 24z" />
                <path d="M23.184 10H12v4.5h6.402a5.957 5.957 0 0 1-2.218 2.96l3.726 3.05C22.28 18.35 24 15.4 24 12c0-.83-.096-1.63-.265-2.4l-.551.4z" />
              </svg>
              Add to Chrome — It&apos;s free
            </motion.a>
            <p className="font-mono text-[11px] text-white/20 self-center">
              Works with Chrome, Brave, Edge, and Arc
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
