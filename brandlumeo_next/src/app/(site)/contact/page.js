'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/111710517/', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/brandlumeo_/', label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=61586554286960', label: 'Facebook' },
];

export default function ContactPage() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const data = Object.fromEntries(new FormData(e.target));
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
      <section className="rn-page-hero" aria-label="Contact Brandlumeo">
        <div className="rn-wrap">
          <span className="rn-eyebrow">Connect With Us</span>
          <h1 className="rn-display">Let&apos;s Build Something Extraordinary</h1>
          <p className="rn-lead" style={{ maxWidth: '56ch' }}>
            Have a project in mind, need a consultation, or want a free audit? Drop us a line and let&apos;s start scaling your business predictably.
          </p>
        </div>
      </section>

      <section className="rn-section" aria-label="Contact details and form">
        <div className="rn-wrap rn-contact">
          <div>
            <p className="rn-lead" style={{ marginBottom: '40px' }}>Tell us about your goals and timeline. Our team typically responds within 24 hours.</p>
            <div className="rn-info">
              <div><h4>Email us</h4><a href="mailto:info@brandlumeo.com">info@brandlumeo.com</a></div>
              <div><h4>Call us</h4><a href="tel:+919746457565">+91 9746457565</a></div>
              <div><h4>Office address</h4><p>Payyoli - Perambra Rd, Kozhikode, Kerala 673522</p></div>
              <div><h4>Working hours</h4><p>Mon - Sat: 9:00 AM - 6:00 PM</p></div>
              <div>
                <h4>Follow our journey</h4>
                <ul className="rn-tags" style={{ marginTop: '4px' }}>
                  {SOCIALS.map((s) => (
                    <li key={s.label} style={{ padding: 0, border: 0 }}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="rn-eyebrow" style={{ fontSize: '14px' }}>Send a message</h2>
            <form className="rn-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="rn-form__error" role="alert">{errorMsg || 'Something went wrong. Please try again or email us directly.'}</div>
              )}
              <input type="text" name="name" placeholder="Your Name" aria-label="Your Name" required />
              <input type="email" name="email" placeholder="Email Address" aria-label="Email Address" required />
              <input type="text" name="company" placeholder="Company Name (Optional)" aria-label="Company Name" />
              <textarea name="message" placeholder="How can we help you?" aria-label="Message" required></textarea>
              <button className="rn-btn rn-btn--solid" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
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
          <div className="rn-media" style={{ aspectRatio: '21 / 8' }}>
            <iframe
              src="https://www.google.com/maps?q=11.5229744,75.6362866&z=15&output=embed"
              title="Brandlumeo location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              style={{ filter: 'grayscale(1) invert(0.92) contrast(0.9)' }}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
