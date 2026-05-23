import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MainLayout } from '../components/Layout/MainLayout';
import {
  HomePage,
  CatalogPage,
  ProductPage,
  CartPage,
  CheckoutPage,
  AboutPage,
  ContactPage,
  ProfilePage,
} from '../pages';
import { ROUTES } from '../constants/routes';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
          <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
