'use client';

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

/* ------------------------------------------------------------------
   CONTEXT
------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------
   OVERLAY INNER — watches pathname to trigger reveal
------------------------------------------------------------------ */
function OverlayWatcher({
  overlayRef,
  covering,
  onReveal,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  covering: boolean;
  onReveal: () => void;
}) {
  const pathname = usePathname();
  const prevRef = useRef(pathname);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (prevRef.current !== pathname && covering) {
      prevRef.current = pathname;
      // New page has mounted — slide overlay off top
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        onComplete: onReveal,
      });
    }
  }, [pathname, covering, overlayRef, onReveal]);

  return null;
}

/* ------------------------------------------------------------------
   PROVIDER
------------------------------------------------------------------ */
export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [covering, setCovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleReveal = useCallback(() => {
    setCovering(false);
    setIsTransitioning(false);
  }, []);

  const startTransition = useCallback((navigateFn: () => void) => {
    if (!overlayRef.current) {
      navigateFn();
      return;
    }
    setIsTransitioning(true);
    // Slide overlay up from bottom to cover screen
    gsap.fromTo(
      overlayRef.current,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.5,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        onComplete() {
          setCovering(true);
          navigateFn(); // Navigate while screen is covered
        },
      }
    );
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}

      {/* Pathname watcher — triggers reveal when new page mounts */}
      <OverlayWatcher
        overlayRef={overlayRef}
        covering={covering}
        onReveal={handleReveal}
      />

      {/* Full-screen transition overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{ transform: 'translateY(100%)' }}
        className="fixed inset-0 z-[9998] bg-[#080808] flex items-center justify-center pointer-events-none will-change-transform"
      >
        <span
          className="text-[#F2EFE8] tracking-[0.14em] font-black"
          style={{ fontFamily: 'var(--font-syne)', fontSize: '48px' }}
        >
          NEXO
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
