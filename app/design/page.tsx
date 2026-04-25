import type { Metadata } from 'next';
import { DesignTokens } from '@/components/design/DesignTokens';

export const metadata: Metadata = {
  title: 'Design System',
  description: 'DoctorSewa v2 — Design tokens, colors, typography, and components',
};

export default function DesignPage() {
  return (
    <main>
      <DesignTokens />
    </main>
  );
}
