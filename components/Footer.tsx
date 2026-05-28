'use client';

import { useRouter } from 'next/navigation';
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
      className="border-t border-[#1a1a1a] px-14 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
      style={{ background: '#080808' }}
    >
      {/* Logo + tagline */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => goTo('/')}
          className="text-[#F2EFE8] text-[15px] font-black tracking-[0.14em] uppercase bg-transparent border-none p-0 text-left"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          NEXO
        </button>
        <p className="text-[12px] text-[rgba(242,239,232,0.4)] max-w-[260px] leading-relaxed">
          Premium websites for Northeast Philadelphia businesses. Free demo — pay only when you love it.
        </p>
      </div>

      {/* Nav links */}
      <nav>
        <ul className="flex flex-wrap gap-7 list-none">
          {FOOTER_LINKS.map(l => (
            <li key={l.href}>
              <button
                onClick={() => goTo(l.href)}
                className="text-[13px] text-[rgba(242,239,232,0.5)] hover:text-[#F2EFE8] transition-colors duration-200 bg-transparent border-none p-0"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Copyright */}
      <p className="text-[11px] text-[rgba(242,239,232,0.25)] tracking-wider">
        © 2025 NEXO · NE Philadelphia
      </p>
    </footer>
  );
}
