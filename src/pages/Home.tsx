import About from "../components/About";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import MoreWork from "../components/MoreWork";
import ProductValue from "../components/ProductValue";
import Services from "../components/Services";
import TrustedBy from "../components/TrustedBy";
import Work from "../components/Work";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <TrustedBy />
      <ProductValue />
      <Work />
      <Services />
      <About />
      <MoreWork preview />
      <FAQ preview />
      <CTA />
    </main>
  );
}
