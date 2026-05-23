// ===================================================
// LUMÉRA JEWELRY — Badge UI Component
// src/components/ui/Badge/Badge.jsx
// ===================================================

import { cn } from 'lib/cn';
import { PRODUCT_BADGE, PRODUCT_BADGE_LABELS } from 'constants';
import styles from './Badge.module.css';

/**
 * Бейдж для карточки товара и других мест.
 *
 * variant: 'sale' | 'hit' | 'new' | 'limited' | 'custom'
 * size:    'sm' | 'md'
 *
 * Если передан discountPercent — показывает "-15%".
 */
function Badge({
  variant = 'custom',
  size = 'md',
  discountPercent = null,
  children,
  className,
}) {
  const label = discountPercent
    ? `-${discountPercent}%`
    : (children ?? PRODUCT_BADGE_LABELS[variant] ?? variant);

  return (
    <span
      className={cn(
        styles.badge,
        styles[`badge--${variant}`],
        styles[`badge--${size}`],
        className
      )}
    >
      {label}
    </span>
  );
}

/**
 * Группа бейджей — позиционируется поверх карточки товара.
 * Принимает badge (string) и discountPercent (number).
 */
export function ProductBadges({ badge, discountPercent, className }) {
  if (!badge && !discountPercent) return null;

  return (
    <div className={cn(styles.badgeGroup, className)}>
      {discountPercent > 0 && (
        <Badge variant={PRODUCT_BADGE.SALE} discountPercent={discountPercent} />
      )}
      {badge === PRODUCT_BADGE.HIT && (
        <Badge variant={PRODUCT_BADGE.HIT} />
      )}
      {badge === PRODUCT_BADGE.NEW && (
        <Badge variant={PRODUCT_BADGE.NEW} />
      )}
      {badge === PRODUCT_BADGE.LIMITED && (
        <Badge variant={PRODUCT_BADGE.LIMITED} />
      )}
    </div>
  );
}

export default Badge;