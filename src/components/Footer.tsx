"use client";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Streaks", href: "#preview" },
  { label: "Leaderboards", href: "#preview" },
  { label: "Badges", href: "#preview" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/abraham" },
  { label: "GitHub", href: "https://github.com/abraham" },
  { label: "Website", href: "https://abraham.dev" },
];

export default function Footer() {
  return (
    <footer className="bg-off-black text-white border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-6 mb-4 md:mb-0">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <img
                src="/Gitty - G - logo.png"
                alt="Gitty"
                className="w-7 h-7 rounded-md brightness-0 invert"
              />
              <span className="font-display text-lg tracking-[-0.04em]">
                Gitty
              </span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The Chrome extension that turns your Git commits into a daily
              habit. Track, compete, and ship more code.
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/20 mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/20 mb-4">
              Creator
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/20">
            &copy; 2026 Gitty. Ship more code.
          </p>
          <p className="font-mono text-[11px] text-white/20">
            Made for developers who want to be consistent.
          </p>
        </div>
      </div>
    </footer>
  );
}
