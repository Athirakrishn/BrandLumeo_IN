import Link from 'next/link';
import { SERVICE_SECTIONS } from '@/data/services';

export const metadata = {
  title: 'Our Digital Services – Branding, Marketing & Development | Brandlumeo',
  description: "Explore Brandlumeo's growth-focused digital services including brand strategy, performance marketing, SEO, custom web & mobile app development, and content creation.",
};

const stats = [
  { num: '6', label: 'Core Business Verticals' },
  { num: <>7<span>+</span></>, label: 'Brands Served' },
  { num: <>320<span>+</span></>, label: 'Campaigns Delivered' },
  { num: <>3<span>x</span></>, label: 'Average ROI' },
];

const focusAreas = [
  {
    id: 'branding-services',
    eyebrow: 'Brand Strategy',
    title: 'Brand Identity & Positioning',
    desc: 'We help brands define who they are, what they stand for, and how to communicate it with precision. Our brand strategy work covers visual identity, messaging architecture, and market positioning.',
    services: [
      { title: 'Brand Audit & Positioning', desc: 'Competitive landscape analysis and brand gap assessment.' },
      { title: 'Visual Identity Design', desc: 'Logos, typography, color systems and brand guidelines.' },
      { title: 'Messaging Architecture', desc: 'Value propositions, taglines and tone of voice frameworks.' },
      { title: 'Brand Activation', desc: 'Launch campaigns and go-to-market brand rollouts.' },
    ],
    img: '/images/services/branding-identity.jpg',
  },
  {
    id: 'seo-services',
    eyebrow: 'SEO & Content',
    title: 'Search Engine Optimization',
    desc: 'From technical audits to content strategy, we build search authority that drives sustainable organic growth. Our SEO work is built for Kerala and GCC market dominance.',
    services: [
      { title: 'Technical SEO Audit', desc: 'Site health, crawlability, and Core Web Vitals optimization.' },
      { title: 'Content Strategy & Clusters', desc: 'Topical authority building through strategic content planning.' },
      { title: 'Local & Map Pack SEO', desc: 'Dominate local search results across Kerala and UAE markets.' },
      { title: 'Link Building', desc: 'High-authority backlink acquisition through ethical outreach.' },
    ],
    img: '/images/services/subsections/search-engine-optimization-seo.jpg',
  },
  {
    id: 'paid-media',
    eyebrow: 'Paid Media',
    title: 'Performance Advertising',
    desc: 'We run performance campaigns across Google, Meta, and LinkedIn. Every rupee of ad spend is tracked, tested, and optimized for your CAC and ROAS targets.',
    services: [
      { title: 'Google Ads', desc: 'Search, Display, Shopping and YouTube campaigns.' },
      { title: 'Meta Ads', desc: 'Facebook & Instagram campaigns with advanced audience targeting.' },
      { title: 'LinkedIn Ads', desc: 'B2B lead generation for enterprise and professional markets.' },
      { title: 'Conversion Rate Optimization', desc: 'Landing pages, A/B testing, and funnel optimization.' },
    ],
    img: '/images/services/subsections/ppc-advertising.jpg',
  },
  {
    id: 'social-media',
    eyebrow: 'Social Media',
    title: 'Social Media & Content',
    desc: 'We create and execute social media strategies that build communities, increase brand awareness, and drive measurable engagement across platforms.',
    services: [
      { title: 'Social Media Strategy', desc: 'Platform-specific strategy for Instagram, Facebook, LinkedIn.' },
      { title: 'Content Creation', desc: 'Graphics, video, reels, and copywriting at scale.' },
      { title: 'Community Management', desc: 'Engagement, inbox management, and audience growth.' },
      { title: 'Influencer Marketing', desc: 'Micro and macro influencer campaigns for brand reach.' },
    ],
    img: '/images/services/subsections/social-media-marketing.jpg',
  },
];

const packages = [
  { name: 'Starter', desc: 'For brands launching their digital presence.', items: ['Brand Identity Essentials', 'SEO Foundation Audit', 'Social Media Setup', 'Google Business Profile', 'Monthly Reporting'], featured: false },
  { name: 'Growth', desc: 'For brands scaling across multiple channels.', items: ['Full SEO & Content Strategy', 'Google & Meta Ads Management', 'Social Media Management', 'Monthly Performance Reports', 'Dedicated Account Manager', 'CRO & Landing Pages'], featured: true },
  { name: 'Enterprise', desc: 'For established brands pursuing market leadership.', items: ['Full-Funnel Strategy', 'Multi-Channel Ad Campaigns', 'Brand Positioning & Refresh', 'Content at Scale', 'Weekly Strategy Calls', 'Custom KPI Dashboard'], featured: false },
];

export default function ServicesPage() {
  return (
    <>
      <section className="rn-page-hero" aria-label="Brandlumeo Services Overview">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Kerala &amp; UAE&apos;s Premier Growth Agency</span>
          <h1 className="rn-display">We Make Brands in Digital Markets</h1>
          <div className="rn-hero-row">
            <p className="rn-lead">Full-funnel digital marketing — SEO, Paid Ads, Social Media &amp; Brand Strategy — built for measurable revenue growth across Kerala and GCC markets.</p>
            <div className="rn-actions">
              <Link href="/contact" className="rn-btn rn-btn--solid">Book a Free Audit</Link>
              <a href="#branding-services" className="rn-btn rn-btn--outline">Explore Services</a>
            </div>
          </div>
          <div className="rn-media">
            <img src="/images/services-hero.png" alt="Digital agency marketing team" />
          </div>
          <div className="rn-stats">
            {stats.map((s) => (
              <div key={s.label} className="rn-stat">
                <div className="rn-stat__num">{s.num}</div>
                <div className="rn-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="What we do">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">What We Do</h2>
          {focusAreas.map((area, i) => (
            <article key={area.id} id={area.id} className={`rn-split${i % 2 ? ' rn-split--reverse' : ''}`}>
              <div className="rn-split__media">
                <img src={area.img} alt={area.title} loading="lazy" />
              </div>
              <div className="rn-split__body">
                <span className="rn-eyebrow">{area.eyebrow}</span>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <div className="rn-services__grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px 24px' }}>
                  {area.services.map((s) => (
                    <p key={s.title} className="rn-caption" style={{ margin: 0, fontSize: '16px' }}>
                      <strong>{s.title}</strong><br />{s.desc}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rn-section" aria-label="All services">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">Every Service</h2>
          <div className="rn-services__grid">
            {SERVICE_SECTIONS.map((section) => (
              <div key={section.id} className="rn-services__col">
                <h3>{section.name}</h3>
                <ul>
                  {section.services.map((s) => (
                    <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Engagement models">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">How We Work Together</h2>
          <p className="rn-lead" style={{ maxWidth: '60ch', marginBottom: 'clamp(32px, 4vw, 56px)' }}>
            Flexible engagement models designed to match your growth stage and budget.
          </p>
          <div className="rn-card-grid">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`rn-card${pkg.featured ? ' rn-card--featured' : ''}`}>
                <h3>{pkg.name}</h3>
                <p>{pkg.desc}</p>
                <ul>{pkg.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link href="/contact" className={`rn-btn ${pkg.featured ? 'rn-btn--solid' : 'rn-btn--outline'}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Book a free audit">
        <div className="rn-wrap rn-cta">
          <h2 className="rn-display rn-display--md">Ready to Grow Your Brand?</h2>
          <div>
            <p className="rn-lead">Book a free strategy call and let us build a custom growth plan for your business.</p>
            <Link href="/contact" className="rn-btn rn-btn--solid">Book a Free Audit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
