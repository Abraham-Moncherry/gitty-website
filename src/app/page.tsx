import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductPreview from "@/components/ProductPreview";
import Features from "@/components/Features";
import WhyGitty from "@/components/WhyGitty";
import Interactive from "@/components/Interactive";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ProductPreview />
      <Features />
      <WhyGitty />
      <Interactive />
      <FinalCTA />
      <Footer />
    </main>
  );
}
