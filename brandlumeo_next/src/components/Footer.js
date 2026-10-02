import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Connect' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/111710517/', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/brandlumeo_/', label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=61586554286960', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="lc-footer">
      <Link href="/contact" className="lc-footer__headline" aria-label="Let's chat — contact Brandlumeo">
        <span>Let&rsquo;s</span>
        <span>Chat</span>
      </Link>

      <div className="lc-footer__grid">
        <div className="lc-footer__contact">
          <div>
            <h4>Have a question?</h4>
            <a href="mailto:info@brandlumeo.com">info@brandlumeo.com</a>
          </div>
          <div>
            <h4>Speak to someone?</h4>
            <a href="tel:+919746457565">+91 97464 57565</a>
          </div>
          <Link href="/" className="lc-footer__logo" aria-label="Brandlumeo home">
            <Image src="/images/logo-icon.png" alt="Brandlumeo" width={140} height={34} />
          </Link>
        </div>

        <nav className="lc-footer__col" aria-label="Footer">
          <h4>Go to</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lc-footer__col">
          <h4>Follow us</h4>
          <ul>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lc-footer__col lc-footer__legal">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
            <li>
              <Link href="/cookies" className="lc-footer__cookie" aria-label="Cookie Policy" title="Cookie Policy">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
                </svg>
              </Link>
            </li>
          </ul>
          <p className="lc-footer__copy">&copy; {new Date().getFullYear()} Brandlumeo LLP</p>
        </div>
      </div>
    </footer>
  );
}
