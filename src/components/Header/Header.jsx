  // ===================================================
// LUMÉRA JEWELRY — Main Header Component
// src/components/Header/Header.jsx
// ===================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from 'lib/cn';
import { config } from 'config';
import { ROUTES, NAV_LINKS } from 'constants';
import TopBar from './TopBar';
import MobileMenu from './MobileMenu';
import SearchBox from './SearchBox';
import styles from './Header.module.css';

// ---- SVG Icons ----
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
); 

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock cart count (заменить на реальный хук)
  const cartCount = 2;
  const wishlistCount = 5;

  // ---- Scroll Effect ----
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- Close mobile menu on route change ----
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // ---- Prevent body scroll when mobile menu is open ----
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const isActivePage = (path) => {
    if (path === ROUTES.HOME) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Верхняя информационная панель */}
      <TopBar />

      {/* Основная шапка */}
      <header className={cn(
        styles.header,
        isScrolled && styles['header--scrolled']
      )}>
        <div className={cn('container', styles.header__container)}>
          
          {/* Мобильное бургер-меню кнопка */}
          <button
            className={styles.header__burger}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Логотип */}
          <Link
            to={ROUTES.HOME}
            className={styles.header__logo}
            aria-label={`${config.appName} — на главную`}
          >
            <span className={styles.header__logoText}>LUMÉRA</span>
            <span className={styles.header__logoSub}>JEWELRY</span>
          </Link>

          {/* Десктопная навигация */}
          <nav className={styles.header__nav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  styles.header__navLink,
                  isActivePage(link.path) && styles['header__navLink--active']
                )}  
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Поиск (десктоп) */}
          <div className={styles.header__search}>
            <SearchBox />
          </div>

          {/* Действия (иконки справа) */}
          <div className={styles.header__actions}>
            {/* Мобильный поиск */}
            <button
              className={cn(
                styles.header__actionBtn,
                styles['header__actionBtn--mobile']
              )}
              onClick={toggleSearch}
              aria-label="Поиск"
            >
              <SearchIcon />
            </button>

            {/* Избранное */}
            <Link
              to={ROUTES.WISHLIST}
              className={styles.header__actionBtn}
              aria-label="Избранное"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className={styles.header__badge}>
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Профиль */}
            <Link
              to={ROUTES.PROFILE}
              className={styles.header__actionBtn}
              aria-label="Личный кабинет"
            >
              <UserIcon />
            </Link>

            {/* Корзина */}
            <Link
              to={ROUTES.CART}
              className={cn(
                styles.header__actionBtn,
                styles['header__actionBtn--cart']
              )}
              aria-label="Корзина"
            >
              <ShoppingBagIcon />
              {cartCount > 0 && (
                <span className={styles.header__badge}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Мобильный поиск (выезжающий) */}
        {isSearchOpen && (
          <div className={styles.header__mobileSearch}>
            <div className="container">
              <SearchBox
                autoFocus
                placeholder="Поиск украшений..."
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Мобильное меню */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
}