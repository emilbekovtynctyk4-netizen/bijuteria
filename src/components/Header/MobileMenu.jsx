// ===================================================
// LUMÉRA JEWELRY — Mobile Menu Component
// src/components/Header/MobileMenu.jsx
// ===================================================

import { Link, useLocation } from 'react-router-dom';
import { cn } from 'lib/cn';
import { config } from 'config';
import { ROUTES, NAV_LINKS } from 'constants';
import { Button } from 'components/ui';
import styles from './MobileMenu.module.css';

// ---- SVG Icons ----
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

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  cartCount = 0, 
  wishlistCount = 0 
}) {
  const location = useLocation();

  const isActivePage = (path) => {
    if (path === ROUTES.HOME) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div className={cn(
        styles.mobileMenu,
        isOpen && styles['mobileMenu--open']
      )}>
        
        {/* Header */}
        <div className={styles.mobileMenu__header}>
          <div className={styles.mobileMenu__logo}>
            <span className={styles.mobileMenu__logoText}>LUMÉRA</span>
            <span className={styles.mobileMenu__logoSub}>JEWELRY</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.mobileMenu__nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={cn(
                styles.mobileMenu__navLink,
                isActivePage(link.path) && styles['mobileMenu__navLink--active']
              )}
            >
              <span>{link.label}</span>
              <ChevronRightIcon />
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className={styles.mobileMenu__divider} />

        {/* Quick Actions */}
        <div className={styles.mobileMenu__actions}>
          <Link
            to={ROUTES.PROFILE}
            onClick={onClose}
            className={styles.mobileMenu__action}
          >
            <UserIcon />
            <span>Личный кабинет</span>
            <ChevronRightIcon />
          </Link>

          <Link
            to={ROUTES.WISHLIST}
            onClick={onClose}
            className={styles.mobileMenu__action}
          >
            <HeartIcon />
            <div className={styles.mobileMenu__actionContent}>
              <span>Избранное</span>
              {wishlistCount > 0 && (
                <span className={styles.mobileMenu__actionCount}>
                  {wishlistCount}
                </span>
              )}
            </div>
            <ChevronRightIcon />
          </Link>

          <Link
            to={ROUTES.CART}
            onClick={onClose}
            className={styles.mobileMenu__action}
          >
            <ShoppingBagIcon />
            <div className={styles.mobileMenu__actionContent}>
              <span>Корзина</span>
              {cartCount > 0 && (
                <span className={styles.mobileMenu__actionCount}>
                  {cartCount}
                </span>
              )}
            </div>
            <ChevronRightIcon />
          </Link>
        </div>

        {/* CTA Section */}
        <div className={styles.mobileMenu__cta}>
          <Button
            variant="gold"
            size="lg"
            fullWidth
            onClick={() => {
              onClose();
              // Navigate to catalog
              window.location.href = ROUTES.CATALOG;
            }}
          >
            Перейти в каталог
          </Button>

          <a
            href={`tel:${config.phone}`}
            className={styles.mobileMenu__phone}
          >
            <PhoneIcon />
            <span>{config.phone}</span>
          </a>
        </div>

        {/* Footer Info */}
        <div className={styles.mobileMenu__footer}>
          <p className={styles.mobileMenu__footerText}>
            {config.appTagline}
          </p>
          <p className={styles.mobileMenu__footerCopy}>
            © 2024 LUMÉRA JEWELRY
          </p>
        </div>
      </div>
    </>
  );
}