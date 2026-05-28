'use client';

import CaseStudy from '@/components/CaseStudy';

export default function SaSushiPage() {
  return (
    <CaseStudy
      tag="Restaurant"
      title="Sa Sushi"
      subtitle="Restaurant Website & Menu System"
      accent="#4ade80"
      bg="#0a0f0a"
      overview="Sa Sushi is a local Japanese restaurant in the Mayfair section of NE Philadelphia. They had no website and relied entirely on word-of-mouth and Yelp. We built them a full dark-theme site with an interactive menu, mobile ordering flow, and a location page with hours."
      challenge="The owner wanted something that felt premium — comparable to big city sushi restaurants — but at a price point that made sense for a neighborhood spot. We needed to build trust visually without overcomplicating the ordering flow."
      solution="We designed a dark, minimal aesthetic with sage green accents. The full Uber Eats-style menu is built directly into the site, so customers can browse and place orders without leaving. The mobile experience was prioritized from day one."
      results={['Went from zero web presence to a live site in 48 hours', 'Menu browsed 200+ times in the first week', 'Pitched and won at $1,200 for the full build']}
      tags={['Restaurant', 'Menu System', 'Mobile First', 'Dark Theme', 'NE Philly']}
    />
  );
}
