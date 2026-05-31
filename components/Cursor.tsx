'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'view' | 'go';

export default function Cursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [mounted, setMounted] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { damping: 22, stiffness: 320 });
  const y = useSpring(rawY, { damping: 22, stiffness: 320 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 16);
      rawY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', onMove);

    let current: CursorMode = 'default';

    const set = (m: CursorMode, lbl = '') => {
      if (current === m) return;
      current = m;
      setMode(m);
      setLabel(lbl);
    };

    const reset = () => set('default');

    const wire = () => {
      document.querySelectorAll<HTMLElement>('a:not([data-cw]), button:not([data-cw])').forEach(el => {
        el.addEventListener('mouseenter', () => set('hover'));
        el.addEventListener('mouseleave', reset);
        el.setAttribute('data-cw', '1');
      });
      document.querySelectorAll<HTMLElement>('input, select, textarea').forEach(el => {
        if (el.getAttribute('data-cw')) return;
        el.addEventListener('mouseenter', () => set('hover'));
        el.addEventListener('mouseleave', reset);
        el.setAttribute('data-cw', '1');
      });
      document.querySelectorAll<HTMLElement>('[data-cursor="view"]:not([data-cw])').forEach(el => {
        el.addEventListener('mouseenter', () => set('view', 'VIEW'));
        el.addEventListener('mouseleave', reset);
        el.setAttribute('data-cw', '1');
      });
      document.querySelectorAll<HTMLElement>('[data-cursor="go"]:not([data-cw])').forEach(el => {
        el.addEventListener('mouseenter', () => set('go', 'GO'));
        el.addEventListener('mouseleave', reset);
        el.setAttribute('data-cw', '1');
      });
    };

    wire();
    const obs = new MutationObserver(wire);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  const scale = mode === 'view' ? 3 : mode === 'go' ? 2.2 : mode === 'hover' ? 2.5 : 1;
  const bg =
    mode === 'hover'
      ? 'rgba(255,255,255,0.9)'
      : mode === 'view' || mode === 'go'
      ? 'rgba(10,10,10,0.9)'
      : 'transparent';
  const borderColor =
    mode === 'view' || mode === 'go' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,1)';
  const blendMode: React.CSSProperties['mixBlendMode'] =
    mode === 'view' || mode === 'go' ? 'normal' : 'difference';

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:flex items-center justify-center"
      style={{
        x,
        y,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: `1.5px solid ${borderColor}`,
        background: bg,
        mixBlendMode: blendMode,
      }}
      animate={{ scale }}
      transition={{ type: 'spring', damping: 22, stiffness: 320 }}
    >
      <motion.span
        animate={{ opacity: label ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 7,
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: 'white',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
