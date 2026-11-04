'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
} from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import Footer from '@/components/Footer';
import { usePageTransition } from '@/providers/TransitionProvider';
import { slideInLeft, staggerContainer } from '@/lib/animations';

const STATS = [
  { value: 14, label: 'Demos built', fmt: (v: number) => `${v}` },
  { value: 48, label: 'Avg turnaround', fmt: (v: number) => `${v}h` },
  { value: 100, label: 'Free to start', fmt: (v: number) => `${v}%` },
  { value: 0, label: 'Upfront cost', fmt: (v: number) => `$${v}` },
];

const SERVICES = [
  {
    n: '01',
    title: 'Web Design',
    desc: 'Scroll-animated, mobile-first sites that load fast and look premium.',
    features: ['Custom animations', 'Mobile-first', 'PageSpeed 90+', 'SEO optimized'],
  },
  {
    n: '02',
    title: 'Booking Systems',
    desc: 'Appointments, Stripe payments, and staff management in one portal.',
    features: ['Stripe payments', 'Email confirmations', 'Admin dashboard'],
  },
  {
    n: '03',
    title: 'Menu & Ordering',
    desc: 'Digital menus with WhatsApp or direct checkout. No app download.',
    features: ['WhatsApp checkout', 'Category filters', 'No install needed'],
  },
  {
    n: '04',
    title: 'Admin Portals',
    desc: 'Track leads, invoices, and operations from a private dashboard.',
    features: ['Lead tracking', 'Invoice management', 'Real-time data'],
  },
];

const WORK_ITEMS = [
  {
    id: 'sa-sushi',
    tag: 'Restaurant',
    title: 'Sa Sushi',
    accent: '#4ade80',
    bg: 'linear-gradient(135deg, #0d2010 0%, #1a3a1e 100%)',
  },
  {
    id: 'lorenas-cleaning',
    tag: 'Cleaning Service',
    title: "Lorena's Cleaning",
    accent: '#60a5fa',
    bg: 'linear-gradient(135deg, #0d1a2e 0%, #1a2d4a 100%)',
  },
  {
    id: 'victors-supermarket',
    tag: 'Retail',
    title: "Victor's Supermarket",
    accent: '#fb923c',
    bg: 'linear-gradient(135deg, #2e1a00 0%, #4a2e00 100%)',
  },
  {
    id: 'fma-constructions',
    tag: 'Construction',
    title: 'FMA Constructions',
    accent: '#a78bfa',
    bg: 'linear-gradient(135deg, #1a0d2e 0%, #2e1a4a 100%)',
  },
];

const LIVE_DEMOS = [
  {
    tag: 'Restaurant',
    name: 'China City',
    desc: 'Full menu, WhatsApp ordering, mobile-first',
    url: 'https://rafael14741.github.io/demos/china-city-demo.html',
  },
  {
    tag: 'Barbershop',
    name: "JD's Barber Shop",
    desc: 'Booking system, services, admin portal',
    url: 'https://rafael14741.github.io/demos/jds-barber-demo.html',
  },
  {
    tag: 'Nail Salon',
    name: 'French Nails',
    desc: 'Gallery, pricing, full booking flow',
    url: 'https://rafael14741.github.io/demos/french-nails-demo.html',
  },
];

const PROCESS_STEPS = [
  { n: '01', title: 'We find you', desc: 'We scout NE Philly businesses that deserve better online presence.' },
  { n: '02', title: 'Free demo', desc: 'We build your site — no charge. You see it live before any conversation.' },
  { n: '03', title: 'You decide', desc: 'Love it? Pay once. Keep it forever. No surprises.' },
  { n: '04', title: 'We maintain', desc: 'Optional monthly care: updates, hosting, and new features.' },
];

const TESTIMONIALS = [
  {
    name: 'Lorena M.',
    biz: "Lorena's Cleaning LLC",
    text: 'Rafael built us a full booking system and admin dashboard. We booked 3 new clients the first week it went live.',
  },
  {
    name: 'Owner',
    biz: 'Sa Sushi · Mayfair',
    text: 'The menu site looks better than anything I\'ve seen from local restaurants. Zero upfront — easy yes.',
  },
  {
    name: 'Victor',
    biz: "Victor's Supermarket",
    text: 'We went from a dead Facebook page to a real website with ordering in 48 hours. Couldn\'t believe it was free to try.',
  },
];

function AnimatedStat({ value, label, fmt }: { value: number; label: string; fmt: (v: number) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ textAlign: 'center', padding: '24px 16px' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: 1,
          color: '#080808',
          letterSpacing: '-0.03em',
        }}
      >
        {fmt(display)}
      </p>
      <p
        style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(8,8,8,0.4)',
          marginTop: 10,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function ServiceRow({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      style={{
        borderBottom: '1px solid #1a1a1a',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      animate={{ backgroundColor: open ? '#0c0c0c' : '#080808' }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 56px 28px 0',
        }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 11,
              color: 'rgba(242,239,232,0.2)',
              letterSpacing: '0.1em',
              width: 32,
              flexShrink: 0,
            }}
          >
            {s.n}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3vw, 40px)',
              color: '#F2EFE8',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {s.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontSize: 24,
            color: '#C9F135',
            lineHeight: 1,
            display: 'inline-block',
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 56px 28px 56px' }}>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(242,239,232,0.5)',
                  lineHeight: 1.7,
                  maxWidth: 400,
                  marginBottom: 16,
                }}
              >
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.features.map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      border: '1px solid rgba(242,239,232,0.15)',
                      borderRadius: 999,
                      color: 'rgba(242,239,232,0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WorkCard({
  item,
  index,
  onNavigate,
}: {
  item: typeof WORK_ITEMS[0];
  index: number;
  onNavigate: (href: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: index * 0.06 }}
      layoutId={`card-${item.id}`}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -8, scale: 1.02, transition: { type: 'spring', damping: 20, stiffness: 200 } },
        }}
        style={{
          position: 'relative',
          background: item.bg,
          borderRadius: 2,
          overflow: 'hidden',
          aspectRatio: '16/9',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate(`/work/${item.id}`)}
        data-cursor="view"
      >
        {/* Overlay */}
        <motion.div
          variants={{
            rest: { y: '100%' },
            hover: { y: '0%' },
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8,8,8,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F2EFE8',
            }}
          >
            View Case Study{' '}
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 6 } }}
              transition={{ duration: 0.25 }}
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </span>
        </motion.div>

        {/* Tag + title inside card */}
        <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: item.accent,
              display: 'block',
              marginBottom: 6,
            }}
          >
            {item.tag}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#F2EFE8',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {item.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DemoCard({ demo, index }: { demo: typeof LIVE_DEMOS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <motion.a
      ref={ref}
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
      whileHover={{ y: -6, borderColor: '#C9F135' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#0f0f0f',
        border: '1px solid #1a1a1a',
        padding: '32px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C9F135',
          marginBottom: 24,
        }}
      >
        {demo.tag}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 28,
          color: '#F2EFE8',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: 10,
        }}
      >
        {demo.name}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: 'rgba(242,239,232,0.5)',
          lineHeight: 1.6,
          marginBottom: 32,
        }}
      >
        {demo.desc}
      </p>

      <span
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 24px',
          background: '#C9F135',
          color: '#080808',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          alignSelf: 'flex-start',
        }}
      >
        Try the demo →
      </span>
    </motion.a>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <PageTransition>
      {/* ───── HERO ───── */}
      <section
        style={{
          background: '#080808',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          padding: '0 56px 80px',
        }}
      >
        {/* Perspective grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.03,
            backgroundImage:
              'linear-gradient(to right, #F2EFE8 1px, transparent 1px), linear-gradient(to bottom, #F2EFE8 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            transform: 'perspective(600px) rotateX(18deg)',
            transformOrigin: 'center bottom',
          }}
        />

        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', paddingTop: 160 }}>
          <AnimatedText
            text="— WEB DESIGN · NORTHEAST PHILLY · EST. 2025"
            delay={0.2}
            className="text-[10px] tracking-[0.22em] uppercase text-[rgba(242,239,232,0.35)] mb-10"
          />

          <div
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(56px,9vw,130px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              marginBottom: 40,
            }}
          >
            <AnimatedText
              text="Your business,"
              delay={0}
              className="text-[#F2EFE8] block"
            />
            <AnimatedText
              text="online today."
              delay={0.15}
              className="block"
              style={{
                color: 'transparent',
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                WebkitTextStroke: '3px rgba(242,239,232,0.85)',
              } as React.CSSProperties}
            />
            <AnimatedText
              text="Free."
              delay={0.3}
              className="text-[#C9F135] block"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontSize: 15,
              color: 'rgba(242,239,232,0.45)',
              lineHeight: 1.75,
              maxWidth: 380,
              marginBottom: 48,
            }}
          >
            We build your demo before you pay a cent.
            <br />
            Most clients are live within 7 days.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ scale: 1.03, backgroundColor: '#d4f55a' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => goTo('/contact')}
              data-cursor="go"
              style={{
                padding: '15px 32px',
                background: '#C9F135',
                color: '#080808',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Get a free demo →
            </motion.button>

            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ color: '#F2EFE8' }}
              onClick={() => goTo('/work')}
              style={{
                padding: '15px 32px',
                background: 'transparent',
                color: 'rgba(242,239,232,0.5)',
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid #1a1a1a',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              See our work
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,232,0.2)',
              writingMode: 'vertical-rl',
            }}
          >
            scroll
          </span>
          <div
            style={{ width: 1, height: 40, background: 'rgba(242,239,232,0.15)' }}
          />
        </motion.div>
      </section>

      {/* ───── RECOGNITION STRIP ───── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: '#050505',
          borderTop: '1px solid #111',
          borderBottom: '1px solid #111',
          padding: '14px 0',
          overflow: 'hidden',
        }}
      >
        <div className="mq-wrap" style={{ overflow: 'hidden' }}>
          <div className="mq-track">
            {[...Array(2)].map((_, r) => (
              <span key={r} style={{ display: 'flex', gap: 48, alignItems: 'center', paddingRight: 48 }}>
                {[
                  'NE Philadelphia',
                  '14 Demos Built',
                  'Free to Start',
                  'Pay When You Love It',
                  'Live in 48 Hours',
                  'Websites That Convert',
                  'No Templates',
                  'Built for Local',
                ].map(t => (
                  <span
                    key={t}
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,239,232,0.2)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── ABOUT ───── */}
      <section style={{ background: '#F2EFE8', padding: '120px 56px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(80px,10vw,150px)',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(8,8,8,0.5)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              LOCAL
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
              }}
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(8,8,8,0.4)',
                marginBottom: 24,
              }}
            >
              Who we are
            </motion.p>
            {[
              'We\'re NEXO — a web design studio based in Northeast Philadelphia.',
              'We work with local businesses: restaurants, salons, cleaners, contractors. People who\'ve been running on word-of-mouth and a dead Facebook page.',
              'We build your demo first. You see it live, working, with your brand. Then you decide.',
            ].map((t, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 } },
                }}
                style={{
                  fontSize: 16,
                  color: 'rgba(8,8,8,0.7)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section style={{ background: '#F2EFE8', borderTop: '1px solid rgba(8,8,8,0.08)', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(8,8,8,0.35)',
                marginBottom: 56,
              }}
            >
              By the numbers
            </p>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 0,
              borderTop: '1px solid rgba(8,8,8,0.08)',
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(8,8,8,0.08)' : 'none',
                }}
              >
                <AnimatedStat {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section style={{ background: '#080808', padding: '120px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 56px' }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,232,0.3)',
                marginBottom: 12,
              }}
            >
              What we build
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div style={{ marginBottom: 56 }}>
              <AnimatedText
                text="Services"
                className="text-[#F2EFE8] font-black"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 'clamp(40px,6vw,80px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                } as React.CSSProperties}
              />
            </div>
          </ScrollReveal>

          <div style={{ borderTop: '1px solid #1a1a1a' }}>
            {SERVICES.map((s, i) => (
              <ServiceRow key={s.n} s={s} index={i} />
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'flex-end' }}>
              <motion.button
                onClick={() => goTo('/services')}
                whileHover={{ color: '#C9F135' }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,239,232,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.2s',
                }}
              >
                View all services
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── WORK PREVIEW ───── */}
      <section style={{ background: '#080808', padding: '0 56px 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,232,0.3)',
                marginBottom: 48,
              }}
            >
              Selected work
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {WORK_ITEMS.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} onNavigate={goTo} />
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <motion.button
                onClick={() => goTo('/work')}
                whileHover={{ color: '#C9F135' }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,239,232,0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.2s',
                }}
              >
                View all work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── TRY IT YOURSELF ───── */}
      <section style={{ background: '#080808', padding: '120px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,232,0.3)',
                marginBottom: 12,
              }}
            >
              Live demos
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div style={{ marginBottom: 20 }}>
              <AnimatedText
                text="Try it yourself."
                className="text-[#F2EFE8] font-black"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 'clamp(40px,6vw,80px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                } as React.CSSProperties}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              style={{
                fontSize: 15,
                color: 'rgba(242,239,232,0.45)',
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 56,
              }}
            >
              These are real sites we built for NE Philly businesses. Click in — use them on your phone. This is exactly what your customers would see.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              marginBottom: 48,
            }}
          >
            {LIVE_DEMOS.map((demo, i) => (
              <DemoCard key={demo.name} demo={demo} index={i} />
            ))}
          </div>

          <ScrollReveal>
            <p
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: 'rgba(242,239,232,0.35)',
                lineHeight: 1.6,
              }}
            >
              All of these are real demo sites built for real NE Philly businesses. Yours could be next.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section style={{ background: '#F2EFE8', padding: '120px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal margin="-50px">
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(8,8,8,0.35)',
                marginBottom: 64,
              }}
            >
              How it works
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 40,
            }}
          >
            {PROCESS_STEPS.map((step, i) => {
              return (
                <ScrollReveal key={step.n} delay={i * 0.1} margin="-50px">
                  <div>
                    <div style={{ position: 'relative', marginBottom: 20 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-syne)',
                          fontWeight: 800,
                          fontSize: 56,
                          color: 'transparent',
                          WebkitTextStroke: '1px rgba(8,8,8,0.12)',
                          lineHeight: 1,
                          display: 'block',
                        }}
                      >
                        {step.n}
                      </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                        style={{
                          fontFamily: 'var(--font-syne)',
                          fontWeight: 800,
                          fontSize: 56,
                          color: '#C9F135',
                          lineHeight: 1,
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      >
                        {step.n}
                      </motion.span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        fontSize: 20,
                        color: '#080808',
                        marginBottom: 10,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'rgba(8,8,8,0.55)', lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section style={{ background: '#080808', padding: '120px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal margin="-50px">
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,232,0.3)',
                marginBottom: 64,
              }}
            >
              What clients say
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
                whileHover={{ y: -4, borderColor: '#2a2a2a' }}
                style={{
                  border: '1px solid #1a1a1a',
                  padding: '32px',
                  cursor: 'default',
                  transition: 'border-color 0.3s',
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: 'rgba(242,239,232,0.7)',
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#F2EFE8',
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(242,239,232,0.3)', marginTop: 2 }}>
                    {t.biz}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section
        style={{
          background: '#C9F135',
          padding: '100px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(32px,5vw,72px)',
              color: '#080808',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              width: '100%',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            Start with a free demo.
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(8,8,8,0.55)',
              maxWidth: 380,
              lineHeight: 1.6,
            }}
          >
            No contract. No invoice. No hard feelings if you walk away.
          </p>

          <button
            onClick={() => goTo('/contact')}
            data-cursor="go"
            style={{
              padding: '18px 40px',
              background: '#080808',
              color: '#F2EFE8',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get Started →
          </button>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}
