export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gitty",
    url: "https://getgitty.dev",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Chrome",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A Chrome extension that gamifies your Git commits. Track commits, build streaks, earn badges, and compete on leaderboards.",
    featureList: [
      "Yearly commit tracking",
      "Daily streak system",
      "Smart commit reminders",
      "Friend and global leaderboards",
      "Badges and achievements",
    ],
    installUrl:
      "https://chromewebstore.google.com/detail/gitty/cmeekbcgghibflilahenopcglgoegagl",
    browserRequirements: "Requires Chrome, Brave, Edge, or Arc",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
