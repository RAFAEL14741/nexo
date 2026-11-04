'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function getLenis() { return lenisInstance; }
export function pauseLenis() { lenisInstance?.stop(); }
export function resumeLenis() { lenisInstance?.start(); }

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisInstance = lenis;

    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Pause Lenis during page transitions, resume after animation completes
  useEffect(() => {
    lenisInstance?.stop();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      lenisInstance?.start();
    }, 600);

    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [pathname]);

  return <>{children}</>;
}
