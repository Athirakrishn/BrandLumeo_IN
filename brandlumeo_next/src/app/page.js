import Link from 'next/link';
import Script from 'next/script';
import HomeHero from '../components/HomeHero';
import { SERVICE_SECTIONS } from '@/data/services';

export const metadata = {
  title: 'BrandLumeo LLP – Digital Marketing Agency in Kerala & UAE',
  description: 'Full-funnel digital marketing — SEO, Paid Ads, Social Media & Brand Strategy — built for measurable revenue growth across Kerala and GCC markets.',
  alternates: { canonical: 'https://brandlumeo.com/' },
};

const work = [
  { name: 'Otomation', cat: 'E-Invoice Platform', img: '/images/portfolio/otomation.png' },
  { name: 'Skylightstudio', cat: 'Premium Lighting Retail', img: '/images/portfolio/skylight.png' },
  { name: 'Nutrihive Healthcare', cat: 'Healthcare & Wellness', img: '/images/portfolio/nutrihive.png' },
  { name: 'Bellwether Trading', cat: 'B2B Commodity Trading', img: '/images/portfolio/bellwether.png' },
];

const leaders = [
  { name: 'MUHAMMAD\nAFTHAB', title: 'CEO', img: '/images/team/muhammad.jpg', color: '#3b82f6', bio: 'Muhammad Afthab is the Chief Executive Officer leading Brandlumeo with a vision for growth. He is known for fostering innovation and scalable strategies.' },
  { name: 'MIDHUN\nASOK', title: 'COO', img: '/images/team/midhun.png', color: '#e11d48', bio: 'Midhun Asok is the Chief Operating Officer dedicated to promoting sustainable execution, ensuring all campaigns meet our high standards.' },
  { name: 'SHANAVAS', title: 'CFO', img: '/images/team/shanavas.jpg', color: '#8b5cf6', bio: 'Shanavas is the Chief Financial Officer ensuring the fiscal health and strategic investments of Brandlumeo, enabling our continuous market expansion.' },
  { name: 'SHARAFUDEEN', title: 'General Manager', img: '/images/team/sharafudeen.png', color: '#eab308', bio: 'Sharafudeen is the General Manager driving operational excellence. Known for streamlining processes and delivering strategic growth solutions.' },
  { name: 'MUHAMMAD\nRASAL FARHAN', title: 'BDM', img: '/images/team/farhan.jpg', color: '#10b981', bio: 'Muhammad Rasal Farhan is the Business Development Manager, driving strategic partnerships and growth initiatives to scale Brandlumeo\'s presence.' },
];

const logos = ['logo-edufix.png','logo-sa-vision-hd.png','logo-codeboost.png','logo-hearts.png','logo-petalbox.png','logo-otomation.png','logo-skylight.png'];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section id="hero" className="hh-hero" aria-label="Brandlumeo Digital Marketing Agency">
        {/* BRAND / LUMEO title, then a scrolling film strip */}
        <HomeHero />
      </section>

      {/* INTRO BAR */}
      <section className="rn-intro" aria-label="About Brandlumeo">
        <div className="rn-wrap rn-intro__inner">
          <p>Full-funnel digital marketing for ambitious brands across Kerala &amp; the GCC — strategy, creative and performance under one roof.</p>
          <a href="#services" className="rn-btn rn-btn--outline">What we do</a>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="logo-strip" aria-label="Clients and projects">
        <div className="team-scroll-wrap" data-team-scroll-wrap>
          <div className="team-scroll-track">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="team-scroll-card">
                <img src={`/images/homepage/${logo}`} alt={logo.replace('logo-','').replace('.png','').replace('.jpg','')} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="rn-section" aria-label="Our work">
        <div className="rn-wrap">
          <h2 className="rn-display">Our Work</h2>
          <div className="rn-work-grid">
            {work.map((item) => (
              <Link key={item.name} href="/portfolio" className="rn-work-card">
                <div className="rn-work-card__media">
                  <img src={item.img} alt={`${item.name} – ${item.cat}`} loading="lazy" />
                </div>
                <p className="rn-caption"><strong>{item.name}</strong> {item.cat}</p>
              </Link>
            ))}
          </div>
          <div className="rn-section__actions">
            <Link href="/portfolio" className="rn-btn rn-btn--outline">More Work</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="rn-section" id="services" aria-label="Digital marketing services">
        <div className="rn-wrap">
          <h2 className="rn-display">Full-Funnel Growth, Built For You</h2>
          <div className="rn-services">
            <p className="rn-lead">Strategy + creative + performance execution — built to increase visibility, leads, and revenue. Ideal for brands in Kerala and GCC markets.</p>
            <div className="rn-services__grid">
              {SERVICE_SECTIONS.map((section) => (
                <div key={section.id} className="rn-services__col">
                  <h3>{section.quick_label}</h3>
                  <ul>
                    {section.services.slice(0, 4).map((s) => (
                      <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="rn-section__actions">
            <Link href="/services" className="rn-btn rn-btn--outline">Our Services</Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="rn-section" aria-label="Our leadership team">
        <div className="rn-wrap">
          <h2 className="rn-display">Leadership</h2>
          <div className="rn-team-grid">
            {leaders.map((leader) => (
              <article key={leader.name} className="rn-team-card">
                <div className="rn-team-card__media">
                  <img src={leader.img} alt={leader.name.replace('\n', ' ')} loading="lazy" />
                </div>
                <p className="rn-caption"><strong>{leader.name.replace('\n', ' ')}</strong> {leader.title}</p>
                <p className="rn-team-card__bio">{leader.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-faq-section" aria-label="Frequently asked questions">
        <div className="container home-faq-container">
          <div className="home-faq-left">
            <h2 className="home-faq-title" aria-label="Frequently Asked Questions">FAQ</h2>
            <p>Quick answers to common questions from new clients. Can&apos;t find what you are looking for?</p>
            <Link href="/contact" className="btn-consultation">
              Ask a Question
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="home-faq-accordion">
            {[
              { q: 'How soon can we launch?', a: 'Most projects begin within 7–14 days after discovery and access setup.' },
              { q: 'Do you work with internal teams?', a: 'Yes. We collaborate with in-house marketers, founders, and sales teams.' },
              { q: 'What does reporting include?', a: 'KPI movement, channel insights, test outcomes, and next-step action plans.' },
              { q: 'Can you support multiple markets?', a: 'Yes. We build region-specific campaigns for local, national, and international growth.' },
            ].map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-trigger" aria-expanded="false">
                  <span className="faq-plus" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg></span>
                  <span>{faq.q}</span>
                </button>
                <div className="faq-content"><div className="faq-content-inner"><p>{faq.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How soon can we launch?", "acceptedAnswer": { "@type": "Answer", "text": "Most projects begin within 7–14 days after discovery and access setup." } },
            { "@type": "Question", "name": "Do you work with internal teams?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We collaborate with in-house marketers, founders, and sales teams." } },
            { "@type": "Question", "name": "What does reporting include?", "acceptedAnswer": { "@type": "Answer", "text": "Reporting includes KPI movement, channel-level insights, experiment outcomes, and a clear next-step plan." } },
            { "@type": "Question", "name": "Can you support multiple markets?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We run region-specific campaigns for local, national, and international growth." } },
          ]
        })}} />
      </section>

      <Script id="home-scripts" strategy="afterInteractive">{`
        (function(){
          var faqTriggers=document.querySelectorAll(".faq-trigger");
          faqTriggers.forEach(function(trigger){
            trigger.addEventListener("click",function(){
              var item=this.parentElement;
              var isOpen=item.classList.contains("is-open");
              document.querySelectorAll(".faq-item").forEach(function(el){el.classList.remove("is-open");el.querySelector(".faq-trigger").setAttribute("aria-expanded","false");});
              if(!isOpen){item.classList.add("is-open");this.setAttribute("aria-expanded","true");}
            });
          });
          var teamScrollWrap=document.querySelector("[data-team-scroll-wrap]");
          if(teamScrollWrap){
            var track=teamScrollWrap.querySelector(".team-scroll-track");
            if(track){
              var speed=1;var pos=track.scrollWidth/2;
              function autoScroll(){pos-=speed;if(pos<=0){pos=track.scrollWidth/2;}teamScrollWrap.scrollLeft=pos;requestAnimationFrame(autoScroll);}
              autoScroll();
            }
          }
        })();
      `}</Script>
    </>
  );
}
