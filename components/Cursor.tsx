'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorMode = 'default' | 'hover' | 'view' | 'go';

export default function Cursor() {
  const curRef   = useRef<HTMLDivElement>(null);
  const txtRef   = useRef<HTMLSpanElement>(null);
  const txRef    = useRef(-100);
  const tyRef    = useRef(-100);
  const cxRef    = useRef(-100);
  const cyRef    = useRef(-100);
  const [mode, setMode] = useState<CursorMode>('default');
  const modeRef  = useRef<CursorMode>('default');
  const [text, setText] = useState('');

  useEffect(() => {
    const cur  = curRef.current;
    const txt  = txtRef.current;
    if (!cur || !txt) return;

    /* Smooth following via GSAP ticker */
    const tick = () => {
      cxRef.current += (txRef.current - cxRef.current) * 0.12;
      cyRef.current += (tyRef.current - cyRef.current) * 0.12;
      gsap.set(cur, { x: cxRef.current - 16, y: cyRef.current - 16 });
    };
    gsap.ticker.add(tick);

    const onMove = (e: MouseEvent) => {
      txRef.current = e.clientX;
      tyRef.current = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    /* Cursor state helpers */
    const setCursorMode = (m: CursorMode, label = '') => {
      if (modeRef.current === m) return;
      modeRef.current = m;
      setMode(m);
      setText(label);

      gsap.killTweensOf(cur);
      gsap.killTweensOf(txt);

      switch (m) {
        case 'view':
          gsap.to(cur, { scale: 3,   duration: 0.3, ease: 'power2.out' });
          gsap.to(txt, { opacity: 1, duration: 0.15 });
          break;
        case 'go':
          gsap.to(cur, { scale: 2,   duration: 0.3, ease: 'power2.out' });
          gsap.to(txt, { opacity: 1, duration: 0.15 });
          break;
        case 'hover':
          gsap.to(cur, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
          gsap.to(txt, { opacity: 0, duration: 0.1 });
          break;
        default:
          gsap.to(cur, { scale: 1,   duration: 0.3, ease: 'power2.out' });
          gsap.to(txt, { opacity: 0, duration: 0.1 });
      }
    };
    const resetCursor = () => setCursorMode('default');

    /* Wire up hover targets */
    const wireHover = (sel: string, m: CursorMode, label = '') => {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        el.addEventListener('mouseenter', () => setCursorMode(m, label));
        el.addEventListener('mouseleave', resetCursor);
      });
    };

    /* Use MutationObserver so dynamically added elements get wired too */
    const wire = () => {
      wireHover('a:not([data-cursor-wired])', 'hover');
      wireHover('button:not([data-cursor-wired])', 'hover');
      wireHover('input, select, textarea', 'hover');
      wireHover('[data-cursor="view"]', 'view', 'VIEW');
      wireHover('[data-cursor="go"]', 'go', 'GO');
      /* Mark elements as wired */
      document.querySelectorAll('a, button').forEach(el =>
        el.setAttribute('data-cursor-wired', '1')
      );
    };

    wire();

    const observer = new MutationObserver(wire);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  /* Visible only on desktop (hidden via CSS on mobile) */
  return (
    <div
      ref={curRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1.5px solid white',
        background:
          mode === 'hover' || mode === 'view' || mode === 'go'
            ? mode === 'hover'
              ? 'white'
              : 'rgba(12,12,12,0.92)'
            : 'transparent',
        borderColor:
          mode === 'view' || mode === 'go'
            ? 'rgba(255,255,255,0.12)'
            : 'white',
        mixBlendMode: mode === 'view' || mode === 'go' ? 'normal' : 'difference',
        willChange: 'transform',
        transition: 'background 0.15s, border-color 0.15s, mix-blend-mode 0s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        ref={txtRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-syne)',
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: 'white',
          opacity: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
    </div>
  );
}
