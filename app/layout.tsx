import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';
import { TransitionProvider } from '@/providers/TransitionProvider';
import LenisProvider from '@/providers/LenisProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Ripple from '@/components/Ripple';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXO — Web Design · Northeast Philadelphia',
  description:
    'We build websites for local businesses in Northeast Philadelphia. Free demo — see it live before you spend a cent.',
  openGraph: {
    title: 'NEXO — Web Design · Northeast Philadelphia',
    description:
      'Premium sites for local NE Philly businesses. Free demo. Pay only when you love it.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable}`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <body>
        <LenisProvider>
          <TransitionProvider>
            {/* Global persistent UI */}
            <Cursor />
            <Ripple />
            <Nav />

            {/* Page content — template.tsx wraps each page */}
            <main>{children}</main>

            <Footer />
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
