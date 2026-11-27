import Hero from "@/components/website/home/hero/hero";
import ShopByPet from "@/components/website/home/categories/shop-by-pet";
import ShopByCategory from "@/components/website/home/categories/shop-by-category";
import Banner from "@/components/website/home/banner/banner";
import CustomBeds from "@/components/website/home/feature/pet-toys";
import AsymmetricBanner from "@/components/website/home/feature/asymmetric-banner";
import Newsletter from "@/components/website/home/newsletter/newsletter";
import Why from "@/components/website/home/why-choose-us";
import LazySection from "@/components/commen/lazy-section";

export default function Home() {
  return (
    // layout.tsx me pehle se <main> hai, is liye yahan <div> (nested main galat hota hai)
    <div>
      {/* Hero foran load hoga */}
      <Hero />

      {/* Baaki sab scroll ke qareeb aane par load honge */}
      <LazySection minHeight={500}>
        <ShopByPet />
      </LazySection>

      <LazySection minHeight={600}>
        <CustomBeds />
      </LazySection>

      <LazySection minHeight={600}>
        <ShopByCategory />
      </LazySection>

      <LazySection minHeight={400}>
        <Banner />
      </LazySection>

      <LazySection minHeight={500}>
        <AsymmetricBanner />
      </LazySection>

      <LazySection minHeight={400}>
        <Why />
      </LazySection>

      <LazySection minHeight={300}>
        <Newsletter />
      </LazySection>
    </div>
  );
}
