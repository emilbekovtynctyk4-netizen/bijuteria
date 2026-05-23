import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MainLayout.css';

export function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">{children}</main>
      <Footer />
    </div>
  );
}
