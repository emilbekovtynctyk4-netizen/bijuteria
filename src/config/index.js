// ===================================================
// LUMÉRA JEWELRY — App Configuration
// src/config/index.js
// ===================================================

export const config = {
  appName: 'LUMÉRA JEWELRY',
  appTagline: 'Стильная бижутерия высокого качества',

  // API
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.lumera-jewelry.kg/v1',
  apiTimeout: 10000,

  // Pagination
  productsPerPage: 12,

  // Cart
  freeDeliveryThreshold: 1500,
  currency: 'сом',
  currencySymbol: 'сом',

  // Contacts
  phone: '+996 (700) 000-000',
  email: 'info@lumera.kg',
  supportPhone: '+996 (700) 111-222',
  address: 'г. Бишкек, ул. Абая 23, ТЦ "Жемчужина"',
  workingHours: 'Пн–Вс: 10:00–20:00',
  instagram: 'https://instagram.com/lumera.kg',
  telegram: 'https://t.me/lumera_kg',
  whatsapp: 'https://wa.me/996700000000',
  aboutText: 'LUMÉRA JEWELRY — это бренд, который создаёт утончённые украшения для современных женщин. Мы заботимся о качестве, дизайне и точности исполнения каждой детали.',
  aboutMission: 'Наше стремление — дарить уверенность и стиль, сочетающие классику и современность в каждом изделии.',

  // Cities
  cities: [
    { id: 'bishkek', label: 'Бишкек' },
    { id: 'osh', label: 'Ош' },
    { id: 'jalal_abad', label: 'Джалал-Абад' },
    { id: 'karakol', label: 'Каракол' },
  ],

  defaultCity: 'bishkek',
};
