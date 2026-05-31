'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePageTransition } from '@/providers/TransitionProvider';

const FOOTER_LINKS = [
  { href: '/work',     label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid #1a1a1a',
        padding: '64px 56px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 40,
      }}
    >
      {/* Logo + tagline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          onClick={() => goTo('/')}
          whileHover={{ letterSpacing: '0.22em' }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F2EFE8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textAlign: 'left',
          }}
        >
          NEXO
        </motion.button>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(242,239,232,0.35)',
            maxWidth: 260,
            lineHeight: 1.65,
          }}
        >
          Premium websites for Northeast Philadelphia businesses.
          Free demo — pay only when you love it.
        </p>
      </div>

      {/* Nav links */}
      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 28px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {FOOTER_LINKS.map(l => (
            <li key={l.href}>
              <motion.button
                onClick={() => goTo(l.href)}
                whileHover={{ color: '#F2EFE8' }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: 13,
                  color: 'rgba(242,239,232,0.45)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {l.label}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Copyright */}
      <p
        style={{
          fontSize: 11,
          color: 'rgba(242,239,232,0.2)',
          letterSpacing: '0.12em',
        }}
      >
        © 2025 NEXO · NE Philadelphia
      </p>
    </footer>
  );
}
