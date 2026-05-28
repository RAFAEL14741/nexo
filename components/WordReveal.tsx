'use client';

import { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
}

export default function WordReveal({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.06,
  triggerStart = 'top 85%',
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('.ww');

    gsap.set(words, { yPercent: 110, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger,
            delay,
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, triggerStart]);

  const wrapped = text.split(' ').map((word, i) => (
    <span
      key={i}
      style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
    >
      <span className="ww" style={{ display: 'inline-block' }}>
        {word}
        {i < text.split(' ').length - 1 ? ' ' : ''}
      </span>
    </span>
  ));

  const Component = Tag as 'div';
  return (
    <Component ref={containerRef as React.Ref<HTMLDivElement>} className={className}>
      {wrapped}
    </Component>
  );
}
