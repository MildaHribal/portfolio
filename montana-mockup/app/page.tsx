import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ColorWall } from '@/components/ColorWall';
import { BrandStrip } from '@/components/BrandStrip';
import { TrustStrip } from '@/components/TrustStrip';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/interactive';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Categories />
        <ColorWall />
        <BrandStrip />
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
