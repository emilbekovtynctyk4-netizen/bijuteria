// ===================================================
// LUMÉRA JEWELRY — Top Info Bar Component
// src/components/Header/TopBar.jsx
// ===================================================

import { useState } from 'react';
import { cn } from 'lib/cn';
import { config } from 'config';
import styles from './TopBar.module.css';

// ---- SVG Icons ----
const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="1.5"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.8 13.617l-2.96-.925c-.64-.203-.658-.64.135-.953l11.566-4.458c.538-.196 1.006.128.832.94z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm4.52 7.01l-2.21 1.07c-.12.06-.26.06-.38 0L12.04 9c-.66-.33-1.21-.33-1.87 0L8.24 10.08c-.12.06-.26.06-.38 0L5.65 9.01c-.19-.09-.31-.28-.31-.49s.12-.4.31-.49l4.39-2.13c.66-.32 1.42-.32 2.08 0l4.39 2.13c.19.09.31.28.31.49s-.12.4-.31.49z"/>
  </svg>
);

export default function TopBar() {
  const [selectedCity, setSelectedCity] = useState(config.cities[0]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    // TODO: Сохранить в localStorage
  };

  return (
    <div className={styles.topBar}>
      <div className={cn('container', styles.topBar__container)}>
        
        {/* Левая часть — доставка и город */}
        <div className={styles.topBar__left}>
          {/* Бесплатная доставка */}
          <div className={styles.topBar__delivery}>
            <TruckIcon />
            <span>Бесплатная доставка от {config.freeDeliveryThreshold} {config.currency}</span>
          </div>

          {/* Разделитель */}
          <div className={styles.topBar__divider} />

          {/* Выбор города */}
          <div className={styles.topBar__city}>
            <button
              className={styles.topBar__cityButton}
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              aria-expanded={isCityDropdownOpen}
              aria-label="Выбрать город"
            >
              <span>{selectedCity.label}</span>
              <ChevronDownIcon />
            </button>

            {isCityDropdownOpen && (
              <div className={styles.topBar__cityDropdown}>
                {config.cities.map((city) => (
                  <button
                    key={city.id}
                    className={cn(
                      styles.topBar__cityOption,
                      city.id === selectedCity.id && styles['topBar__cityOption--active']
                    )}
                    onClick={() => handleCityChange(city)}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.topBar__contacts}>
          <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className={styles.topBar__contactLink}>
            {config.phone}
          </a>
          <a href={`mailto:${config.email}`} className={styles.topBar__contactLink}>
            {config.email}
          </a>
        </div>

        {/* Правая часть — социальные сети */}
        <div className={styles.topBar__social}>
          <a
            href={config.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topBar__socialLink}
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={config.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topBar__socialLink}
            aria-label="Telegram"
          >
            <TelegramIcon />
          </a>
          <a
            href={config.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topBar__socialLink}
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  );
}