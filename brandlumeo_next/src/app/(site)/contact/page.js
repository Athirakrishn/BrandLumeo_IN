'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/111710517/', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/brandlumeo_/', label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=61586554286960', label: 'Facebook' },
];

const INTERESTS = ['Branding', 'SEO', 'Paid Ads', 'Social Media', 'Website / App', 'Content & Video'];

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const ICONS = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
  arrow: <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" /></>,
};

export default function ContactPage() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);

  const toggleInterest = (item) =>
    setInterests((list) => (list.includes(item) ? list.filter((i) => i !== item) : [...list, item]));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const data = { ...Object.fromEntries(new FormData(e.target)), interests: interests.join(', ') };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { router.push('/thank-you'); return; }
      const body = await res.json().catch(() => ({}));
      setErrorMsg(body.error || '');
      setStatus('error');
    } catch { setStatus('error'); }
    setLoading(false);
  }

  return (
    <>
      <section className="rn-page-hero ct-hero" aria-label="Contact Brandlumeo">
        <div className="ct-hero__glow" aria-hidden="true" />
        <div className="rn-wrap">
          <span className="ct-badge"><i />Typically replies within 24 hours</span>
          <h1 className="rn-display">Let&apos;s Build Something Extraordinary</h1>
          <p className="rn-lead" style={{ maxWidth: '56ch' }}>
            Have a project in mind, need a consultation, or want a free audit? Drop us a line and let&apos;s start scaling your business predictably.
          </p>
        </div>
      </section>

      <section className="rn-section ct-main" aria-label="Contact details and form">
        <div className="rn-wrap ct-grid">
          <aside className="ct-panel">
            <span className="ct-kicker">Contact details</span>
            <h2 className="ct-panel__title">Talk to a strategist, not a salesperson.</h2>

            <div className="ct-rows">
              <a className="ct-row" href="mailto:info@brandlumeo.com">
                <span className="ct-row__icon"><Icon d={ICONS.mail} /></span>
                <span className="ct-row__text"><small>Email us</small>info@brandlumeo.com</span>
                <span className="ct-row__go"><Icon d={ICONS.arrow} /></span>
              </a>
              <a className="ct-row" href="tel:+919746457565">
                <span className="ct-row__icon"><Icon d={ICONS.phone} /></span>
                <span className="ct-row__text"><small>Call us</small>+91 9746457565</span>
                <span className="ct-row__go"><Icon d={ICONS.arrow} /></span>
              </a>
              <div className="ct-row">
                <span className="ct-row__icon"><Icon d={ICONS.pin} /></span>
                <span className="ct-row__text"><small>Office address</small>Payyoli - Perambra Rd, Kozhikode, Kerala 673522</span>
              </div>
              <div className="ct-row">
                <span className="ct-row__icon"><Icon d={ICONS.clock} /></span>
                <span className="ct-row__text"><small>Working hours</small>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="ct-socials">
              <small>Follow our journey</small>
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}<Icon d={ICONS.arrow} /></a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="ct-form-card">
            <span className="ct-kicker">Send a message</span>
            <h2 className="ct-panel__title">Tell us about your goals and timeline.</h2>
            <form className="ct-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="rn-form__error" role="alert">{errorMsg || 'Something went wrong. Please try again or email us directly.'}</div>
              )}

              <fieldset className="ct-chips">
                <legend>I&apos;m interested in</legend>
                {INTERESTS.map((item) => (
                  <button
                    key={item}
                    suppressHydrationWarning
                    type="button"
                    className={`ct-chip${interests.includes(item) ? ' is-on' : ''}`}
                    aria-pressed={interests.includes(item)}
                    onClick={() => toggleInterest(item)}
                  >
                    {item}
                  </button>
                ))}
              </fieldset>

              <div className="ct-fields">
                <label className="ct-field">
                  <input suppressHydrationWarning type="text" name="name" placeholder=" " required />
                  <span>Your name</span>
                </label>
                <label className="ct-field">
                  <input suppressHydrationWarning type="email" name="email" placeholder=" " required />
                  <span>Email address</span>
                </label>
                <label className="ct-field">
                  <input suppressHydrationWarning type="tel" name="phone" placeholder=" " />
                  <span>Phone (optional)</span>
                </label>
                <label className="ct-field">
                  <input suppressHydrationWarning type="text" name="company" placeholder=" " />
                  <span>Company (optional)</span>
                </label>
                <label className="ct-field ct-field--full">
                  <textarea suppressHydrationWarning name="message" placeholder=" " required></textarea>
                  <span>How can we help you?</span>
                </label>
              </div>

              <div className="ct-submit">
                <button suppressHydrationWarning className="rn-btn rn-btn--solid" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Icon d={ICONS.arrow} />}
                </button>
                <p>No spam, no pressure. Just a straight answer on how we can help.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Our location">
        <div className="rn-wrap">
          <div className="rn-cta">
            <h2 className="rn-display rn-display--md">Our Location</h2>
            <div>
              <p className="rn-lead">We welcome scheduled in-person consultations.</p>
              <a className="rn-btn rn-btn--outline" href="https://www.google.com/maps/place/Brandlumeo/@11.5229742,75.6259868" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </div>
          </div>
          <div className="ct-map">
            <iframe
              src="https://www.google.com/maps?q=11.5229744,75.6362866&z=15&output=embed"
              title="Brandlumeo location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
            <div className="ct-map__card">
              <span className="ct-row__icon"><Icon d={ICONS.pin} /></span>
              <div>
                <strong>Brandlumeo LLP</strong>
                <p>Payyoli - Perambra Rd, Kozhikode, Kerala 673522</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
