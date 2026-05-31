'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
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
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  },
  {
    n: '02',
    title: 'Booking Systems',
    desc: 'Appointments, Stripe payments, and staff management in one portal.',
    features: ['Stripe payments', 'Email confirmations', 'Admin dashboard'],
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  },
  {
    n: '03',
    title: 'Menu & Ordering',
    desc: 'Digital menus with WhatsApp or direct checkout. No app download.',
    features: ['WhatsApp checkout', 'Category filters', 'No install needed'],
    img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80',
  },
  {
    n: '04',
    title: 'Admin Portals',
    desc: 'Track leads, invoices, and operations from a private dashboard.',
    features: ['Lead tracking', 'Invoice management', 'Real-time data'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
];

const WORK_ITEMS = [
  {
    id: 'sa-sushi',
    tag: 'Restaurant',
    title: 'Sa Sushi',
    accent: '#4ade80',
    bg: 'linear-gradient(135deg, #0a0f0a 0%, #0f1a10 100%)',
    img: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=900&q=80',
  },
  {
    id: 'lorenas-cleaning',
    tag: 'Cleaning Service',
    title: "Lorena's Cleaning",
    accent: '#60a5fa',
    bg: 'linear-gradient(135deg, #080d14 0%, #0c1420 100%)',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80',
  },
  {
    id: 'victors-supermarket',
    tag: 'Supermarket',
    title: "Victor's Supermarket",
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #0f0d00 0%, #1a1500 100%)',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80',
  },
  {
    id: 'fma-constructions',
    tag: 'Construction',
    title: 'FMA Constructions',
    accent: '#f97316',
    bg: 'linear-gradient(135deg, #100a00 0%, #1a1000 100%)',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
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

function MagneticButton({
  children,
  onClick,
  style,
  'data-cursor': dataCursor,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  'data-cursor'?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 150 });
  const sy = useSpring(y, { damping: 15, stiffness: 150 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      style={{ ...style, x: sx, y: sy }}
    >
      {children}
    </motion.button>
  );
}

function AnimatedStat({ value, label, fmt, index = 0, row = false }: {
  value: number; label: string; fmt: (v: number) => string; index?: number; row?: boolean;
}) {
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

  if (row) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1a1a1a',
          padding: '40px 0',
        }}
      >
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(64px, 10vw, 120px)', lineHeight: 1, color: '#F2EFE8', letterSpacing: '-0.04em' }}>
          {fmt(display)}
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,239,232,0.3)' }}>
          {label}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ textAlign: 'center', padding: '24px 16px' }}
    >
      <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1, color: '#080808', letterSpacing: '-0.03em' }}>
        {fmt(display)}
      </p>
      <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.4)', marginTop: 10 }}>
        {label}
      </p>
    </motion.div>
  );
}

function ServiceRow({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => { setOpen(true); setHovered(true); }}
      onHoverEnd={() => { setOpen(false); setHovered(false); }}
      style={{
        borderBottom: '1px solid #1a1a1a',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
      animate={{ backgroundColor: open ? '#0c0c0c' : '#080808' }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover image preview */}
      <AnimatePresence>
        {hovered && s.img && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 20 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              right: 80,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 180,
              height: 120,
              overflow: 'hidden',
              borderRadius: 2,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        )}
      </AnimatePresence>
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
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: index * 0.12 }}
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
        {/* Real photo */}
        {item.img && (
          <img
            src={item.img}
            alt={item.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
          />
        )}
        {/* Dark scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.55)' }} />
        {/* Hover overlay */}
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
            opacity: 0.07,
            backgroundImage:
              'linear-gradient(to right, #F2EFE8 1px, transparent 1px), linear-gradient(to bottom, #F2EFE8 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            transform: 'perspective(600px) rotateX(18deg)',
            transformOrigin: 'center bottom',
          }}
        />
        {/* Browser mockup — right side visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="hidden lg:block"
          style={{
            position: 'absolute',
            right: 56,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(300px, 33vw, 500px)',
            background: '#111',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
            zIndex: 2,
          }}
        >
          {/* Chrome bar */}
          <div style={{ background: '#1c1c1c', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>nexo.studio/lorenas-cleaning</span>
            </div>
          </div>
          {/* Simulated site */}
          <div style={{ background: '#060e18' }}>
            <div style={{ height: 170, background: 'linear-gradient(135deg, #060e18 0%, #0a1628 100%)', display: 'flex', alignItems: 'flex-end', padding: '20px 20px' }}>
              <div>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#60a5fa60', textTransform: 'uppercase', marginBottom: 8 }}>CLEANING SERVICE · NE PHILLY</div>
                <div style={{ height: 18, width: '75%', background: 'rgba(255,255,255,0.88)', borderRadius: 2, marginBottom: 6 }} />
                <div style={{ height: 12, width: '55%', background: 'rgba(255,255,255,0.35)', borderRadius: 2, marginBottom: 16 }} />
                <div style={{ height: 28, width: 100, background: '#60a5fa', borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8, background: '#08111e' }}>
              {[75,55,65,45].map((w,i) => <div key={i} style={{ height: 7, width: `${w}%`, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />)}
            </div>
            {/* Second project preview strip */}
            <div style={{ height: 2, background: '#1a1a1a' }} />
            <div style={{ height: 100, background: 'linear-gradient(135deg, #0a0f0a 0%, #0f1a10 100%)', display: 'flex', alignItems: 'flex-end', padding: '14px 20px' }}>
              <div>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#4ade8060', textTransform: 'uppercase', marginBottom: 6 }}>RESTAURANT · MAYFAIR</div>
                <div style={{ height: 14, width: '60%', background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ghost watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: '-5%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(180px, 22vw, 320px)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(242,239,232,0.06)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          NEXO
        </div>

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
              style={{ color: 'transparent', WebkitTextStroke: '2px rgba(242,239,232,0.55)' } as React.CSSProperties}
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
            <MagneticButton
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
                display: 'inline-block',
              }}
            >
              Get a free demo →
            </MagneticButton>

            <MagneticButton
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
                display: 'inline-block',
              }}
            >
              See our work
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '38%',
            right: 80,
            padding: '10px 18px',
            borderRadius: 999,
            background: 'rgba(242,239,232,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(242,239,232,0.1)',
            fontSize: 11,
            color: 'rgba(242,239,232,0.55)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            display: 'none',
          }}
          className="hidden md:block"
        >
          ⭐ 5.0 · 14 demos built
        </motion.div>

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
                      color: 'rgba(242,239,232,0.45)',
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

      {/* ───── EDITORIAL STATEMENT ───── */}
      <section style={{ background: '#F2EFE8', padding: '120px 56px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.35)', marginBottom: 48 }}
          >
            Est. 2025 · Northeast Philadelphia
          </motion.p>

          {['We build', 'websites for', 'real businesses.'].map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(52px, 9vw, 130px)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: i === 2 ? 'transparent' : '#080808',
                WebkitTextStroke: i === 2 ? '2px #080808' : undefined,
                marginBottom: 4,
                display: 'block',
              }}
            >
              {line}
            </motion.h2>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 80, marginTop: 72, flexWrap: 'wrap' }}
          >
            <p style={{ fontSize: 16, color: 'rgba(8,8,8,0.55)', lineHeight: 1.75, maxWidth: 380 }}>
              Not templates. Not WordPress. Not Wix. Hand-built from scratch — for restaurants, cleaners, contractors, and anyone running on a dead Facebook page.
            </p>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              {[['17', 'Years old'], ['14', 'Sites built'], ['$0', 'To start']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 40, color: '#080808', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.4)', marginTop: 8 }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section style={{ background: '#080808', padding: '100px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {[
            { value: 0, label: 'upfront cost', fmt: (v: number) => `$${v}` },
            { value: 14, label: 'demos built', fmt: (v: number) => `${v}` },
            { value: 48, label: 'avg delivery', fmt: (v: number) => `${v}h` },
          ].map((s, i) => (
            <AnimatedStat key={s.label} {...s} index={i} row />
          ))}
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
      <section style={{ background: '#080808', paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 56px', marginBottom: 40 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(242,239,232,0.3)' }}>
            Selected work
          </p>
        </div>

        {/* Full-width project rows */}
        {WORK_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            onClick={() => goTo(`/work/${item.id}`)}
            whileHover="hover"
            data-cursor="view"
            style={{
              position: 'relative',
              height: '55vh',
              minHeight: 320,
              overflow: 'hidden',
              cursor: 'pointer',
              borderTop: '1px solid #111',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {/* Background image */}
            <motion.img
              src={item.img}
              alt={item.title}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              initial="rest"
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.35) 50%, rgba(8,8,8,0.1) 100%)' }} />
            {/* Hover tint */}
            <motion.div
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(201,241,53,0.04)' }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 56px 48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: item.accent, display: 'block', marginBottom: 10 }}>
                  {String(i + 1).padStart(2, '0')} — {item.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 56px)', color: '#F2EFE8', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {item.title}
                </h3>
              </div>
              <motion.div
                variants={{ rest: { x: 0, opacity: 0.35 }, hover: { x: 12, opacity: 1 } }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 28, color: '#F2EFE8', flexShrink: 0 }}
              >
                →
              </motion.div>
            </div>
          </motion.div>
        ))}

        <div style={{ padding: '40px 56px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'flex-end' }}>
          <MagneticButton
            onClick={() => goTo('/work')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,232,0.4)', display: 'inline-flex', alignItems: 'center', gap: 8, padding: 0 }}
          >
            View all work →
          </MagneticButton>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section style={{ background: '#F2EFE8', padding: '120px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.35)', marginBottom: 72 }}
          >
            How it works
          </motion.p>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                left: 20,
                top: 8,
                bottom: 8,
                width: 1,
                background: 'rgba(8,8,8,0.12)',
                transformOrigin: 'top',
              }}
            />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
                style={{ display: 'flex', gap: 48, paddingBottom: i < PROCESS_STEPS.length - 1 ? 64 : 0, paddingLeft: 0 }}
              >
                {/* Dot */}
                <div style={{ position: 'relative', flexShrink: 0, width: 40 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2, type: 'spring' }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#C9F135',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 11, color: '#080808', letterSpacing: '0.05em' }}>
                      {step.n}
                    </span>
                  </motion.div>
                </div>

                <div style={{ paddingTop: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(22px,3vw,32px)', color: '#080808', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 12 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(8,8,8,0.55)', lineHeight: 1.7, maxWidth: 480 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section style={{ background: '#080808', padding: '120px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
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
                viewport={{ once: true }}
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
      <section style={{ background: '#C9F135', padding: '100px 56px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <div>
            <AnimatedText
              text="Start with a free demo."
              className="font-black text-[#080808]"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(32px,5vw,72px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              } as React.CSSProperties}
            />
            <ScrollReveal delay={0.3}>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(8,8,8,0.55)',
                  marginTop: 16,
                  maxWidth: 380,
                  lineHeight: 1.6,
                }}
              >
                No contract. No invoice. No hard feelings if you walk away.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <MagneticButton
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
                flexShrink: 0,
              }}
            >
              Get Started →
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
