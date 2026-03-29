import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://getgitty.dev";

export const metadata: Metadata = {
  title: "Gitty — Gamify Your Commits",
  description:
    "Track commits, build streaks, earn badges, and compete on leaderboards. Gitty is a Chrome extension that turns your Git activity into a daily habit.",
  keywords: [
    "git",
    "github",
    "commits",
    "streaks",
    "developer tools",
    "chrome extension",
    "gamification",
    "coding habits",
    "commit tracker",
    "leaderboard",
    "badges",
    "developer productivity",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gitty",
    title: "Gitty — Gamify Your Commits",
    description:
      "Track commits, build streaks, earn badges, and compete on leaderboards. The Chrome extension that makes coding consistency rewarding.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gitty — Gamify Your Commits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitty — Gamify Your Commits",
    description:
      "Track commits, build streaks, earn badges, and compete on leaderboards. The Chrome extension that makes coding consistency rewarding.",
    images: ["/og-image.png"],
  },
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
