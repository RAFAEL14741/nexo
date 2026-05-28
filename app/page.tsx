'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageTransition } from '@/providers/TransitionProvider';
import WordReveal from '@/components/WordReveal';

const STATS = [
  { value: 14, suffix: '', label: 'Demos built' },
  { value: 48, suffix: 'h', label: 'Avg turnaround' },
  { value: 100, suffix: '%', label: 'Free to start' },
  { value: 0, suffix: '$', label: 'Upfront cost' },
];

const SERVICES = [
  { n: '01', title: 'Web Design', desc: 'Scroll-animated, mobile-first sites that convert visitors into customers.' },
  { n: '02', title: 'Booking Systems', desc: 'Appointments, payments, and staff management — all in one portal.' },
  { n: '03', title: 'Menu & Ordering', desc: 'Digital menus with WhatsApp or direct checkout built in.' },
  { n: '04', title: 'Admin Portals', desc: 'Track leads, invoices, and operations from a private dashboard.' },
];

const WORK_ITEMS = [
  { id: 'sa-sushi',           tag: 'Restaurant',       title: 'Sa Sushi',             accent: '#4ade80', bg: '#0a0f0a' },
  { id: 'lorenas-cleaning',   tag: 'Cleaning Service', title: "Lorena's Cleaning",     accent: '#60a5fa', bg: '#080d14' },
  { id: 'victors-supermarket', tag: 'Retail',          title: "Victor's Supermarket",  accent: '#fb923c', bg: '#0f0a06' },
  { id: 'fma-constructions',  tag: 'Construction',     title: 'FMA Constructions',     accent: '#a78bfa', bg: '#0a080f' },
];

const PROCESS_STEPS = [
  { n: '01', title: 'We find you', desc: 'We scout NE Philly businesses that deserve better online presence.' },
  { n: '02', title: 'Free demo', desc: 'We build your site — no charge. You see it live before any conversation.' },
  { n: '03', title: 'You decide', desc: 'Love it? Pay once. Keep it forever. No surprises.' },
  { n: '04', title: 'We maintain', desc: 'Optional monthly care: updates, hosting, new features.' },
];

const TESTIMONIALS = [
  { name: 'Lorena M.', biz: "Lorena's Cleaning LLC", text: "Rafael built us a full booking system and admin dashboard. We booked 3 new clients the first week." },
  { name: 'Sa Sushi', biz: 'Sa Sushi · Mayfair', text: "The menu site looks better than anything I've seen from local restaurants. Zero upfront — easy yes." },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (el) el.textContent = Math.round(obj.val) + suffix;
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function HomePage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const heroRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Hero char reveal */
    const chars = heroRef.current?.querySelectorAll<HTMLElement>('.ci');
    if (chars && chars.length) {
      gsap.set(chars, { yPercent: 110 });
      gsap.to(chars, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.03,
        delay: 0.2,
      });
    }

    /* Marquee infinite scroll */
    const mq = marqueeRef.current;
    if (mq) {
      gsap.to(mq, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    }

    /* Section divider line reveals */
    document.querySelectorAll<HTMLElement>('.section-line').forEach(line => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: line, start: 'top 90%', once: true },
        }
      );
    });

    /* Fade-up blocks */
    document.querySelectorAll<HTMLElement>('.fade-up').forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end px-14 pb-20 pt-40"
        style={{ background: '#080808' }}
      >
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.05 }}
            className="text-[11px] tracking-[0.22em] text-[rgba(242,239,232,0.45)] uppercase"
          >
            — WEB DESIGN · NORTHEAST PHILLY · EST. 2025
          </motion.p>
        </div>

        <h1
          className="text-[clamp(56px,10vw,140px)] font-black leading-[0.88] tracking-[-0.04em] mb-10"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          <span className="block overflow-hidden">
            {'Your business,'.split('').map((ch, i) => (
              <span key={i} className="ci inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}>
                {ch}
              </span>
            ))}
          </span>

          <span
            className="block overflow-hidden"
            style={{ WebkitTextStroke: '2px #F2EFE8', color: 'transparent' } as React.CSSProperties}
          >
            {'online today.'.split('').map((ch, i) => (
              <span key={i} className="ci inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}>
                {ch}
              </span>
            ))}
          </span>

          <span className="block overflow-hidden" style={{ color: '#C9F135' }}>
            {'Free.'.split('').map((ch, i) => (
              <span key={i} className="ci inline-block">{ch}</span>
            ))}
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-[15px] text-[rgba(242,239,232,0.55)] max-w-[420px] leading-relaxed"
          >
            We build your site first. You see it live.{' '}
            Pay only when you love it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-4"
          >
            <button
              onClick={() => goTo('/contact')}
              data-cursor="go"
              className="px-8 py-4 bg-[#C9F135] text-[#080808] text-[13px] font-bold tracking-wider uppercase hover:bg-[#d4f55a] transition-colors duration-200"
            >
              Get Free Demo
            </button>
            <button
              onClick={() => goTo('/work')}
              className="px-8 py-4 border border-[rgba(242,239,232,0.2)] text-[#F2EFE8] text-[13px] tracking-wider uppercase hover:border-[#F2EFE8] transition-colors duration-200"
            >
              See Work
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 right-14 text-[11px] text-[rgba(242,239,232,0.3)] tracking-widest uppercase"
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* ── RECOGNITION STRIP ────────────────────────────── */}
      <section className="border-y border-[#1a1a1a] py-6 px-14 flex flex-wrap items-center gap-8" style={{ background: '#080808' }}>
        {['NE Philadelphia', 'Mayfair', 'Bustleton', 'Rhawnhurst', 'Fox Chase', 'Holmesburg'].map(n => (
          <span key={n} className="text-[11px] text-[rgba(242,239,232,0.35)] tracking-[0.18em] uppercase">{n}</span>
        ))}
        <span className="ml-auto text-[11px] text-[rgba(242,239,232,0.2)] tracking-wider">Local · Fast · Premium</span>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-[#1a1a1a] py-5" style={{ background: '#080808' }}>
        <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
          {Array.from({ length: 2 }).flatMap((_, ri) =>
            ['Web Design', 'Free Demo', 'NE Philly', 'Admin Portal', 'Booking System', 'Local Business', 'Mobile First', 'No Upfront Cost'].map((t, i) => (
              <span key={`${ri}-${i}`} className="text-[13px] text-[rgba(242,239,232,0.25)] tracking-[0.18em] uppercase">
                {t} <span className="text-[#C9F135] mx-6">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="px-14 py-32" style={{ background: '#F2EFE8' }}>
        <div className="section-line h-px bg-[#080808] mb-16 origin-left" />
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/2">
            <p className="text-[11px] tracking-[0.2em] text-[rgba(8,8,8,0.4)] uppercase mb-6">About NEXO</p>
            <WordReveal
              text="We're a one-person web studio in Northeast Philadelphia — building sites for the businesses our neighbors run."
              as="h2"
              className="text-[clamp(28px,4vw,52px)] font-black leading-[1.05] tracking-tight text-[#080808]"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-6 mt-4">
            <p className="text-[15px] text-[rgba(8,8,8,0.6)] leading-relaxed fade-up">
              Most local businesses get cookie-cutter templates or $5,000 agencies. We sit in between — premium design, neighborhood prices, and you don&apos;t pay until you&apos;re happy.
            </p>
            <p className="text-[15px] text-[rgba(8,8,8,0.6)] leading-relaxed fade-up">
              We started by building demos for restaurants and cleaners on our block. Now we have 14 demos built across NE Philly, with more launching every month.
            </p>
            <button
              onClick={() => goTo('/about')}
              className="self-start text-[13px] font-medium text-[#080808] border-b border-[#080808] pb-0.5 hover:border-transparent transition-colors duration-200 bg-transparent mt-2 fade-up"
            >
              Our story →
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
        {STATS.map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center py-14 gap-2" style={{ background: '#080808' }}>
            <span
              className="text-[clamp(40px,5vw,72px)] font-black text-[#F2EFE8] tabular-nums leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              <CountUp target={s.value} suffix={s.suffix} />
            </span>
            <span className="text-[11px] text-[rgba(242,239,232,0.4)] tracking-[0.16em] uppercase">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="px-14 py-32" style={{ background: '#080808' }}>
        <div className="section-line h-px bg-[#1a1a1a] mb-16 origin-left" />
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase">What we build</p>
          <button
            onClick={() => goTo('/services')}
            className="text-[13px] text-[rgba(242,239,232,0.5)] hover:text-[#F2EFE8] transition-colors duration-200 bg-transparent border-none"
          >
            All services →
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[#1a1a1a]">
          {SERVICES.map(s => (
            <div
              key={s.n}
              className="flex flex-col md:flex-row gap-6 py-10 fade-up group hover:bg-[rgba(242,239,232,0.02)] transition-colors duration-300 -mx-14 px-14"
            >
              <span className="text-[11px] text-[rgba(242,239,232,0.3)] tracking-wider mt-1 md:w-12">{s.n}</span>
              <h3
                className="text-[clamp(22px,3vw,36px)] font-black text-[#F2EFE8] md:w-80 leading-tight group-hover:text-[#C9F135] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {s.title}
              </h3>
              <p className="text-[14px] text-[rgba(242,239,232,0.5)] leading-relaxed md:max-w-[400px] md:ml-auto mt-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK PREVIEW ─────────────────────────────────── */}
      <section className="px-14 py-32" style={{ background: '#0d0d0d' }}>
        <div className="section-line h-px bg-[#1a1a1a] mb-16 origin-left" />
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-3">Selected work</p>
            <h2
              className="text-[clamp(32px,5vw,64px)] font-black text-[#F2EFE8] leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              14 demos.{' '}
              <span style={{ WebkitTextStroke: '1.5px rgba(242,239,232,0.3)', color: 'transparent' } as React.CSSProperties}>
                All free to start.
              </span>
            </h2>
          </div>
          <button
            onClick={() => goTo('/work')}
            data-cursor="go"
            className="self-end text-[13px] text-[rgba(242,239,232,0.5)] hover:text-[#F2EFE8] transition-colors duration-200 bg-transparent border-none"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORK_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => goTo(`/work/${item.id}`)}
              data-cursor="view"
              className="group relative overflow-hidden text-left border border-[#1a1a1a] fade-up"
              style={{ background: item.bg, aspectRatio: '4/3' }}
            >
              <div
                className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500"
                style={{ background: item.accent }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: item.accent }}>
                  {item.tag}
                </span>
                <h3
                  className="text-[clamp(24px,3vw,40px)] font-black text-[#F2EFE8] leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {item.title}
                </h3>
              </div>
              <div
                className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: item.accent }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="px-14 py-32" style={{ background: '#F2EFE8' }}>
        <div className="section-line h-px bg-[#080808] mb-16 origin-left" />
        <p className="text-[11px] tracking-[0.2em] text-[rgba(8,8,8,0.4)] uppercase mb-16">How it works</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {PROCESS_STEPS.map(step => (
            <div key={step.n} className="flex flex-col gap-4 fade-up">
              <span className="text-[11px] text-[rgba(8,8,8,0.35)] tracking-wider">{step.n}</span>
              <div className="h-px bg-[rgba(8,8,8,0.15)]" />
              <h3 className="text-[20px] font-black text-[#080808] leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.title}
              </h3>
              <p className="text-[13px] text-[rgba(8,8,8,0.55)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="px-14 py-32" style={{ background: '#080808' }}>
        <div className="section-line h-px bg-[#1a1a1a] mb-16 origin-left" />
        <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-16">From the neighborhood</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="border border-[#1a1a1a] p-10 flex flex-col gap-6 fade-up hover:border-[#2a2a2a] transition-colors duration-300"
            >
              <p className="text-[16px] text-[rgba(242,239,232,0.8)] leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-auto pt-4 border-t border-[#1a1a1a]">
                <p className="text-[13px] font-bold text-[#F2EFE8]">{t.name}</p>
                <p className="text-[11px] text-[rgba(242,239,232,0.4)] tracking-wider">{t.biz}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section
        className="px-14 py-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        style={{ background: '#C9F135' }}
      >
        <h2
          className="text-[clamp(36px,6vw,80px)] font-black text-[#080808] leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Ready to see your site?
        </h2>
        <div className="flex flex-col gap-4">
          <p className="text-[14px] text-[rgba(8,8,8,0.6)] max-w-[280px] leading-relaxed">
            We&apos;ll build your demo in 48 hours. No card. No contract. No risk.
          </p>
          <button
            onClick={() => goTo('/contact')}
            data-cursor="go"
            className="self-start px-8 py-4 bg-[#080808] text-[#F2EFE8] text-[13px] font-bold tracking-wider uppercase hover:bg-[#1a1a1a] transition-colors duration-200"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* ── CONTACT PREVIEW ──────────────────────────────── */}
      <section
        className="px-14 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-[#1a1a1a]"
        style={{ background: '#080808' }}
      >
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[rgba(242,239,232,0.4)] uppercase mb-3">Get in touch</p>
          <a
            href="mailto:hello@nexo.agency"
            className="text-[clamp(20px,3vw,36px)] font-black text-[#F2EFE8] hover:text-[#C9F135] transition-colors duration-300 no-underline"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            hello@nexo.agency
          </a>
        </div>
        <button
          onClick={() => goTo('/contact')}
          className="text-[13px] text-[rgba(242,239,232,0.5)] hover:text-[#F2EFE8] transition-colors duration-200 bg-transparent border-none"
        >
          Full contact form →
        </button>
      </section>
    </>
  );
}
