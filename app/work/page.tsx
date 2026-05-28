'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageTransition } from '@/providers/TransitionProvider';

const PROJECTS = [
  {
    id: 'sa-sushi',
    tag: 'Restaurant',
    title: 'Sa Sushi',
    desc: 'Full restaurant site with dark theme, Uber Eats-style menu, online ordering integration, and mobile-first layout.',
    accent: '#4ade80',
    bg: '#0a0f0a',
    tags: ['Restaurant', 'Menu', 'Mobile', 'Dark Theme'],
  },
  {
    id: 'lorenas-cleaning',
    tag: 'Cleaning Service',
    title: "Lorena's Cleaning",
    desc: 'Service business portal with booking system, Stripe payments, client login, and admin dashboard for team management.',
    accent: '#60a5fa',
    bg: '#080d14',
    tags: ['Cleaning', 'Portal', 'Stripe', 'Admin Dashboard'],
  },
  {
    id: 'victors-supermarket',
    tag: 'Retail',
    title: "Victor's Supermarket",
    desc: 'Retail site with WhatsApp ordering system, PC America POS integration, weekly deals section, and Instagram feed sync.',
    accent: '#fb923c',
    bg: '#0f0a06',
    tags: ['Retail', 'WhatsApp', 'POS Integration', 'Admin'],
  },
  {
    id: 'fma-constructions',
    tag: 'Construction',
    title: 'FMA Constructions',
    desc: 'Business site for kitchen, bath, and flooring contractor — service pages, lead capture form, and gallery.',
    accent: '#a78bfa',
    bg: '#0a080f',
    tags: ['Construction', 'Services', 'SEO', 'Lead Generation'],
  },
];

export default function WorkPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('.fade-up').forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: '120px' }}>
      {/* Header */}
      <div className="px-14 pb-24 border-b border-[#1a1a1a]">
        <p className="text-[11px] tracking-[0.22em] text-[rgba(242,239,232,0.4)] uppercase mb-6">Selected work</p>
        <h1
          className="text-[clamp(48px,8vw,110px)] font-black text-[#F2EFE8] leading-[0.88] tracking-[-0.04em]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Our work.{' '}
          <span style={{ WebkitTextStroke: '2px rgba(242,239,232,0.25)', color: 'transparent' } as React.CSSProperties}>
            All free demos.
          </span>
        </h1>
        <p className="mt-8 text-[15px] text-[rgba(242,239,232,0.5)] max-w-[480px] leading-relaxed">
          Every project below started as a free demo. We built it first — the business owner saw it live before any contract.
        </p>
      </div>

      {/* Project list */}
      <div className="flex flex-col">
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(`/work/${p.id}`)}
            data-cursor="view"
            className="group border-b border-[#1a1a1a] px-14 py-12 flex flex-col md:flex-row gap-8 items-start md:items-center text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300 fade-up"
          >
            {/* Number */}
            <span className="text-[11px] text-[rgba(242,239,232,0.25)] tracking-wider md:w-12 shrink-0">
              0{i + 1}
            </span>

            {/* Tag + Title */}
            <div className="flex-1">
              <span
                className="text-[10px] tracking-[0.2em] uppercase block mb-2"
                style={{ color: p.accent }}
              >
                {p.tag}
              </span>
              <h2
                className="text-[clamp(24px,4vw,52px)] font-black text-[#F2EFE8] leading-tight tracking-tight group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {p.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[rgba(242,239,232,0.45)] leading-relaxed md:max-w-[360px] md:text-right">
              {p.desc}
            </p>

            {/* Arrow */}
            <span
              className="text-[20px] shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
              style={{ color: p.accent }}
            >
              →
            </span>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="px-14 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-3">Your business next?</p>
          <p className="text-[20px] font-black text-[#F2EFE8]" style={{ fontFamily: 'var(--font-syne)' }}>
            We&apos;re building demos for NE Philly businesses every week.
          </p>
        </div>
        <button
          onClick={() => goTo('/contact')}
          data-cursor="go"
          className="px-8 py-4 bg-[#C9F135] text-[#080808] text-[13px] font-bold tracking-wider uppercase hover:bg-[#d4f55a] transition-colors duration-200 shrink-0"
        >
          Get Your Free Demo
        </button>
      </div>
    </div>
  );
}
