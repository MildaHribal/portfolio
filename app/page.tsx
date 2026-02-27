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
import CodeTerminal from "@/components/CodeTerminal";

import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <Header />
      <main>
        <Hero />
        <SectionReveal>
          <StatsStrip />
        </SectionReveal>
        <SectionReveal delay={80}>
          <CodeTerminal />
        </SectionReveal>
        <SectionReveal delay={100}>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <TechMarquee />
        </SectionReveal>
        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
