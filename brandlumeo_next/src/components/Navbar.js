'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`rn-nav${scrolled ? ' is-scrolled' : ''}`}>
        <Link href="/" className="rn-nav__logo" aria-label="Brandlumeo home">
          <Image src="/images/logo-icon.png" alt="Brandlumeo" width={150} height={36} priority />
        </Link>
        <nav className="rn-nav__links" aria-label="Main">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <Link href="/contact" className="rn-nav__cta">Connect</Link>
        </nav>
        <button className="nav-toggle rn-nav__toggle" id="nav-toggle" aria-label="Toggle Navigation" aria-expanded="false">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </header>

      {/* Fullscreen Menu */}
      <div className="nav-menu-modal" id="nav-menu-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <div className="nav-modal-backdrop" id="nav-modal-backdrop"></div>
        <div className="nav-modal-content">
          <div className="nav-modal-header">
            <Link href="/" className="logo modal-logo">
              <Image src="/images/logo-icon.png" alt="Brandlumeo Logo" width={140} height={40} />
            </Link>
            <button className="nav-modal-close" id="nav-modal-close" aria-label="Close Menu">
              <span className="close-line"></span>
              <span className="close-line"></span>
            </button>
          </div>
          <nav className="nav-modal-center">
            <ul className="nav-modal-links">
              <li><Link href="/" className="nav-modal-link"><span className="nav-link-text">Home</span><span className="nav-link-arrow">→</span></Link></li>
              <li><Link href="/services" className="nav-modal-link"><span className="nav-link-text">Services</span><span className="nav-link-arrow">→</span></Link></li>
              <li><Link href="/about" className="nav-modal-link"><span className="nav-link-text">About</span><span className="nav-link-arrow">→</span></Link></li>
              <li><Link href="/portfolio" className="nav-modal-link"><span className="nav-link-text">Portfolio</span><span className="nav-link-arrow">→</span></Link></li>
              <li><Link href="/blog" className="nav-modal-link"><span className="nav-link-text">Blog</span><span className="nav-link-arrow">→</span></Link></li>
              <li><Link href="/contact" className="nav-modal-link"><span className="nav-link-text">Contact</span><span className="nav-link-arrow">→</span></Link></li>
            </ul>
          </nav>
          <div className="nav-modal-footer">
            <div className="nav-modal-footer-col">
              <a href="mailto:info@brandlumeo.com">info@brandlumeo.com</a>
              <a href="tel:+919746457565">+91 9746 457 565</a>
            </div>
            <div className="nav-modal-footer-col nav-modal-social-row">
              <a href="https://www.linkedin.com/company/111710517/" target="_blank" rel="noopener noreferrer">Li</a>
              <a href="https://www.instagram.com/brandlumeo_/" target="_blank" rel="noopener noreferrer">Ig</a>
              <a href="https://www.facebook.com/profile.php?id=61586554286960" target="_blank" rel="noopener noreferrer">Fb</a>
            </div>
            <div className="nav-modal-footer-col">
              <span>© 2026 Brandlumeo LLP</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
