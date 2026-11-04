'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type Variants,
} from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'view' | 'go';

const EASE = [0.76, 0, 0.24, 1] as const;

const cursorVariants: Variants = {
  default: {
    scale: 1,
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: 'rgba(255,255,255,1)',
  },
  hover: {
    scale: 2.5,
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,255,255,0.9)',
  },
  view: {
    scale: 80 / 32,
    opacity: 1,
    backgroundColor: 'rgba(10,10,10,0.92)',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  go: {
    scale: 60 / 32,
    opacity: 1,
    backgroundColor: 'rgba(10,10,10,0.92)',
    borderColor: 'rgba(255,255,255,0.15)',
  },
};

const cursorTransition = {
  type: 'spring' as const,
  damping: 20,
  stiffness: 380,
  mass: 0.55,
};

const labelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 4, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 16, stiffness: 480, mass: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: -3,
    filter: 'blur(3px)',
    transition: { duration: 0.12, ease: EASE },
  },
};

export default function Cursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [mounted, setMounted] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const x = useSpring(rawX, { damping: 28, stiffness: 520, mass: 0.35 });
  const y = useSpring(rawY, { damping: 28, stiffness: 520, mass: 0.35 });
  const lagX = useSpring(trailX, { damping: 16, stiffness: 100, mass: 0.9 });
  const lagY = useSpring(trailY, { damping: 16, stiffness: 100, mass: 0.9 });

  useEffect(() => {
    setMounted(true);

    let current: CursorMode = 'default';

    const set = (m: CursorMode, lbl = '') => {
      if (current === m) return;
      current = m;
      setMode(m);
      setLabel(lbl);
    };

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 16);
      rawY.set(e.clientY - 16);
      trailX.set(e.clientX - 24);
      trailY.set(e.clientY - 24);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
      if (cursorEl) {
        const c = cursorEl.getAttribute('data-cursor');
        if (c === 'view') return set('view', 'VIEW');
        if (c === 'go') return set('go', 'GO');
      }
      if (target?.closest('a, button, input, select, textarea')) {
        return set('hover');
      }
      set('default');
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [rawX, rawY, trailX, trailY]);

  if (!mounted) return null;

  const isLabeled = mode === 'view' || mode === 'go';
  const blendMode: React.CSSProperties['mixBlendMode'] = isLabeled ? 'normal' : 'difference';

  return (
    <>
      {/* Trailing ring — slower spring for lag behind the pointer */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99998] pointer-events-none hidden md:block"
        style={{ x: lagX, y: lagY, mixBlendMode: blendMode }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: mode === 'default' ? 0.4 : 0,
          scale: mode === 'hover' ? 1.6 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          x,
          y,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid',
          mixBlendMode: blendMode,
        }}
        variants={cursorVariants}
        initial={{ opacity: 0, scale: 0 }}
        animate={mode}
        transition={cursorTransition}
      >
        <motion.div
          animate={{ scale: clicking ? 0.88 : 1 }}
          transition={{ type: 'spring', damping: 30, stiffness: 600, mass: 0.3 }}
          className="flex items-center justify-center w-full h-full"
        >
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                variants={labelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
