import HeroSection from '../components/Hero/HeroSection';
import Banner from '../components/Banner/TrustBanner';
import CategoriesSection from '../components/Categories/CategoriesSection';
import FeaturesSection from '../components/Features/FeaturesSection';
import ProductsSection from '../components/Products/ProductsSection';

export default function HomePage() {
  return (
    <div className="page page--home">
      <HeroSection />
      <Banner />
      <CategoriesSection />
      <ProductsSection />
      <FeaturesSection />
    </div>
  );
}
