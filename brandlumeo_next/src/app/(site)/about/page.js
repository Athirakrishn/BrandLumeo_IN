import Link from 'next/link';
import LetterReveal from '@/components/LetterReveal';
import Us3D from '@/components/Us3D';

export const metadata = { title: 'About Brandlumeo – Digital Marketing Agency Kerala & UAE' };

const culture = [
  { img: '/images/about-culture-1.png', name: 'Data-driven', desc: 'Every decision backed by numbers' },
  { img: '/images/about-culture-2.png', name: 'Creative', desc: 'Storytelling that converts' },
  { img: '/images/about-culture-3.png', name: 'Accountable', desc: 'Real results, not vanity metrics' },
];

const experts = [
  { name: 'Fathimathul Asna', role: 'Digital Marketing', img: '/images/team/asna.png' },
  { name: 'Fasumina', role: 'Digital Marketing', img: '/images/team/faumina.png' },
  { name: 'Varsha', role: 'Content Creator', img: '/images/team/varsha.png' },
  { name: 'Mubsina', role: 'Content Creator', img: '/images/team/mubsina.png' },
  { name: 'Muhammad Shamil', role: 'Full Stack Developer', img: '/images/team/shamil.png' },
  { name: 'Athira', role: 'Full Stack Developer', img: '/images/team/athira.png' },
  { name: 'Rabheeh Muhammad Sali', role: 'Full Stack Developer', img: '/images/team/rabeeh.png' },
  { name: 'Ashifa', role: 'Client Relationship', img: '/images/team/ashifa.png' },
  { name: 'Muhammad Shamir', role: 'Video Editor', img: '/images/team/shamir.png' },
];

export default function AboutPage() {
  return (
    <>
      <section className="rn-page-hero about-hero" aria-label="About Brandlumeo">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Kerala &amp; UAE&apos;s Premier Digital Growth Agency</span>
          <h1 className="about-hero__title letter-reveal--drop">
            <LetterReveal as="span" text="About" variant="drop" delay={0.2} stagger={0.08} />
            <Us3D delay={0.65} />
          </h1>
          <LetterReveal
            text="Brandlumeo is a Full-Funnel Digital Marketing Agency. Growing ambitious brands across Kerala & the GCC — strategy, creative and performance under one roof."
            variant="rise"
            className="about-hero__intro"
            delay={0.9}
            stagger={0.012}
          />
          <div className="rn-hero-row">
            <p className="rn-lead">
              Brandlumeo LLP is a full-service digital marketing agency headquartered in Kozhikode, Kerala. We partner with growth-focused brands across India and the GCC to build measurable, sustainable digital presence through SEO, paid advertising, brand strategy, and content.
            </p>
            <div className="rn-actions">
              <Link href="/contact" className="rn-btn rn-btn--solid">Work With Us</Link>
            </div>
          </div>
          <div className="rn-media">
            <img src="/images/about-hero.png" alt="The Brandlumeo team at work" />
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Our mission">
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">Our Mission</h2>
          <div className="rn-services">
            <p className="rn-lead">
              Founded with the mission of making premium digital marketing accessible to ambitious businesses, we combine data-driven thinking with creative storytelling to deliver real results — not vanity metrics.
            </p>
            <div className="rn-post-grid">
              {culture.map((item) => (
                <div key={item.name} className="rn-post">
                  <div className="rn-work-card__media">
                    <img src={item.img} alt={item.name} loading="lazy" />
                  </div>
                  <p className="rn-caption"><strong>{item.name}</strong> {item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rn-section" id="team" aria-label="Our experts">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Our Experts</span>
          <h2 className="rn-display rn-display--md">BrandLumeo Growth Squad</h2>
          <p className="rn-lead" style={{ maxWidth: '60ch', marginBottom: 'clamp(32px, 4vw, 56px)' }}>
            Our dedicated squads operate at the intersection of media buying, technology, and copy to drive compounding business results.
          </p>
          <div className="rn-team-grid rn-team-grid--experts">
            {experts.map((person) => (
              <article key={person.name} className="rn-team-card">
                <div className="rn-team-card__media">
                  <img src={person.img} alt={person.name} loading="lazy" />
                </div>
                <p className="rn-caption"><strong>{person.name}</strong> {person.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
