import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/StatsStrip";
import CursorSpotlight from "@/components/CursorSpotlight";

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <Projects />
        <TechMarquee />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
