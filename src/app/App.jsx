import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MainLayout } from '../components/Layout/MainLayout';
import { AuthProvider } from '../contexts/AuthContext';
import {
  HomePage,
  CatalogPage,
  ProductPage,
  CartPage,
  CheckoutPage,
  AboutPage,
  QualityPage,
  ContactPage,
  ProfilePage,
} from '../pages';
import { ROUTES } from '../constants/routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
            <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.QUALITY} element={<QualityPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
