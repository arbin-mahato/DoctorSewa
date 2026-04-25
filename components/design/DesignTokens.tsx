'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import designSystem from '@/lib/designSystem';
import { animations } from '@/lib/animations';

export function DesignTokens() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [inputShake, setInputShake] = useState(false);

  useEffect(() => {
    if (pageRef.current) {
      animations.staggerChildren(pageRef.current, 0.08);
    }
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-primary-700)',
            marginBottom: '8px',
          }}
        >
          Design System
        </p>
        <h1 style={{ fontSize: '36px', letterSpacing: '-0.03em' }}>
          DoctorSewa Tokens
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          The visual foundation for every component and page in DoctorSewa v2.
          All colors, typography, spacing, and animation tokens in one place.
        </p>
      </div>

      {/* ── Colors: Primary ──────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Primary Colors</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '16px',
          }}
        >
          {Object.entries(designSystem.colors.primary).map(([key, color]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '64px',
                  background: color,
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '8px',
                  border: '1px solid var(--border-default)',
                }}
              />
              <p style={{ fontSize: '13px', fontWeight: 500 }}>
                {key}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {color}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Colors: Secondary ────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Secondary &amp; Semantic</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px',
          }}
        >
          {Object.entries({
            ...designSystem.colors.secondary,
            ...designSystem.colors.semantic,
          }).map(([key, color]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '52px',
                  background: color,
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '8px',
                }}
              />
              <p style={{ fontSize: '13px', fontWeight: 500 }}>
                {key}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {color}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Colors: Neutrals ─────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Neutrals</h2>
        <div style={{ display: 'flex', gap: '0', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {Object.entries(designSystem.colors.neutral).map(([key, color]) => (
            <div
              key={key}
              style={{
                flex: 1,
                height: '80px',
                background: color,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '8px 4px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: Number(key) >= 500 ? '#fff' : '#1a1916',
                }}
              >
                {key}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ───────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Typography</h2>
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--border-default)',
          }}
        >
          <h1 style={{ marginBottom: '16px' }}>Heading 1 — 32px Semibold</h1>
          <h2 style={{ marginBottom: '16px' }}>Heading 2 — 24px Semibold</h2>
          <h3 style={{ marginBottom: '16px' }}>Heading 3 — 20px Medium</h3>
          <h4 style={{ marginBottom: '16px' }}>Heading 4 — 16px Medium</h4>
          <p style={{ marginBottom: '16px' }}>
            Body text — 14px Regular. The quick brown fox jumps over the lazy
            dog. DoctorSewa makes healthcare accessible to everyone.
          </p>
          <small>Small text — 12px. Secondary information and captions.</small>
        </div>
      </section>

      {/* ── Buttons ──────────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Buttons</h2>
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--border-default)',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Variants
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '24px',
            }}
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Sizes
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '24px',
            }}
          >
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>

          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            States
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
          </div>
        </div>
      </section>

      {/* ── Inputs ───────────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Inputs</h2>
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--border-default)',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Variants
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            <Input
              label="Default"
              placeholder="Enter your name"
              helperText="This is helper text"
            />
            <Input
              label="Error State"
              variant="error"
              placeholder="Invalid email"
              defaultValue="not-an-email"
              errorMessage="Please enter a valid email address"
              shake={inputShake}
            />
            <Input
              label="Success State"
              variant="success"
              placeholder="Verified"
              defaultValue="arbin@example.com"
              successMessage="Email is available"
            />
            <Input
              label="Disabled"
              placeholder="Cannot edit"
              disabled
            />
          </div>

          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Password with toggle
          </p>
          <div style={{ maxWidth: '320px', marginBottom: '24px' }}>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              showPasswordToggle
              required
            />
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setInputShake(true);
              setTimeout(() => setInputShake(false), 400);
            }}
          >
            Trigger Shake Animation
          </Button>
        </div>
      </section>

      {/* ── Cards ────────────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Cards</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <Card variant="default" animate>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Hover to see the lift effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                This card has a subtle border and lifts on hover with a shadow
                transition. Great for list items and content panels.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" animate>
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Pre-elevated with deeper shadow on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                This card starts with a shadow and border-less look.
                On hover it lifts higher. Great for CTAs and featured content.
              </p>
            </CardContent>
          </Card>

          <Card variant="default" hoverable={false}>
            <CardHeader>
              <CardTitle>Static Card</CardTitle>
              <CardDescription>No hover animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                A static card with no hover effect. Use for info panels
                or content that doesn&apos;t need interaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Spacing ──────────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Spacing Grid (4px base)</h2>
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {Object.entries(designSystem.spacing)
              .filter(([key]) => key !== '0')
              .map(([key, value]) => (
                <div key={key}>
                  <div
                    style={{
                      width: '100%',
                      minWidth: '60px',
                      height: value,
                      background: 'var(--color-primary-700)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '8px',
                    }}
                  />
                  <p style={{ fontSize: '12px', fontWeight: 500 }}>{key}</p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Shadows ──────────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Shadows</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '24px',
          }}
        >
          {Object.entries(designSystem.shadows)
            .filter(([key]) => key !== 'none')
            .map(([key, value]) => (
              <div
                key={key}
                style={{
                  padding: '24px',
                  background: 'var(--bg-page)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: value,
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 500 }}>{key}</p>
              </div>
            ))}
        </div>
      </section>

      {/* ── Border Radius ────────────────────────── */}
      <section style={{ marginBottom: '48px' }}>
        <h2>Border Radius</h2>
        <div
          style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {Object.entries(designSystem.borderRadius)
            .filter(([key]) => key !== 'none')
            .map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--color-primary-700)',
                    borderRadius: value,
                    marginBottom: '8px',
                  }}
                />
                <p style={{ fontSize: '12px', fontWeight: 500 }}>{key}</p>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default DesignTokens;
