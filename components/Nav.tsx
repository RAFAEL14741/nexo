'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
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

  return (
    <Link
      href={href}
      prefetch
      onClick={e => { e.preventDefault(); startTransition(() => router.push(href)); }}
      onMouseEnter={() => router.prefetch(href)}
      className="relative pb-1 text-[13px] no-underline"
      style={{ color: isActive ? '#F2EFE8' : 'rgba(242,239,232,0.45)' }}
    >
      {label}
      <motion.span
        className="absolute bottom-[-1px] left-0 right-0 h-px bg-[#F2EFE8] block"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: 'left center' }}
        transition={{ duration: 0.26, ease: [0.33, 1, 0.68, 1] }}
      />
      {isActive && (
        <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#C9F135]" />
      )}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [mOpen, setMOpen] = useState(false);

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(8,8,8,0)', 'rgba(8,8,8,0.94)']
  );
  const navBlur = useTransform(
    scrollY,
    [0, 80],
    ['blur(0px)', 'blur(18px)']
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const padY = useTransform(scrollY, [0, 80], [28, 14]);

  const goTo = (href: string) => {
    setMOpen(false);
    startTransition(() => router.push(href));
  };

  const mobileLinks = [{ href: '/', label: 'Home' }, ...LINKS];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 md:px-14"
        style={{
          background: navBg,
          backdropFilter: navBlur,
          paddingTop: padY,
          paddingBottom: padY,
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1a1a]"
          style={{ opacity: borderOpacity }}
        />

        {/* Logo */}
        <motion.div whileHover={{ letterSpacing: '0.22em' }} transition={{ duration: 0.35 }}>
          <Link
            href="/"
            prefetch
            onClick={e => { e.preventDefault(); startTransition(() => router.push('/')); }}
            onMouseEnter={() => router.prefetch('/')}
            className="text-[#F2EFE8] text-[15px] font-black tracking-[0.14em] uppercase no-underline"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            NEXO
          </Link>
        </motion.div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 list-none">
            {LINKS.map(l => (
              <li key={l.href}>
                <NavLink
                  href={l.href}
                  label={l.label}
                  isActive={
                    pathname === l.href || pathname.startsWith(l.href + '/')
                  }
                />
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            prefetch
            onClick={e => {
              e.preventDefault();
              startTransition(() => router.push('/contact'));
            }}
            onMouseEnter={() => router.prefetch('/contact')}
            className="relative text-[13px] font-medium text-[#F2EFE8] no-underline group"
            data-cursor="go"
          >
            Get a Free Demo{' '}
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
            <motion.span
              className="absolute bottom-[-2px] left-0 right-0 h-px bg-[#C9F135] block"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              style={{ transformOrigin: 'left center' }}
              transition={{ duration: 0.26 }}
            />
          </Link>
        </div>

        {/* Hamburger */}
        <motion.button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none p-1"
          onClick={() => setMOpen(!mOpen)}
          aria-label={mOpen ? 'Close menu' : 'Open menu'}
          whileTap={{ scale: 0.88 }}
        >
          <motion.span
            className="block w-[22px] h-px bg-[#F2EFE8]"
            animate={{ rotate: mOpen ? 45 : 0, y: mOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-[22px] h-px bg-[#F2EFE8]"
            animate={{ opacity: mOpen ? 0 : 1, scaleX: mOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-[22px] h-px bg-[#F2EFE8]"
            animate={{ rotate: mOpen ? -45 : 0, y: mOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-[#080808] flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              className="flex flex-col items-center gap-7"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {mobileLinks.map(l => (
                <motion.button
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
                  }}
                  onClick={() => goTo(l.href)}
                  className="bg-transparent border-none text-[#F2EFE8] font-black tracking-tight"
                  style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 8vw, 56px)' }}
                  whileHover={{ color: '#C9F135', x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
