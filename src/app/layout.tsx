import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gitty — Gamify Your Commits",
  description:
    "Track commits, build streaks, earn badges, and compete on leaderboards. Gitty turns your Git activity into a daily habit.",
  keywords: [
    "git",
    "commits",
    "streaks",
    "developer tools",
    "chrome extension",
    "gamification",
  ],
  icons: {
    icon: "/Gitty - G - logo.png",
    apple: "/Gitty - G - logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
