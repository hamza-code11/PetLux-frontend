import Hero from "@/components/website/home/hero/hero";
import ShopByPet from "@/components/website/home/categories/shop-by-pet";
import ShopByCategory from "@/components/website/home/categories/shop-by-category";
import Banner from "@/components/website/home/banner/banner";
import CustomBeds from "@/components/website/home/feature/pet-toys";
import AsymmetricBanner from "@/components/website/home/feature/asymmetric-banner";
import Newsletter from "@/components/website/home/newsletter/newsletter";
import Why from "@/components/website/home/why-choose-us";

export default function Home() {
  return (
    <main>
      <Hero />
      <ShopByPet />

      <CustomBeds />
      <ShopByCategory />
      <Banner />
      <AsymmetricBanner />
      <Why />
      <Newsletter />
    </main>
  );
}

