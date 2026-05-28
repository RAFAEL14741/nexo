'use client';

import CaseStudy from '@/components/CaseStudy';

export default function LorenasCleaning() {
  return (
    <CaseStudy
      tag="Cleaning Service"
      title="Lorena's Cleaning"
      subtitle="Service Business Portal & Booking System"
      accent="#60a5fa"
      bg="#080d14"
      overview="Lorena's Cleaning LLC is a 4-team residential and commercial cleaning company in Northeast Philadelphia. They were managing bookings over the phone and tracking clients on paper. We built a full client portal and admin dashboard."
      challenge="The business had 4 active cleaning teams running simultaneously. The owner needed visibility into all jobs without having to call drivers — and clients needed to be able to book and pay without calling in."
      solution="We built a dual-portal system: a public-facing booking site with Stripe payments, and a private admin dashboard where Lorena can see all active jobs, teams, and revenue in real time. Automated email confirmations on every booking."
      results={['3 new clients booked in the first week after launch', 'Zero phone bookings needed — everything online', 'Admin dashboard replaced a full spreadsheet + phone workflow']}
      tags={['Cleaning', 'Booking Portal', 'Stripe Payments', 'Admin Dashboard', 'NE Philly']}
    />
  );
}
