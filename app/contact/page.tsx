'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import ScrollReveal from '@/components/ScrollReveal';
import { usePageTransition } from '@/providers/TransitionProvider';

const BUSINESS_TYPES = [
  'Restaurant / Food',
  'Cleaning Service',
  'Retail / Shop',
  'Construction / Trades',
  'Salon / Barber',
  'Other',
];

type SubmitState = 'idle' | 'sending' | 'sent';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid #1e1e1e',
  color: '#F2EFE8',
  padding: '14px 16px',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.25s',
  fontFamily: 'inherit',
};

function FormField({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(242,239,232,0.35)',
          }}
        >
          {label}
        </label>
        {children}
      </div>
    </ScrollReveal>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [form, setForm] = useState({
    name: '',
    business: '',
    type: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('sending');
    try {
      await fetch('https://formspree.io/f/XXXXXXXX', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // fail silently
    }
    setSubmitState('sent');
  };

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
            text="Get in touch"
            delay={0.1}
            className="text-[11px] tracking-[0.22em] uppercase text-[rgba(242,239,232,0.4)] mb-6"
          />
          <div style={{ marginBottom: 24 }}>
            <AnimatedText
              text="Let's talk."
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
              text="Demo in 48h."
              delay={0.35}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(48px,8vw,110px)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: '#C9F135',
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
              Fill this out and we&apos;ll have a live demo ready for you within 48 hours.
              No card, no contract, no commitment.
            </p>
          </ScrollReveal>
        </div>

        {/* Form area */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '72px 56px 96px',
            display: 'grid',
            gridTemplateColumns: '1fr minmax(0, 320px)',
            gap: 80,
          }}
        >
          <AnimatePresence mode="wait">
            {submitState === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                  style={{ fontSize: 56, lineHeight: 1 }}
                >
                  ✓
                </motion.div>
                <h2
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: 32,
                    color: '#F2EFE8',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Got it — we&apos;ll be in touch.
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: 'rgba(242,239,232,0.5)',
                    maxWidth: 380,
                    lineHeight: 1.7,
                  }}
                >
                  Expect your demo within 48 hours. We&apos;ll send it to the email you provided.
                </p>
                <motion.button
                  whileHover={{ color: '#F2EFE8' }}
                  onClick={() => startTransition(() => router.push('/'))}
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: 13,
                    color: 'rgba(242,239,232,0.45)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 12,
                    transition: 'color 0.2s',
                  }}
                >
                  ← Back to home
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                  }}
                >
                  <FormField label="Your name" delay={0.1}>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Rafael Rodrigues"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(242,239,232,0.35)')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                    />
                  </FormField>
                  <FormField label="Business name" delay={0.12}>
                    <input
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      required
                      placeholder="Sa Sushi"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(242,239,232,0.35)')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                    />
                  </FormField>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                  }}
                >
                  <FormField label="Business type" delay={0.15}>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      required
                      style={{
                        ...inputStyle,
                        background: '#080808',
                        appearance: 'none',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(242,239,232,0.35)')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                    >
                      <option value="" disabled>Select type...</option>
                      {BUSINESS_TYPES.map(t => (
                        <option key={t} value={t} style={{ background: '#080808' }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Email" delay={0.18}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#C9F135')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                    />
                  </FormField>
                </div>

                <FormField label="Phone (optional)" delay={0.2}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(215) 555-0100"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(242,239,232,0.35)')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                  />
                </FormField>

                <FormField label="Anything else we should know?" delay={0.22}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your business, what you need, or anything specific..."
                    style={{ ...inputStyle, resize: 'none', minHeight: 100 }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(242,239,232,0.35)')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                  />
                </FormField>

                <ScrollReveal delay={0.28}>
                  <motion.button
                    type="submit"
                    data-cursor="go"
                    disabled={submitState === 'sending'}
                    whileHover={submitState === 'idle' ? { scale: 1.02, backgroundColor: '#d4f55a' } : {}}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '16px 40px',
                      background: '#C9F135',
                      color: '#080808',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: submitState === 'sending' ? 'wait' : 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      minWidth: 240,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {submitState === 'idle' && (
                        <motion.span
                          key="idle"
                          initial={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'block' }}
                        >
                          Request My Free Demo →
                        </motion.span>
                      )}
                      {submitState === 'sending' && (
                        <motion.span
                          key="sending"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'block' }}
                        >
                          Sending...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </ScrollReveal>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <ScrollReveal delay={0.3}>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.3)',
                    marginBottom: 10,
                  }}
                >
                  Email us directly
                </p>
                <motion.a
                  href="mailto:hello@nexo.agency"
                  whileHover={{ color: '#C9F135' }}
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#F2EFE8',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  hello@nexo.agency
                </motion.a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.3)',
                    marginBottom: 10,
                  }}
                >
                  We serve
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['Mayfair', 'Bustleton', 'Rhawnhurst', 'Fox Chase', 'Holmesburg', 'All of NE Philly'].map(area => (
                    <span key={area} style={{ fontSize: 13, color: 'rgba(242,239,232,0.45)' }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <motion.div
                whileHover={{ borderColor: '#2a2a2a' }}
                transition={{ duration: 0.2 }}
                style={{
                  border: '1px solid #1a1a1a',
                  padding: 24,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,232,0.3)',
                    marginBottom: 10,
                  }}
                >
                  Our promise
                </p>
                <p style={{ fontSize: 13, color: 'rgba(242,239,232,0.55)', lineHeight: 1.7 }}>
                  Demo in 48h. No card required. No contract until you say yes.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
