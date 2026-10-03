'use client';
import { useState } from 'react';
import Link from 'next/link';

const posts = [
  { title: 'Top SEO Strategies for 2024', excerpt: 'Modern search is no longer just about keywords. Discover why topical authority built by an...', img: '/images/blog/blog-seo.jpg', category: 'seo', label: 'SEO', alt: 'SEO Strategies' },
  { title: 'How Paid Ads Scale Revenue', excerpt: 'Efficiency vs. Volume: A deep-dive into the algorithmic shifts of Meta and Google Ads and...', img: '/images/blog/blog-paid.jpg', category: 'paid', label: 'Paid Media', alt: 'Paid Ads Strategy' },
  { title: 'Crafting a Memorable Brand Identity in the AI Era', excerpt: 'In an era of rapid AI content generation, authentic brand identity and story stand out more than ever...', img: '/images/services/branding-identity.jpg', category: 'branding', label: 'Branding', alt: 'Brand Identity' },
  { title: 'Why Site Speed is the Ultimate Conversion Driver', excerpt: 'Every millisecond of latency costs revenue. Learn how modern responsive frameworks and clean code structure directly impact user behavior...', img: '/images/services/website.jpg', category: 'webdev', label: 'Web & App', alt: 'Responsive Website' },
  { title: 'The Evolution of Local Search and Map Pack SEO', excerpt: 'With changing user behaviors and updated maps algorithms, optimization for local visibility has evolved. Discover the new rules for local dominance...', img: '/images/services/subsections/search-engine-optimization-seo.jpg', category: 'seo', label: 'SEO', alt: 'Local SEO' },
  { title: 'Meta Ads vs. Google Ads: Where to Spend First?', excerpt: 'A comparative breakdown of search intent vs. social interruption marketing, helping you allocate budget for maximum early ROI...', img: '/images/services/subsections/ppc-advertising.jpg', category: 'paid', label: 'Paid Media', alt: 'Meta vs Google Ads' },
];

const filters = [
  { key: 'all', label: 'All Insights' },
  { key: 'seo', label: 'SEO' },
  { key: 'paid', label: 'Paid Media' },
  { key: 'branding', label: 'Branding' },
  { key: 'webdev', label: 'Web & App' },
];

export default function BlogPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <section className="rn-page-hero" aria-label="Featured insight">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Featured Insight</span>
          <h1 className="rn-display">The Future of Full-Funnel Growth</h1>
          <div className="rn-hero-row">
            <p className="rn-lead">Navigating the shift from transactional acquisition to lifecycle mastery in an AI-driven market.</p>
            <div className="rn-actions">
              <Link href="/contact" className="rn-btn rn-btn--outline">Read Article</Link>
            </div>
          </div>
          <div className="rn-media">
            <img src="/images/blog/blog-hero.jpg" alt="Full-Funnel Growth Strategy" />
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Latest insights">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">Insights</h2>
          <div className="rn-filters" role="group" aria-label="Filter by topic">
            {filters.map((f) => (
              <button
                suppressHydrationWarning
                key={f.key}
                type="button"
                className={active === f.key ? 'is-active' : undefined}
                aria-pressed={active === f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="rn-post-grid">
            {filtered.map((post) => (
              <article key={post.title} className="rn-post">
                <Link href="/contact" className="rn-work-card">
                  <div className="rn-work-card__media">
                    <img src={post.img} alt={post.alt} loading="lazy" />
                  </div>
                  <p className="rn-caption"><strong>{post.title}</strong> {post.label}</p>
                  <p className="rn-post__excerpt">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Quote">
        <div className="rn-wrap">
          <blockquote className="rn-quote">&ldquo;The most dangerous phrase in business is &lsquo;we&apos;ve always done it this way.&rsquo;&rdquo;</blockquote>
          <p className="rn-quote-by">Grace Hopper</p>
        </div>
      </section>

      <section className="rn-section" aria-label="Newsletter">
        <div className="rn-wrap">
          <div className="rn-newsletter">
            <span className="rn-eyebrow">Stay Ahead</span>
            <h2 className="rn-display rn-display--md">Monthly Insights</h2>
            <div className="rn-newsletter__body">
              <p><strong>Want monthly insights?</strong> Receive executive summaries of the most impactful trends in digital marketing growth directly to your inbox.</p>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <input suppressHydrationWarning type="email" placeholder="Email Address" aria-label="Email Address" required />
                <button suppressHydrationWarning type="submit">Subscribe Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
