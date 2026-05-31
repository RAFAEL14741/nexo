'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  motion,
  useInView,
} from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import { usePageTransition } from '@/providers/TransitionProvider';

const PROJECTS = [
  {
    id: 'sa-sushi',
    tag: 'Restaurant',
    title: 'Sa Sushi',
    desc: 'Full restaurant site with dark theme, Uber Eats-style menu, online ordering integration, and mobile-first layout.',
    accent: '#4ade80',
    bg: 'linear-gradient(135deg, #0a0f0a 0%, #0f1a10 100%)',
    tags: ['Restaurant', 'Menu', 'Mobile', 'Dark Theme'],
  },
  {
    id: 'lorenas-cleaning',
    tag: 'Cleaning Service',
    title: "Lorena's Cleaning",
    desc: 'Service business portal with booking system, Stripe payments, client login, and admin dashboard for team management.',
    accent: '#60a5fa',
    bg: 'linear-gradient(135deg, #080d14 0%, #0c1420 100%)',
    tags: ['Cleaning', 'Portal', 'Stripe', 'Admin Dashboard'],
  },
  {
    id: 'victors-supermarket',
    tag: 'Retail',
    title: "Victor's Supermarket",
    desc: 'Retail site with WhatsApp ordering system, PC America POS integration, weekly deals, and Instagram feed sync.',
    accent: '#fb923c',
    bg: 'linear-gradient(135deg, #0f0a06 0%, #1a0f08 100%)',
    tags: ['Retail', 'WhatsApp', 'POS Integration', 'Admin'],
  },
  {
    id: 'fma-constructions',
    tag: 'Construction',
    title: 'FMA Constructions',
    desc: 'Business site for kitchen, bath, and flooring contractor — service pages, lead capture, and project gallery.',
    accent: '#a78bfa',
    bg: 'linear-gradient(135deg, #0a080f 0%, #120e1c 100%)',
    tags: ['Construction', 'Services', 'SEO', 'Lead Generation'],
  },
];

function ProjectCard({
  p,
  index,
  onNavigate,
}: {
  p: typeof PROJECTS[0];
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
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
      layoutId={`card-${p.id}`}
    >
      <motion.button
        onClick={() => onNavigate(`/work/${p.id}`)}
        data-cursor="view"
        initial="rest"
        whileHover="hover"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #1a1a1a',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
          display: 'block',
        }}
      >
        {/* Card background peek on hover */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: p.bg,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
            padding: '40px 56px',
          }}
        >
          {/* Number */}
          <span
            style={{
              fontSize: 11,
              color: 'rgba(242,239,232,0.2)',
              letterSpacing: '0.12em',
              width: 40,
              flexShrink: 0,
            }}
          >
            0{index + 1}
          </span>

          {/* Tag + Title */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <motion.span
              variants={{
                rest: { color: p.accent + '80' },
                hover: { color: p.accent },
              }}
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 8,
                transition: 'color 0.3s',
              }}
            >
              {p.tag}
            </motion.span>
            <motion.h2
              variants={{
                rest: { x: 0 },
                hover: { x: 8 },
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 52px)',
                color: '#F2EFE8',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {p.title}
            </motion.h2>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 13,
              color: 'rgba(242,239,232,0.4)',
              lineHeight: 1.65,
              maxWidth: 360,
              flex: '0 1 360px',
            }}
          >
            {p.desc}
          </p>

          {/* Arrow */}
          <motion.span
            variants={{
              rest: { x: 0, opacity: 0.25, color: '#F2EFE8' },
              hover: { x: 10, opacity: 1, color: p.accent },
            }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 20, flexShrink: 0 }}
          >
            →
          </motion.span>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default function WorkPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <PageTransition>
      <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 120 }}>

        {/* Header */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 56px 80px', borderBottom: '1px solid #1a1a1a' }}>
          <AnimatedText
            text="Selected work"
            delay={0.1}
            className="text-[11px] tracking-[0.22em] uppercase text-[rgba(242,239,232,0.4)] mb-6"
          />
          <div style={{ marginBottom: 24 }}>
            <AnimatedText
              text="Our work."
              delay={0.2}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(48px,8vw,110px)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: '#F2EFE8',
              } as React.CSSProperties}
            />
            <AnimatedText
              text="All free demos."
              delay={0.35}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(48px,8vw,110px)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(242,239,232,0.2)',
              } as React.CSSProperties}
            />
          </div>
          <ScrollReveal delay={0.5}>
            <p
              style={{
                fontSize: 15,
                color: 'rgba(242,239,232,0.45)',
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              Every project below started as a free demo. We built it first — the business owner saw it live before any contract.
            </p>
          </ScrollReveal>
        </div>

        {/* Project list */}
        <div style={{ position: 'relative', borderTop: '1px solid #1a1a1a' }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} style={{ position: 'relative', overflow: 'hidden' }}>
              <ProjectCard p={p} index={i} onNavigate={goTo} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '80px 56px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <ScrollReveal>
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,239,232,0.3)',
                  marginBottom: 12,
                }}
              >
                Your business next?
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 20,
                  color: '#F2EFE8',
                  letterSpacing: '-0.01em',
                }}
              >
                We&apos;re building demos for NE Philly businesses every week.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <motion.button
              onClick={() => goTo('/contact')}
              data-cursor="go"
              whileHover={{ scale: 1.03, backgroundColor: '#d4f55a' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 36px',
                background: '#C9F135',
                color: '#080808',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Get Your Free Demo
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
