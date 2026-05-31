'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import { usePageTransition } from '@/providers/TransitionProvider';

const SERVICES = [
  {
    n: '01',
    title: 'Web Design & Development',
    desc: 'Scroll-animated, mobile-first websites that load fast and look premium. Built in Next.js or plain HTML — whichever ships fastest for your business.',
    features: ['Custom animations', 'Mobile-first', 'Google PageSpeed 90+', 'SEO optimized', 'No templates'],
    price: '$800–$2,000',
  },
  {
    n: '02',
    title: 'Booking Systems',
    desc: 'Online scheduling with Stripe payments, automated email confirmations, and a private admin dashboard. Replace phone calls with self-serve appointments.',
    features: ['Stripe payments', 'Email confirmations', 'Admin dashboard', 'Team scheduling', 'Calendar sync'],
    price: '$1,200–$2,500',
  },
  {
    n: '03',
    title: 'Menu & Ordering',
    desc: 'Digital menus with WhatsApp checkout, category filters, and item photos. Customers order from their phone without downloading anything.',
    features: ['WhatsApp integration', 'Category filtering', 'Photo gallery', 'No app install', 'Direct checkout'],
    price: '$800–$1,500',
  },
  {
    n: '04',
    title: 'Admin Portals',
    desc: 'Private dashboards for tracking leads, invoices, teams, and operations. Built to replace spreadsheets and phone calls.',
    features: ['Lead tracking', 'Invoice management', 'Team visibility', 'Real-time data', 'Mobile accessible'],
    price: '$1,000–$2,000',
  },
  {
    n: '05',
    title: 'Monthly Care',
    desc: 'We handle hosting, updates, new sections, and bug fixes. You focus on running your business — we keep your site running.',
    features: ['Hosting included', 'Monthly updates', 'Bug fixes', 'New features', 'Priority support'],
    price: '$149–$299/mo',
  },
];

const FAQS = [
  { q: 'Is the demo really free?', a: "Yes. We build your site before any money changes hands. You see it live, working, with your business name and content. Then you decide." },
  { q: "What if I don't like it?", a: "You walk away. No contract, no invoice, no hard feelings. We've already invested the time to build something we're proud of." },
  { q: 'How long does the demo take?', a: "Usually 24–48 hours. Sometimes faster for simpler sites. We'll tell you upfront." },
  { q: 'Do I need to pay for hosting?', a: "If you sign with us, hosting is included in our monthly care plan. If you want to manage it yourself, we'll set it up on GitHub Pages or Vercel — free." },
  { q: 'Can I update the site myself?', a: "For admin portals and dashboards, yes — we build custom edit interfaces. For the main site, updates are included in the monthly plan or quoted individually." },
];

function ServiceRow({ s, isOpen, onToggle }: { s: typeof SERVICES[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      onHoverStart={onToggle}
      onHoverEnd={() => isOpen && onToggle()}
      style={{ borderBottom: '1px solid #1a1a1a', overflow: 'hidden' }}
      animate={{ backgroundColor: isOpen ? '#0c0c0c' : '#080808' }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 32,
          padding: '36px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: 'rgba(242,239,232,0.2)',
            letterSpacing: '0.1em',
            flexShrink: 0,
            width: 32,
            paddingTop: 4,
          }}
        >
          {s.n}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: '#F2EFE8',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {s.title}
          </h2>
        </div>

        <div style={{ flexShrink: 0, textAlign: 'right', paddingTop: 4, marginLeft: 'auto' }}>
          <p
            style={{
              fontSize: 10,
              color: 'rgba(242,239,232,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 4,
              whiteSpace: 'nowrap',
            }}
          >
            Starting at
          </p>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 24,
              color: '#C9F135',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {s.price}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontSize: 22,
            color: '#C9F135',
            flexShrink: 0,
            lineHeight: 1,
            display: 'inline-block',
            paddingTop: 4,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 36, paddingLeft: 64 }}>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(242,239,232,0.5)',
                  lineHeight: 1.75,
                  maxWidth: 480,
                  marginBottom: 20,
                }}
              >
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.features.map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      border: '1px solid rgba(242,239,232,0.12)',
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

export default function ServicesPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const goTo = (href: string) => startTransition(() => router.push(href));

  const toggleService = (i: number) => setOpenService(openService === i ? null : i);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <PageTransition>
      <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 120 }}>

        {/* Header */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 56px 80px',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          <AnimatedText
            text="What we offer"
            delay={0.1}
            className="text-[11px] tracking-[0.22em] uppercase text-[rgba(242,239,232,0.4)] mb-6"
          />
          <div style={{ marginBottom: 24 }}>
            <AnimatedText
              text="Built for local."
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
              text="Priced fair."
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
                maxWidth: 440,
                lineHeight: 1.7,
              }}
            >
              Every service starts with a free demo. Pricing listed is what we charge if you love it and want to launch.
            </p>
          </ScrollReveal>
        </div>

        {/* Services accordion */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 56px',
            borderTop: '1px solid #1a1a1a',
          }}
        >
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.n}
              s={s}
              isOpen={openService === i}
              onToggle={() => toggleService(i)}
            />
          ))}
        </div>

        {/* FAQ */}
        <div style={{ background: '#F2EFE8', padding: '96px 0', marginTop: 80 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 56px' }}>
            <ScrollReveal>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.24em',
                  color: 'rgba(8,8,8,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 56,
                }}
              >
                Common questions
              </p>
            </ScrollReveal>

            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  layout
                  style={{ borderBottom: '1px solid rgba(8,8,8,0.1)', overflow: 'hidden' }}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{
                      width: '100%',
                      padding: '22px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: 16,
                        color: '#080808',
                      }}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                      style={{
                        fontSize: 22,
                        color: '#C9F135',
                        flexShrink: 0,
                        display: 'inline-block',
                        lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          style={{
                            paddingBottom: 22,
                            fontSize: 15,
                            color: 'rgba(8,8,8,0.6)',
                            lineHeight: 1.75,
                            maxWidth: 600,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section style={{ background: '#C9F135', padding: '96px 56px' }}>
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
            <AnimatedText
              text="Start with a free demo."
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px,5vw,64px)',
                color: '#080808',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              } as React.CSSProperties}
            />
            <ScrollReveal delay={0.2}>
              <motion.button
                onClick={() => goTo('/contact')}
                data-cursor="go"
                whileHover={{ scale: 1.04, backgroundColor: '#080808', color: '#C9F135' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '16px 36px',
                  background: '#080808',
                  color: '#F2EFE8',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.25s, color 0.25s',
                }}
              >
                Get Started →
              </motion.button>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
