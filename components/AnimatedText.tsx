'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { charReveal } from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  style,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -40px 0px' });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.24em', ...style }}
    >
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            lineHeight: 1.05,
          }}
        >
          <motion.span variants={charReveal} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
