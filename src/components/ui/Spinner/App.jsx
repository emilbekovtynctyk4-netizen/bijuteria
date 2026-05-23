// ===================================================
// LUMÉRA JEWELRY — Spinner UI Component
// src/components/ui/Spinner/Spinner.jsx
// ===================================================

import { cn } from 'lib/cn';
import styles from './Spinner.module.css';

/**
 * Индикатор загрузки.
 *
 * size:    'xs' | 'sm' | 'md' | 'lg'
 * variant: 'gold' | 'dark' | 'light'
 * overlay: true — накрывает родительский блок тёмным оверлеем
 */
function Spinner({
  size = 'md',
  variant = 'gold',
  overlay = false,
  label = 'Загрузка...',
  className,
}) {
  const spinner = (
    <span
      className={cn(
        styles.spinner,
        styles[`spinner--${size}`],
        styles[`spinner--${variant}`],
        className
      )}
      role="status"
      aria-label={label}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="20" cy="20" r="17"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity="0.18"
        />
        {/* Arc */}
        <circle
          cx="20" cy="20" r="17"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="55"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );

  if (overlay) {
    return (
      <div className={styles.spinner__overlay} aria-busy="true">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Полностраничный спиннер — центрируется на экране.
 */
export function PageSpinner({ label = 'Загрузка страницы...' }) {
  return (
    <div className={styles.spinner__page} aria-busy="true">
      <Spinner size="lg" variant="gold" label={label} />
      <p className={styles.spinner__pageLabel}>{label}</p>
    </div>
  );
}

export default Spinner;