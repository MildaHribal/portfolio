import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import CursorSpotlight from "@/components/CursorSpotlight";
import dynamic from "next/dynamic";

const StatsStrip = dynamic(() => import("@/components/StatsStrip"), { ssr: true });
const CodeTerminal = dynamic(() => import("@/components/CodeTerminal"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });

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
