'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function SectionCounter() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname !== '/') return;

    // Delay appearance — gives loader time to exit on first visit
    const showTimer = setTimeout(() => setReady(true), 2800);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-s]')
    );
    setTotal(sections.length);
    if (sections.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach((section, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrent(i + 1);
        },
        { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(section);
      observers.push(obs);
    });

    return () => {
      observers.forEach(o => o.disconnect());
      clearTimeout(showTimer);
    };
  }, [pathname]);

  if (pathname !== '/' || total === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 56,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        pointerEvents: 'none',
        fontFamily: 'var(--font-syne)',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: '0.14em',
      }}
      className="hidden md:flex"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ color: '#C9F135' }}
        >
          {String(current).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span style={{ color: 'rgba(242,239,232,0.18)', fontSize: 8 }}>
        /
      </span>
      <span style={{ color: 'rgba(242,239,232,0.22)' }}>
        {String(total).padStart(2, '0')}
      </span>
    </motion.div>
  );
}
