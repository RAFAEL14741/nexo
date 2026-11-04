'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export default function Ripple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99988]"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setRipples(prev => prev.filter(rp => rp.id !== r.id))
            }
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              left: r.x - 20,
              top: r.y - 20,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
