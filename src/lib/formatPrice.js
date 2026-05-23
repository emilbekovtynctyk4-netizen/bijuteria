// ===================================================
// LUMÉRA JEWELRY — Price Formatting Utility
// src/lib/formatPrice.js
// ===================================================

/**
 * Форматирует число в строку цены с разделителями разрядов.
 * @param {number} amount — сумма
 * @param {string} [currency='сом'] — символ/название валюты
 * @returns {string} — например: "1 250 сом"
 */
export function formatPrice(amount, currency = 'сом') {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `— ${currency}`;
  }

  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return `${formatted} ${currency}`;
}

/**
 * Вычисляет цену со скидкой.
 * @param {number} originalPrice
 * @param {number} discountPercent — процент скидки (0–100)
 * @returns {number}
 */
export function calcDiscountedPrice(originalPrice, discountPercent) {
  if (!discountPercent || discountPercent <= 0) return originalPrice;
  return Math.round(originalPrice * (1 - discountPercent / 100));
}

/**
 * Возвращает экономию в сомах.
 * @param {number} originalPrice
 * @param {number} discountPercent
 * @returns {number}
 */
export function calcSavings(originalPrice, discountPercent) {
  return originalPrice - calcDiscountedPrice(originalPrice, discountPercent);
}

/**
 * Проверяет, достигнут ли порог бесплатной доставки.
 * @param {number} totalAmount
 * @param {number} [threshold=1500]
 * @returns {boolean}
 */
export function isFreeDelivery(totalAmount, threshold = 1500) {
  return totalAmount >= threshold;
}

/**
 * Возвращает сколько ещё нужно потратить до бесплатной доставки.
 * @param {number} totalAmount
 * @param {number} [threshold=1500]
 * @returns {number}
 */
export function amountUntilFreeDelivery(totalAmount, threshold = 1500) {
  const diff = threshold - totalAmount;
  return diff > 0 ? diff : 0;
}
