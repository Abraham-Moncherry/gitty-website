import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyGitty from "@/components/WhyGitty";
import Interactive from "@/components/Interactive";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main className="relative">
        <Navbar />
        <Hero />
        <Features />
        <WhyGitty />
        <Interactive />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
