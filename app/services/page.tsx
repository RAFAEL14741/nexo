'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
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
  { q: 'What if I don\'t like it?', a: "You walk away. No contract, no invoice, no hard feelings. We've already invested the time to build something we're proud of." },
  { q: 'How long does the demo take?', a: "Usually 24–48 hours. Sometimes faster for simpler sites. We'll tell you upfront." },
  { q: 'Do I need to pay for hosting?', a: "If you sign with us, hosting is included in our monthly care plan. If you want to manage it yourself, we'll set it up on GitHub Pages or Vercel — free." },
  { q: 'Can I update the site myself?', a: "For admin portals and dashboards, yes — we build custom edit interfaces. For the main site, updates are included in the monthly plan or quoted individually." },
];

export default function ServicesPage() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: '120px' }}>
      {/* Header */}
      <div className="px-14 pb-24 border-b border-[#1a1a1a]">
        <p className="text-[11px] tracking-[0.22em] text-[rgba(242,239,232,0.4)] uppercase mb-6">What we offer</p>
        <h1
          className="text-[clamp(48px,8vw,110px)] font-black text-[#F2EFE8] leading-[0.88] tracking-[-0.04em]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Built for local.{' '}
          <span style={{ WebkitTextStroke: '2px rgba(242,239,232,0.2)', color: 'transparent' } as React.CSSProperties}>
            Priced fair.
          </span>
        </h1>
        <p className="mt-8 text-[15px] text-[rgba(242,239,232,0.5)] max-w-[480px] leading-relaxed">
          Every service starts with a free demo. Pricing listed is what we charge if you love it and want to launch.
        </p>
      </div>

      {/* Services list */}
      <div className="flex flex-col">
        {SERVICES.map(s => (
          <div
            key={s.n}
            className="border-b border-[#1a1a1a] px-14 py-16 flex flex-col md:flex-row gap-10 fade-up"
          >
            <div className="md:w-12 shrink-0">
              <span className="text-[11px] text-[rgba(242,239,232,0.25)] tracking-wider">{s.n}</span>
            </div>

            <div className="flex-1">
              <h2
                className="text-[clamp(22px,3vw,40px)] font-black text-[#F2EFE8] leading-tight mb-4"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {s.title}
              </h2>
              <p className="text-[14px] text-[rgba(242,239,232,0.55)] leading-relaxed max-w-[520px] mb-6">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.features.map(f => (
                  <span
                    key={f}
                    className="text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 border border-[#2a2a2a] text-[rgba(242,239,232,0.4)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:text-right shrink-0">
              <p className="text-[11px] text-[rgba(242,239,232,0.35)] uppercase tracking-wider mb-1">Starting at</p>
              <p
                className="text-[24px] font-black text-[#C9F135]"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {s.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="px-14 py-24" style={{ background: '#F2EFE8' }}>
        <p className="text-[11px] tracking-[0.2em] text-[rgba(8,8,8,0.4)] uppercase mb-12">Common questions</p>
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-[rgba(8,8,8,0.12)] fade-up">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-6 flex items-center justify-between text-left bg-transparent border-none gap-4"
              >
                <span
                  className="text-[16px] font-bold text-[#080808]"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {faq.q}
                </span>
                <span
                  className="text-[20px] text-[rgba(8,8,8,0.4)] shrink-0 transition-transform duration-300"
                  style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <p className="pb-6 text-[14px] text-[rgba(8,8,8,0.6)] leading-relaxed max-w-[600px]">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-14 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ background: '#C9F135' }}
      >
        <h2
          className="text-[clamp(28px,5vw,64px)] font-black text-[#080808] leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Start with a free demo.
        </h2>
        <button
          onClick={() => goTo('/contact')}
          data-cursor="go"
          className="px-8 py-4 bg-[#080808] text-[#F2EFE8] text-[13px] font-bold tracking-wider uppercase hover:bg-[#1a1a1a] transition-colors duration-200 shrink-0"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
