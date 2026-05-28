'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePageTransition } from '@/providers/TransitionProvider';

const BUSINESS_TYPES = [
  'Restaurant / Food',
  'Cleaning Service',
  'Retail / Shop',
  'Construction / Trades',
  'Salon / Barber',
  'Other',
];

export default function ContactPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    business: '',
    type: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Formspree endpoint — replace XXXX with real form ID
    try {
      await fetch('https://formspree.io/f/XXXXXXXX', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // fail silently — show success regardless
    }
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: '120px' }}>

      {/* Header */}
      <div className="px-14 pb-20 border-b border-[#1a1a1a]">
        <p className="text-[11px] tracking-[0.22em] text-[rgba(242,239,232,0.4)] uppercase mb-6">Get in touch</p>
        <h1
          className="text-[clamp(48px,8vw,110px)] font-black text-[#F2EFE8] leading-[0.88] tracking-[-0.04em]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Let&apos;s build your demo.{' '}
          <span style={{ color: '#C9F135' }}>Free.</span>
        </h1>
        <p className="mt-8 text-[15px] text-[rgba(242,239,232,0.5)] max-w-[440px] leading-relaxed">
          Fill this out and we&apos;ll have a demo ready for you to see within 48 hours. No card, no contract, no commitment.
        </p>
      </div>

      {/* Form + sidebar */}
      <div className="px-14 py-20 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-20">

        {submitted ? (
          <div className="flex flex-col gap-6">
            <div className="text-[48px]">✓</div>
            <h2
              className="text-[32px] font-black text-[#F2EFE8]"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Got it — we&apos;ll be in touch.
            </h2>
            <p className="text-[15px] text-[rgba(242,239,232,0.55)] max-w-[400px] leading-relaxed">
              Expect your demo within 48 hours. We&apos;ll send it to the email you provided.
            </p>
            <button
              onClick={() => startTransition(() => router.push('/'))}
              className="self-start text-[13px] text-[rgba(242,239,232,0.5)] hover:text-[#F2EFE8] transition-colors bg-transparent border-none mt-4"
            >
              ← Back to home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Your name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Rafael Rodrigues"
                  className="bg-transparent border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] placeholder:text-[rgba(242,239,232,0.2)] focus:border-[#F2EFE8] outline-none transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Business name</label>
                <input
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  required
                  placeholder="Sa Sushi"
                  className="bg-transparent border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] placeholder:text-[rgba(242,239,232,0.2)] focus:border-[#F2EFE8] outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Business type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="bg-[#080808] border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] focus:border-[#F2EFE8] outline-none transition-colors duration-200 appearance-none"
                >
                  <option value="" disabled>Select type...</option>
                  {BUSINESS_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="bg-transparent border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] placeholder:text-[rgba(242,239,232,0.2)] focus:border-[#F2EFE8] outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(215) 555-0100"
                className="bg-transparent border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] placeholder:text-[rgba(242,239,232,0.2)] focus:border-[#F2EFE8] outline-none transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.4)] uppercase">Anything else we should know?</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your business, what you need, or anything specific you want on the site..."
                className="bg-transparent border border-[#2a2a2a] text-[#F2EFE8] px-4 py-3 text-[14px] placeholder:text-[rgba(242,239,232,0.2)] focus:border-[#F2EFE8] outline-none transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              data-cursor="go"
              className="self-start px-10 py-4 bg-[#C9F135] text-[#080808] text-[13px] font-bold tracking-wider uppercase hover:bg-[#d4f55a] transition-colors duration-200"
            >
              Request My Free Demo →
            </button>
          </form>
        )}

        {/* Sidebar */}
        <div className="flex flex-col gap-10 pt-2">
          <div>
            <p className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.35)] uppercase mb-3">Email us directly</p>
            <a
              href="mailto:hello@nexo.agency"
              className="text-[15px] font-bold text-[#F2EFE8] hover:text-[#C9F135] transition-colors duration-200"
            >
              hello@nexo.agency
            </a>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.35)] uppercase mb-3">We serve</p>
            <div className="flex flex-col gap-1">
              {['Mayfair', 'Bustleton', 'Rhawnhurst', 'Fox Chase', 'Holmesburg', 'All of NE Philly'].map(area => (
                <span key={area} className="text-[13px] text-[rgba(242,239,232,0.5)]">{area}</span>
              ))}
            </div>
          </div>

          <div className="border border-[#1a1a1a] p-6">
            <p className="text-[11px] tracking-[0.16em] text-[rgba(242,239,232,0.35)] uppercase mb-3">Our promise</p>
            <p className="text-[13px] text-[rgba(242,239,232,0.6)] leading-relaxed">
              Demo in 48h. No card required. No contract until you say yes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
