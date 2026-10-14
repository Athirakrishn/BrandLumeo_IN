import Link from 'next/link';

export const metadata = {
  title: 'Portfolio – Client Work & Case Studies | Brandlumeo',
  description: "Explore Brandlumeo's portfolio of digital marketing projects across SEO, paid ads, brand strategy, and content — delivering measurable results for brands in Kerala and GCC.",
};

const projects = [
  { name: 'Otomation', cat: 'E-Invoice Platform', img: '/images/portfolio/otomation.png', logo: 'logo-otomation.png', desc: 'Invoice automation workflows, cleaner billing flow, and better operational clarity. We built a content and SEO strategy that positioned Otomation as the go-to platform for invoice compliance.', metrics: [{ val: '2.8x', label: 'Lead growth' }, { val: '40%', label: 'Lower CAC' }], tags: ['SEO', 'Content Strategy', 'Lead Generation'] },
  { name: 'Skylightstudio', cat: 'Light Shop', img: '/images/portfolio/skylight.png', logo: 'logo-skylight.png', desc: 'Premium catalog storytelling and conversion-focused browsing for lighting products. We redesigned their digital presence to match the luxury of their physical showroom experience.', metrics: [{ val: '+65%', label: 'Organic traffic' }, { val: '3.1x', label: 'Inquiry rate' }], tags: ['Brand Strategy', 'Paid Ads', 'Social Media'] },
  { name: 'Nutrihive Healthcare', cat: 'Healthcare & Wellness', img: '/images/portfolio/nutrihive.png', logo: 'logo-nutrihive.png', desc: 'Clinical credibility framework with content-driven lead generation across health verticals. We built a trust-first brand architecture that converted curiosity into qualified consultations.', metrics: [{ val: '+180%', label: 'Qualified leads' }, { val: '4.2x', label: 'ROAS' }], tags: ['Performance Ads', 'Content Marketing', 'SEO'] },
  { name: 'Bellwether Trading LLP', cat: 'B2B Trading', img: '/images/portfolio/bellwether.png', desc: 'Market authority positioning and streamlined enterprise buyer inquiry systems. We repositioned Bellwether from a generic trading firm to a recognised authority in commodity markets.', metrics: [{ val: '+120%', label: 'Enterprise inquiries' }, { val: '55%', label: 'Shorter sales cycle' }], tags: ['Brand Positioning', 'LinkedIn Ads', 'SEO'] },
  { name: 'Eyetrack', cat: 'CCTV & Security', img: '/images/portfolio/eyetrack.png', logo: 'Eyetrack_logo-trim.png', desc: 'A sharper, trust-led brand presence for security and surveillance solutions — built to turn local searches into site-survey requests.', tags: ['Brand Identity', 'Local SEO', 'Paid Ads'] },
  { name: 'Petalbox', cat: 'Gifting & Florals', img: '/images/portfolio/petal.png', logo: 'logo-petalbox.png', desc: 'Scroll-stopping product storytelling for curated gift boxes, with social campaigns timed around the moments people shop for.', tags: ['Social Media', 'Content Creation', 'Performance Ads'] },
];

// Brands we work with that don't have a full case study on this page yet
const moreClients = [
  { name: 'Edufix', logo: 'logo-edufix.png' },
  { name: 'SA Vision', logo: 'logo-sa-vision-hd.png' },
  { name: 'Codeboost', logo: 'logo-codeboost.png' },
  { name: 'Hearts', logo: 'logo-hearts.png' },
  { name: 'Elvessora', logo: 'Elvessora_logo-trim.png' },
  { name: 'Infinity', logo: 'infinity_logo-trim.png' },
  { name: 'Best Flowers', logo: 'bestflowers_logo.jpeg' },
];

const stats = [
  { num: <>10<span>+</span></>, label: 'Client brands' },
  { num: <>320<span>+</span></>, label: 'Campaigns delivered' },
  { num: <>3<span>x</span></>, label: 'Average ROI' },
  { num: '6', label: 'Industry verticals' },
];

const results = [
  { num: <>+180<span>%</span></>, title: 'Average Lead Growth', desc: 'Across SEO and paid campaigns over 6 months.' },
  { num: <>4.2<span>x</span></>, title: 'Average ROAS', desc: 'Return on ad spend across all paid media campaigns.' },
  { num: <>-40<span>%</span></>, title: 'Customer Acquisition Cost', desc: 'Reduction in CAC through funnel optimization.' },
  { num: <>+120<span>%</span></>, title: 'Organic Traffic', desc: 'Growth in organic search traffic through SEO strategies.' },
  { num: <>3.1<span>x</span></>, title: 'Inquiry Rate Increase', desc: 'Higher inquiry conversion from improved brand positioning.' },
  { num: <>7<span>+</span></>, title: 'Brands Transformed', desc: 'Across healthcare, tech, retail, and B2B verticals.' },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="rn-page-hero" aria-label="Brandlumeo Portfolio">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Our Work</span>
          <h1 className="rn-display">Campaigns That Deliver Real Results</h1>
          <div className="rn-hero-row">
            <p className="rn-lead">Explore selected client projects across SEO, paid media, brand strategy, and content — every engagement built around measurable outcomes and lasting growth.</p>
            <div className="rn-actions">
              <Link href="/contact" className="rn-btn rn-btn--solid">Start a Project</Link>
              <Link href="/services" className="rn-btn rn-btn--outline">View Services</Link>
            </div>
          </div>
          <div className="rn-media">
            <img src="/images/portfolio/hero.png" alt="Brandlumeo digital marketing campaign results" />
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

      <section className="rn-section rn-eng" aria-label="Featured client projects">
        <div className="rn-wrap">
          <div className="rn-eng__head">
            <div>
              <span className="rn-eyebrow">Clients &amp; Case Studies</span>
              <h2 className="rn-display rn-display--md">Selected Engagements</h2>
            </div>
            <div className="rn-eng__intro">
              <p className="rn-lead">
                Each project represents a full-funnel engagement — from discovery and strategy to execution and performance measurement. No vanity metrics, only business outcomes.
              </p>
              <div className="rn-eng__count">
                <strong>{projects.length + moreClients.length}</strong>
                <span>brands we&apos;ve partnered with</span>
              </div>
            </div>
          </div>

          <div className="rn-eng__grid">
            {projects.map((project, i) => (
              <article key={project.name} className="rn-eng-card" aria-label={`${project.name} project`}>
                <div className="rn-eng-card__media">
                  <img src={project.img} alt={project.name} loading="lazy" />
                  <span className="rn-eng-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rn-eng-card__logo">
                    {project.logo
                      ? <img src={`/images/homepage/${project.logo}`} alt={`${project.name} logo`} loading="lazy" />
                      : <b>{project.name}</b>}
                  </span>
                </div>
                <div className="rn-eng-card__body">
                  <span className="rn-eng-card__cat">{project.cat}</span>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  {project.metrics && (
                    <div className="rn-eng-card__metrics">
                      {project.metrics.map((m) => (
                        <div key={m.label}><strong>{m.val}</strong><span>{m.label}</span></div>
                      ))}
                    </div>
                  )}
                  <ul className="rn-tags">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="rn-eng__more">
            <h3>Also trusted by</h3>
            <ul className="rn-eng__logos">
              {moreClients.map((client) => (
                <li key={client.name}>
                  <span className="rn-eng__logo-tile">
                    <img src={`/images/homepage/${client.logo}`} alt={client.name} loading="lazy" />
                  </span>
                  <span className="rn-eng__logo-name">{client.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Campaign results overview">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">Numbers That Matter</h2>
          <p className="rn-lead" style={{ maxWidth: '60ch', marginBottom: 'clamp(32px, 4vw, 56px)' }}>
            Aggregated across all client campaigns, these are the outcomes we consistently deliver.
          </p>
          <div className="rn-card-grid">
            {results.map((r) => (
              <div key={r.title} className="rn-card">
                <div className="rn-card__num">{r.num}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Start a project">
        <div className="rn-wrap rn-cta">
          <h2 className="rn-display rn-display--md">Want Results Like These?</h2>
          <div>
            <p className="rn-lead">Book a free strategy call and let&apos;s plan your growth roadmap together.</p>
            <Link href="/contact" className="rn-btn rn-btn--solid">Start a Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
