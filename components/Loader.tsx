'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('nexo_loaded')) {
      sessionStorage.setItem('nexo_loaded', '1');
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2100);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99995,
            background: '#080808',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: '#1a1a1a',
              transformOrigin: 'left center',
            }}
          />

          {/* NEXO wordmark — slides up from clip */}
          <div style={{ overflow: 'hidden', lineHeight: 0.9 }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(80px, 15vw, 160px)',
                color: '#F2EFE8',
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                userSelect: 'none',
                margin: 0,
              }}
            >
              NEXO
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,232,0.3)',
              marginTop: 20,
              userSelect: 'none',
            }}
          >
            Digital Studio
          </motion.p>

          {/* Bottom: progress bar (lime) fills left→right */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: '#111',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.9, ease: 'linear' }}
              style={{ height: '100%', background: '#C9F135' }}
            />
          </div>

          {/* Lime accent dot bottom-right */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: 0.9, type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              bottom: 28,
              right: 56,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#C9F135',
            }}
          />

          {/* Est label bottom-left */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: 24,
              left: 56,
              fontFamily: 'var(--font-syne)',
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,232,0.2)',
              userSelect: 'none',
            }}
          >
            Est. 2025 · NE Philadelphia
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
