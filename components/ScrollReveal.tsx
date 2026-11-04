'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  once = true,
  margin = '-100px',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay } }
          : { opacity: 0, y: 50 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
