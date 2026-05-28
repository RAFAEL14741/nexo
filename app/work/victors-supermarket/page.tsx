'use client';

import CaseStudy from '@/components/CaseStudy';

export default function VictorsSupermarket() {
  return (
    <CaseStudy
      tag="Retail"
      title="Victor's Supermarket"
      subtitle="Retail Website & WhatsApp Ordering System"
      accent="#fb923c"
      bg="#0f0a06"
      overview="Victor's Supermarket is a neighborhood grocery store in NE Philadelphia running PC America point-of-sale. They wanted a way to take orders online without a full e-commerce buildout — and to showcase weekly deals to drive foot traffic."
      challenge="The store had no POS API access — PC America is a closed system. We couldn't do real inventory sync. The owner also wanted WhatsApp ordering, which is how many of his regulars prefer to communicate."
      solution="We built a static product catalog with weekly specials, a WhatsApp order button that pre-fills a structured cart message, and an admin panel where the owner can update deals and product photos without touching code. We built around the POS limitation instead of against it."
      results={['WhatsApp ordering active on day one', 'Weekly specials updated by owner without developer help', 'Positioned as the first local grocery with a proper web presence']}
      tags={['Retail', 'WhatsApp Ordering', 'POS Integration', 'Admin Panel', 'NE Philly']}
    />
  );
}
