import Link from 'next/link';

export const metadata = {
  title: 'Thank You | BrandLumeo LLP',
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="rn-page-hero rn-section" aria-label="Thank you">
      <div className="rn-wrap">
        <span className="rn-eyebrow">Message received</span>
        <h1 className="rn-display">Thank You</h1>
        <div className="rn-hero-row">
          <p className="rn-lead">
            Your message has been received. Our team will reach out within 24 hours. In the meantime, you can explore our latest case studies or learn more about our services.
          </p>
          <div className="rn-actions">
            <Link href="/portfolio" className="rn-btn rn-btn--solid">View Case Studies</Link>
            <Link href="/services" className="rn-btn rn-btn--outline">Explore Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
