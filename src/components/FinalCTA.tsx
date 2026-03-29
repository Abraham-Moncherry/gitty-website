"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

function FloatingShape({
  className,
  delay,
}: {
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full rounded-lg border border-white/[0.06]"
      />
    </motion.div>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], [-15, 15]);
  const bgY = useTransform(springY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative bg-off-black text-white py-24 md:py-36 overflow-hidden"
    >
      {/* Floating shapes that follow cursor subtly */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <FloatingShape className="top-[15%] left-[10%] w-24 h-24" delay={0} />
        <FloatingShape className="top-[60%] right-[8%] w-32 h-20" delay={0.3} />
        <FloatingShape className="bottom-[20%] left-[35%] w-16 h-16" delay={0.6} />
        <FloatingShape className="top-[25%] right-[30%] w-20 h-12" delay={0.9} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/30 mb-6"
          >
            Get started
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[clamp(2.2rem,5vw,4.5rem)] tracking-[-0.04em] leading-[0.92] mb-8"
          >
            Stop thinking about coding.{" "}
            <span className="text-white/30">Start shipping.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-lg leading-relaxed mb-12 max-w-lg"
          >
            Join thousands of developers who turned their commits into a daily
            habit. It takes 10 seconds to install.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-off-black rounded-md hover:bg-off-white transition-colors duration-200 text-[15px]"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
