import Banner from '../components/Banner/TrustBanner';
import CategoriesSection from '../components/Categories/CategoriesSection';
import FeaturesSection from '../components/Features/FeaturesSection';
import ProductsSection from '../components/Products/ProductsSection';

export default function HomePage() {
  return (
    <div className="page page--home">
      <Banner />
      <CategoriesSection />
      <ProductsSection />
      <FeaturesSection />
    </div>
  );
}
