// ===================================================
// LUMÉRA JEWELRY — Button UI Component
// src/components/ui/Button/Button.jsx
// ===================================================

import { forwardRef } from 'react';
import { cn } from 'lib/cn';
import styles from './Button.module.css';

/**
 * Универсальная кнопка.
 *
 * variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
 * size:    'sm' | 'md' | 'lg'
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    as: Tag = 'button',
    className,
    leftIcon,
    rightIcon,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <Tag
      ref={ref}
      className={cn(
        styles.btn,
        styles[`btn--${variant}`],
        styles[`btn--${size}`],
        fullWidth  && styles['btn--full'],
        loading    && styles['btn--loading'],
        isDisabled && styles['btn--disabled'],
        className
      )}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {/* Shimmer-эффект для gold-варианта */}
      {variant === 'gold' && (
        <span className={styles.btn__shimmer} aria-hidden="true" />
      )}

      {/* Левая иконка */}
      {leftIcon && !loading && (
        <span className={styles.btn__icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Спиннер загрузки */}
      {loading && (
        <span className={styles.btn__spinner} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle
              cx="12" cy="12" r="10"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="8"
            />
          </svg>
        </span>
      )}

      {/* Текст */}
      <span className={styles.btn__label}>
        {children}
      </span>

      {/* Правая иконка */}
      {rightIcon && !loading && (
        <span className={styles.btn__icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </Tag>
  );
});

export default Button;