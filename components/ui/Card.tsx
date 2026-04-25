'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/animations';
import cardStyles from './Card.module.css';

// ─────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Visual elevation variant */
  variant?: 'default' | 'elevated';
  /** Hover lift animation (disable for static cards) */
  hoverable?: boolean;
  /** Fade-in entrance animation */
  animate?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Inline styles (for stagger animation opacity) */
  style?: React.CSSProperties;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  variant = 'default',
  hoverable = true,
  animate = false,
  padding = 'md',
  style,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Entrance animation
    if (animate) {
      animations.fadeIn(el);
    }

    // Hover lift (only if hoverable and not using CSS-only hover)
    // CSS handles hover by default; GSAP hover is optional for richer control
    let cleanup: (() => void) | undefined;
    if (hoverable) {
      cleanup = animations.cardHover(el);
    }

    return () => cleanup?.();
  }, [animate, hoverable]);

  const variantClass =
    variant === 'elevated' ? cardStyles.cardElevated : cardStyles.cardDefault;

  const hoverClass = !hoverable ? cardStyles.cardStatic : '';

  return (
    <div
      ref={cardRef}
      className={cn(
        cardStyles.card,
        variantClass,
        hoverClass,
        paddingStyles[padding],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Card sub-components (unchanged API)
// ─────────────────────────────────────────────

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-4 border-b pb-4',
        className
      )}
      style={{ borderColor: 'var(--border-default)' }}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn('text-lg font-semibold', className)}
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn('text-sm', className)}
      style={{ color: 'var(--text-secondary)' }}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('mt-4 flex items-center border-t pt-4', className)}
      style={{ borderColor: 'var(--border-default)' }}
    >
      {children}
    </div>
  );
}
