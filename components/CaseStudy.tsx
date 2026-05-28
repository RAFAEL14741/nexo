'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageTransition } from '@/providers/TransitionProvider';

interface CaseStudyProps {
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

export default function CaseStudy({
  tag, title, subtitle, accent, bg,
  overview, challenge, solution, results, tags,
}: CaseStudyProps) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('.cs-fade').forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
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

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="min-h-screen flex flex-col justify-end px-14 pb-24 pt-40"
        style={{ background: bg }}
      >
        <button
          onClick={() => startTransition(() => router.push('/work'))}
          className="self-start mb-16 text-[11px] tracking-[0.18em] uppercase bg-transparent border-none p-0"
          style={{ color: `${accent}99` }}
        >
          ← Back to work
        </button>

        <span
          className="text-[10px] tracking-[0.22em] uppercase block mb-4"
          style={{ color: accent }}
        >
          {tag}
        </span>
        <h1
          className="text-[clamp(48px,9vw,120px)] font-black leading-[0.88] tracking-[-0.04em] text-[#F2EFE8] mb-6"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {title}
        </h1>
        <p className="text-[16px] text-[rgba(242,239,232,0.5)] max-w-[480px] leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="px-14 py-24 flex flex-col gap-24" style={{ background: '#080808' }}>

        {/* Overview */}
        <div className="cs-fade">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-6" style={{ color: accent }}>Overview</p>
          <p className="text-[18px] text-[rgba(242,239,232,0.8)] leading-relaxed max-w-[700px]">{overview}</p>
        </div>

        {/* Challenge + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 cs-fade">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase mb-4 text-[rgba(242,239,232,0.4)]">The Challenge</p>
            <p className="text-[15px] text-[rgba(242,239,232,0.6)] leading-relaxed">{challenge}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase mb-4 text-[rgba(242,239,232,0.4)]">Our Solution</p>
            <p className="text-[15px] text-[rgba(242,239,232,0.6)] leading-relaxed">{solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="cs-fade">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-8" style={{ color: accent }}>Results</p>
          <div className="flex flex-col gap-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-[#1a1a1a] pb-4"
              >
                <span className="text-[20px] shrink-0 mt-0.5" style={{ color: accent }}>↗</span>
                <p className="text-[15px] text-[#F2EFE8]">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="cs-fade flex flex-wrap gap-3">
          {tags.map(t => (
            <span
              key={t}
              className="text-[11px] tracking-[0.16em] uppercase px-4 py-2 border"
              style={{ borderColor: `${accent}40`, color: accent }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Next project CTA */}
        <div className="cs-fade pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-3">Want something like this?</p>
            <p className="text-[20px] font-black text-[#F2EFE8]" style={{ fontFamily: 'var(--font-syne)' }}>
              Your demo is free. No commitment.
            </p>
          </div>
          <button
            onClick={() => startTransition(() => router.push('/contact'))}
            data-cursor="go"
            className="px-8 py-4 bg-[#C9F135] text-[#080808] text-[13px] font-bold tracking-wider uppercase hover:bg-[#d4f55a] transition-colors duration-200 shrink-0"
          >
            Get Your Free Demo
          </button>
        </div>
      </div>
    </div>
  );
}
