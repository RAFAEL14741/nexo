'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePageTransition } from '@/providers/TransitionProvider';

const LINKS = [
  { href: '/work',     label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => router.push(href));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative pb-1 text-[13px] transition-colors duration-200 group"
      style={{ color: isActive ? '#F2EFE8' : 'rgba(242,239,232,0.5)' }}
    >
      {label}

      {/* Framer Motion underline draw */}
      <motion.span
        className="absolute bottom-[-1px] left-0 right-0 h-px bg-[#F2EFE8] block"
        initial={{ scaleX: 0, originX: 'left' }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: 'left center' }}
        transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Active route accent dot */}
      {isActive && (
        <span
          className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9F135]"
        />
      )}
    </a>
  );
}

export default function Nav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { startTransition } = usePageTransition();
  const [scrolled, setScrolled] = useState(false);
  const [mOpen,    setMOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href: string) => {
    setMOpen(false);
    startTransition(() => router.push(href));
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-350"
        style={{
          padding:        scrolled ? '14px 56px' : '28px 56px',
          background:     scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:   scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={e => { e.preventDefault(); startTransition(() => router.push('/')); }}
          className="text-[#F2EFE8] text-[15px] font-black tracking-[0.14em] uppercase no-underline"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          NEXO
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-11">
          <ul className="flex gap-9 list-none">
            {LINKS.map(l => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} isActive={pathname === l.href || pathname.startsWith(l.href + '/')} />
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            onClick={e => { e.preventDefault(); startTransition(() => router.push('/contact')); }}
            className="text-[13px] font-medium text-[#F2EFE8] no-underline border-b border-transparent hover:border-[#F2EFE8] transition-colors duration-300 pb-0.5"
            data-cursor="go"
          >
            Get a Free Demo →
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none p-1"
          onClick={() => setMOpen(!mOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-[22px] h-px bg-[#F2EFE8] transition-transform duration-300"
            style={{ transform: mOpen ? 'rotate(45deg) translate(4px,4px)' : '' }}
          />
          <span
            className="block w-[22px] h-px bg-[#F2EFE8] transition-opacity duration-300"
            style={{ opacity: mOpen ? 0 : 1 }}
          />
          <span
            className="block w-[22px] h-px bg-[#F2EFE8] transition-transform duration-300"
            style={{ transform: mOpen ? 'rotate(-45deg) translate(4px,-4px)' : '' }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[999] bg-[#080808] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden"
        style={{ opacity: mOpen ? 1 : 0, pointerEvents: mOpen ? 'all' : 'none' }}
      >
        {[{ href: '/', label: 'Home' }, ...LINKS].map(l => (
          <button
            key={l.href}
            onClick={() => goTo(l.href)}
            className="bg-transparent border-none text-[#F2EFE8] text-5xl font-black tracking-tight hover:text-[#C9F135] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}
