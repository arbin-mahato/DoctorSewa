'use client';

import React, { useRef, useState, useCallback, useId, useEffect } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: string;
  /** Visual state of the input */
  variant?: 'default' | 'error' | 'success';
  /** Helper text below the input */
  helperText?: string;
  /** Error message (overrides helperText when variant is 'error') */
  errorMessage?: string;
  /** Success message (shown when variant is 'success') */
  successMessage?: string;
  /** Show password toggle for password fields */
  showPasswordToggle?: boolean;
  /** Trigger shake animation (set to a new value to re-trigger) */
  shake?: boolean;
  /** Mark field as required (show asterisk) */
  required?: boolean;
  /** Container className */
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = 'default',
      helperText,
      errorMessage,
      successMessage,
      showPasswordToggle = false,
      shake = false,
      required = false,
      wrapperClassName = '',
      className = '',
      type,
      id: externalId,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;
    const generatedId = useId();
    const inputId = externalId || generatedId;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputContainerRef = useRef<HTMLDivElement>(null);

    // Handle shake animation trigger via DOM class (avoids setState in useEffect)
    useEffect(() => {
      const container = inputContainerRef.current;
      if (!container) return;
      if (shake) {
        container.classList.add(styles.shake);
        const timer = setTimeout(() => container.classList.remove(styles.shake), 350);
        return () => clearTimeout(timer);
      }
    }, [shake]);

    const togglePassword = useCallback(() => {
      setPasswordVisible((prev) => !prev);
      setTimeout(() => ref.current?.focus(), 0);
    }, [ref]);

    // Determine the actual input type
    const isPasswordField = type === 'password';
    const resolvedType = isPasswordField && passwordVisible ? 'text' : type;

    // Build input class
    const variantClass =
      variant === 'error'
        ? styles.inputError
        : variant === 'success'
          ? styles.inputSuccess
          : '';

    const inputClasses = [
      styles.input,
      variantClass,
      isPasswordField && showPasswordToggle ? styles.inputWithToggle : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Determine helper text
    const displayedHelper =
      variant === 'error' && errorMessage
        ? errorMessage
        : variant === 'success' && successMessage
          ? successMessage
          : helperText;

    const helperClass =
      variant === 'error'
        ? styles.errorText
        : variant === 'success'
          ? styles.successText
          : styles.helperText;

    return (
      <div className={`${styles.inputWrapper} ${wrapperClassName}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div ref={inputContainerRef} className={styles.inputContainer}>
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-invalid={variant === 'error' ? true : undefined}
            aria-describedby={displayedHelper ? `${inputId}-helper` : undefined}
            {...props}
          />

          {isPasswordField && showPasswordToggle && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePassword}
              tabIndex={-1}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>

        {displayedHelper && (
          <p id={`${inputId}-helper`} className={helperClass}>
            {displayedHelper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
