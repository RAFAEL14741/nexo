'use client';

import CaseStudy from '@/components/CaseStudy';

export default function FMAConstructions() {
  return (
    <CaseStudy
      tag="Construction"
      title="FMA Constructions"
      subtitle="Construction Business Site & Lead Generation"
      accent="#a78bfa"
      bg="#0a080f"
      overview="FMA Constructions is a licensed contractor based in Northeast Philadelphia specializing in kitchen remodeling, bathroom renovations, and flooring installation. The business relied entirely on word-of-mouth referrals before we built their online presence."
      challenge="Construction businesses lose leads constantly because they have no fast way to capture inquiries outside business hours. We needed a site that looked professional enough to compete with larger firms, and a lead form that actually gets filled out."
      solution="Clean, trust-forward design with service pages for each specialty. A sticky lead form on mobile. Gallery sections for completed projects. SEO-optimized title tags and local schema markup for NE Philadelphia search terms."
      results={['First Google lead within 2 weeks of launch', 'Service pages ranking for local construction keywords', 'Lead form completion rate higher than industry average due to minimal fields']}
      tags={['Construction', 'Lead Generation', 'Local SEO', 'Service Pages', 'NE Philly']}
    />
  );
}
