import { LayoutProps } from '@/lib/types';
import './globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
