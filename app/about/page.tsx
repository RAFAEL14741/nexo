'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageTransition } from '@/providers/TransitionProvider';
import WordReveal from '@/components/WordReveal';

const VALUES = [
  { n: '01', title: 'Free first', desc: 'We build before you pay. That is not normal — but it proves we believe in our work.' },
  { n: '02', title: 'Local focus', desc: 'We only work with businesses in Northeast Philadelphia. Tight scope means better results.' },
  { n: '03', title: 'No templates', desc: 'Every site is built from scratch for that business. No Squarespace. No Wix. No drag-and-drop.' },
  { n: '04', title: 'Plain talk', desc: 'We explain everything in plain English. No technical jargon, no hidden fees, no surprises.' },
];

export default function AboutPage() {
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
    <div style={{ minHeight: '100vh', paddingTop: '120px' }}>

      {/* Hero */}
      <section className="px-14 pb-32" style={{ background: '#080808' }}>
        <p className="text-[11px] tracking-[0.22em] text-[rgba(242,239,232,0.4)] uppercase mb-6">About</p>
        <h1
          className="text-[clamp(48px,8vw,110px)] font-black text-[#F2EFE8] leading-[0.88] tracking-[-0.04em] mb-12"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Built in NE Philly,
          <br />
          <span style={{ WebkitTextStroke: '2px rgba(242,239,232,0.25)', color: 'transparent' } as React.CSSProperties}>
            for NE Philly.
          </span>
        </h1>
        <p className="text-[16px] text-[rgba(242,239,232,0.55)] max-w-[560px] leading-relaxed">
          NEXO is a one-person web studio started by a 17-year-old from Abraham Lincoln High School. The whole model is built around one idea: you should see your site before you spend a cent.
        </p>
      </section>

      {/* Story */}
      <section className="px-14 py-32" style={{ background: '#F2EFE8' }}>
        <div className="flex flex-col md:flex-row gap-20 items-start">
          <div className="md:w-1/2">
            <WordReveal
              text="I started building demo sites for businesses I walked past every day."
              as="h2"
              className="text-[clamp(28px,4vw,52px)] font-black leading-[1.05] tracking-tight text-[#080808]"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-6">
            <p className="text-[15px] text-[rgba(8,8,8,0.6)] leading-relaxed fade-up">
              I grew up in Mayfair. My neighbors are restaurant owners, cleaners, contractors, and shop owners — all running real businesses on almost no web presence. They deserve the same quality websites as businesses in Center City.
            </p>
            <p className="text-[15px] text-[rgba(8,8,8,0.6)] leading-relaxed fade-up">
              So I started building demos. Free, unsolicited, showing them exactly what their business could look like online. The response was immediate — people wanted to pay for sites they could already see working.
            </p>
            <p className="text-[15px] text-[rgba(8,8,8,0.6)] leading-relaxed fade-up">
              That became NEXO. 14 demos built, counting. The goal is to become the go-to web studio for every block in Northeast Philadelphia.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-14 py-32" style={{ background: '#080808' }}>
        <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-16">What we stand for</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {VALUES.map(v => (
            <div key={v.n} className="flex flex-col gap-4 border border-[#1a1a1a] p-8 fade-up">
              <span className="text-[11px] text-[rgba(242,239,232,0.25)] tracking-wider">{v.n}</span>
              <h3
                className="text-[22px] font-black text-[#F2EFE8] leading-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {v.title}
              </h3>
              <p className="text-[13px] text-[rgba(242,239,232,0.5)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-14 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-[#1a1a1a]"
        style={{ background: '#080808' }}
      >
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-3">Ready?</p>
          <p
            className="text-[clamp(20px,3vw,40px)] font-black text-[#F2EFE8] leading-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Let&apos;s build your demo.
          </p>
        </div>
        <button
          onClick={() => goTo('/contact')}
          data-cursor="go"
          className="px-8 py-4 bg-[#C9F135] text-[#080808] text-[13px] font-bold tracking-wider uppercase hover:bg-[#d4f55a] transition-colors duration-200 shrink-0"
        >
          Get In Touch
        </button>
      </section>
    </div>
  );
}
