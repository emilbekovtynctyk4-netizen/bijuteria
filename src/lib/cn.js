// ===================================================
// LUMÉRA JEWELRY — Class Name Utility (cn)
// src/lib/cn.js
// ===================================================

/**
 * Объединяет CSS-классы, фильтруя falsy-значения.
 * Лёгкая альтернатива clsx без зависимостей.
 *
 * @param {...(string|undefined|null|false|{[key: string]: boolean})} args
 * @returns {string}
 *
 * @example
 * cn('btn', isActive && 'btn--active', { 'btn--lg': size === 'lg' })
 * // => "btn btn--active btn--lg"
 */
export function cn(...args) {
  const classes = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg.trim());
      continue;
    }

    if (typeof arg === 'object' && !Array.isArray(arg)) {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key.trim());
      }
      continue;
    }

    if (Array.isArray(arg)) {
      const nested = cn(...arg);
      if (nested) classes.push(nested);
    }
  }

  return classes.filter(Boolean).join(' ');
}
