// ===================================================
// LUMÉRA JEWELRY — Input UI Component
// src/components/ui/Input/Input.jsx
// ===================================================

import { forwardRef, useId } from 'react';
import { cn } from 'lib/cn';
import styles from './Input.module.css';

/**
 * Универсальный инпут.
 *
 * size: 'sm' | 'md' | 'lg'
 * variant: 'default' | 'filled'
 */
const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    helperText,
    errorText,
    size = 'md',
    variant = 'default',
    leftIcon,
    rightIcon,
    onRightIconClick,
    fullWidth = false,
    disabled = false,
    required = false,
    className,
    wrapperClassName,
    id: externalId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const hasError = Boolean(errorText);

  return (
    <div
      className={cn(
        styles.field,
        fullWidth && styles['field--full'],
        wrapperClassName
      )}
    >
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={styles.field__label}>
          {label}
          {required && (
            <span className={styles.field__required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={cn(
          styles.field__control,
          styles[`field__control--${variant}`],
          styles[`field__control--${size}`],
          hasError   && styles['field__control--error'],
          disabled   && styles['field__control--disabled'],
          leftIcon   && styles['field__control--has-left'],
          rightIcon  && styles['field__control--has-right']
        )}
      >
        {/* Left icon */}
        {leftIcon && (
          <span className={styles.field__icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Input element */}
        <input
          id={inputId}
          ref={ref}
          className={cn(styles.field__input, className)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            errorText
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />

        {/* Right icon — кликабельный (напр. глаз для пароля) */}
        {rightIcon && (
          <button
            type="button"
            className={styles.field__iconRight}
            onClick={onRightIconClick}
            tabIndex={-1}
            aria-label="Действие поля"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {/* Helper / Error text */}
      {errorText && (
        <p
          id={`${inputId}-error`}
          className={cn(styles.field__helper, styles['field__helper--error'])}
          role="alert"
        >
          {errorText}
        </p>
      )}
      {!errorText && helperText && (
        <p id={`${inputId}-helper`} className={styles.field__helper}>
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;