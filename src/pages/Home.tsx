import CTA from "../components/CTA";
import Hero from "../components/Hero";
import MoreWork from "../components/MoreWork";
import ProductValue from "../components/ProductValue";
import Services from "../components/Services";
import Work from "../components/Work";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Work />
      <ProductValue />
      <MoreWork preview />
      <Services />
      <CTA />
    </main>
  );
}
