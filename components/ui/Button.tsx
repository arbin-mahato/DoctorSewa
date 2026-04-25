'use client';

import React, { useRef, useEffect } from 'react';
import { animations } from '@/lib/animations';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      children,
      className = '',
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) || internalRef;

    useEffect(() => {
      const el = ref.current;
      if (!el || disabled || loading) return;
      const cleanup = animations.buttonHover(el);
      return cleanup;
    }, [ref, disabled, loading]);

    // Build class list from CSS modules
    const variantClass =
      variant === 'primary'
        ? styles.btnPrimary
        : variant === 'secondary'
          ? styles.btnSecondary
          : variant === 'danger'
            ? styles.btnDanger
            : styles.btnGhost;

    const sizeClass =
      size === 'sm' ? styles.btnSm : size === 'lg' ? styles.btnLg : '';

    const classes = [
      styles.btn,
      variantClass,
      sizeClass,
      loading ? styles.btnLoading : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? <span className={styles.spinner} /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
