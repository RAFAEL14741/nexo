'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------
   template.tsx — re-instantiates on every navigation in App Router.
   Provides the per-page enter animation (content fades/slides in
   after the transition overlay leaves).
------------------------------------------------------------------ */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
