'use client';

import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type TransitionContextType = {
  startTransition: (navigateFn: () => void) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
  startTransition: (fn) => fn(),
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  // Framer Motion AnimatePresence in template.tsx handles page transitions.
  // startTransition is a passthrough — nav links call it the same way but
  // there's no blocking overlay to get stuck.
  const startTransition = useCallback((navigateFn: () => void) => {
    navigateFn();
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning: false }}>
      {children}
    </TransitionContext.Provider>
  );
}
