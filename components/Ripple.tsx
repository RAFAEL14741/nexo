'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Ripple() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const r = document.createElement('div');
      r.style.cssText = `
        position:fixed;
        pointer-events:none;
        z-index:99988;
        width:40px;
        height:40px;
        border-radius:50%;
        border:1px solid rgba(255,255,255,0.3);
        left:${e.clientX - 20}px;
        top:${e.clientY - 20}px;
        will-change:transform,opacity;
      `;
      document.body.appendChild(r);
      gsap.fromTo(
        r,
        { scale: 0, opacity: 1 },
        {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => r.remove(),
        }
      );
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
}
