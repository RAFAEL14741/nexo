'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
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
  tag,
  title,
  subtitle,
  accent,
  bg,
  overview,
  challenge,
  solution,
  results,
  tags,
}: CaseStudyProps) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  return (
    <PageTransition>
      <div style={{ background: bg, minHeight: '100vh' }}>

        {/* Hero */}
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 56px 96px',
            paddingTop: 160,
            background: bg,
          }}
        >
          <motion.button
            onClick={() => startTransition(() => router.push('/work'))}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              alignSelf: 'flex-start',
              marginBottom: 64,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: `${accent}99`,
              padding: 0,
            }}
          >
            ← Back to work
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: accent,
              display: 'block',
              marginBottom: 16,
            }}
          >
            {tag}
          </motion.span>

          <AnimatedText
            text={title}
            delay={0.4}
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(48px,9vw,120px)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: '#F2EFE8',
              marginBottom: 24,
            } as React.CSSProperties}
          />

          <ScrollReveal delay={0.65}>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(242,239,232,0.5)',
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Content */}
        <div
          style={{
            background: '#080808',
            padding: '96px 56px',
            display: 'flex',
            flexDirection: 'column',
            gap: 96,
          }}
        >

          {/* Overview */}
          <ScrollReveal>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 24,
                }}
              >
                Overview
              </p>
              <p
                style={{
                  fontSize: 18,
                  color: 'rgba(242,239,232,0.75)',
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                {overview}
              </p>
            </div>
          </ScrollReveal>

          {/* Challenge + Solution */}
          <ScrollReveal delay={0.1}>
            <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.35)',
                    marginBottom: 16,
                  }}
                >
                  The Challenge
                </p>
                <p style={{ fontSize: 15, color: 'rgba(242,239,232,0.6)', lineHeight: 1.75 }}>
                  {challenge}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.35)',
                    marginBottom: 16,
                  }}
                >
                  Our Solution
                </p>
                <p style={{ fontSize: 15, color: 'rgba(242,239,232,0.6)', lineHeight: 1.75 }}>
                  {solution}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.1}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 32,
                }}
              >
                Results
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      borderBottom: '1px solid #1a1a1a',
                      padding: '18px 0',
                    }}
                  >
                    <span style={{ fontSize: 18, color: accent, flexShrink: 0, marginTop: 2 }}>
                      ↗
                    </span>
                    <p style={{ fontSize: 15, color: '#F2EFE8', lineHeight: 1.6 }}>{r}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '6px 16px',
                    border: `1px solid ${accent}40`,
                    color: accent,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          {/* Next project CTA */}
          <ScrollReveal>
            <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                paddingTop: 32,
                borderTop: '1px solid #1a1a1a',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 32,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.35)',
                    marginBottom: 12,
                  }}
                >
                  Want something like this?
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
                  Your demo is free. No commitment.
                </p>
              </div>
              <motion.button
                onClick={() => startTransition(() => router.push('/contact'))}
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
