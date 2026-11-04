'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import { usePageTransition } from '@/providers/TransitionProvider';
import { staggerContainer } from '@/lib/animations';

const VALUES = [
  { n: '01', title: 'Free first', desc: 'We build before you pay. That is not normal — but it proves we believe in our work.' },
  { n: '02', title: 'Local focus', desc: 'We only work with businesses in Northeast Philadelphia. Tight scope means better results.' },
  { n: '03', title: 'No templates', desc: 'Every site is built from scratch for that business. No Squarespace. No Wix. No drag-and-drop.' },
  { n: '04', title: 'Plain talk', desc: 'We explain everything in plain English. No technical jargon, no hidden fees, no surprises.' },
];

export default function AboutPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const goTo = (href: string) => startTransition(() => router.push(href));

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', paddingTop: 120 }}>

        {/* Hero */}
        <section
          style={{
            background: '#080808',
            padding: '0 56px 96px',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          <AnimatedText
            text="About"
            delay={0.1}
            className="text-[11px] tracking-[0.22em] uppercase text-[rgba(242,239,232,0.4)] mb-6"
          />

          <div style={{ marginBottom: 40 }}>
            <AnimatedText
              text="We're NEXO."
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
              text="Built in NE Philly."
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
                fontSize: 16,
                color: 'rgba(242,239,232,0.5)',
                maxWidth: 540,
                lineHeight: 1.75,
              }}
            >
              NEXO is a one-person web studio started by a 17-year-old from Abraham Lincoln High School.
              The whole model is built around one idea: you should see your site before you spend a cent.
            </p>
          </ScrollReveal>
        </section>

        {/* Story — cream */}
        <section style={{ background: '#F2EFE8', padding: '96px 56px' }}>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left — large decorative "17" */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 'clamp(120px, 18vw, 240px)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(8,8,8,0.1)',
                  lineHeight: 0.85,
                  display: 'block',
                  userSelect: 'none',
                }}
              >
                17
              </span>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(8,8,8,0.35)',
                  marginTop: 16,
                }}
              >
                Years old when NEXO started
              </p>
            </motion.div>

            {/* Right — story paragraphs */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ paddingTop: 24 }}
            >
              <AnimatedText
                text="I started building demo sites for businesses I walked past every day."
                delay={0.1}
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px,3vw,40px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#080808',
                  marginBottom: 36,
                } as React.CSSProperties}
              />
              {[
                'I grew up in Mayfair. My neighbors — restaurant owners, cleaners, contractors — deserve the same quality websites as Center City businesses.',
                'So I started building demos. Free. Unsolicited. Showing them exactly what their business could look like online.',
                'That became NEXO. 14 demos built, and counting.',
              ].map((t, i) => (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <p
                    style={{
                      fontSize: 15,
                      color: 'rgba(8,8,8,0.6)',
                      lineHeight: 1.75,
                      maxWidth: 400,
                      marginBottom: 18,
                    }}
                  >
                    {t}
                  </p>
                </ScrollReveal>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values — dark */}
        <section style={{ background: '#080808', padding: '96px 56px' }}>
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
                What we stand for
              </p>
            </ScrollReveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.n} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ borderColor: 'rgba(201,241,53,0.3)', y: -4 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      border: '1px solid #1a1a1a',
                      padding: 32,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      cursor: 'default',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'rgba(242,239,232,0.2)',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {v.n}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        fontSize: 22,
                        color: '#F2EFE8',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                      }}
                    >
                      {v.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'rgba(242,239,232,0.45)', lineHeight: 1.7 }}>
                      {v.desc}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: '#080808',
            padding: '80px 56px',
            borderTop: '1px solid #1a1a1a',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
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
                  Ready?
                </p>
                <AnimatedText
                  text="Let's build your demo."
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: 'clamp(24px,4vw,56px)',
                    color: '#F2EFE8',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  } as React.CSSProperties}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
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
                Get In Touch
              </motion.button>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
