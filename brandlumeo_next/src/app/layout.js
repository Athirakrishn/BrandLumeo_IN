import './globals.css';
import './style.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeadingTilt from '../components/HeadingTilt';
import Script from 'next/script';

export const metadata = {
  title: 'BrandLumeo LLP',
  description: 'BrandLumeo LLP is a premium digital marketing agency in Kerala and UAE offering SEO, social media marketing, Google Ads and web development.',
  metadataBase: new URL('https://brandlumeo.com'),
  openGraph: {
    siteName: 'BrandLumeo LLP',
    type: 'website',
    images: ['/images/og-brandlumeo.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  robots: 'index,follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="4W961rdZr8RWP5VJCDWml2stw9r7wu-cI7BkfmWGeKs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BrandLumeo LLP",
              "url": "https://brandlumeo.com",
              "telephone": "+91 9746457565",
              "email": "info@brandlumeo.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Payyoli - Perambra Rd",
                "addressLocality": "Kozhikode",
                "addressRegion": "Kerala",
                "postalCode": "673522",
                "addressCountry": "IN"
              },
              "areaServed": ["Kerala", "UAE"],
              "description": "Digital marketing agency providing SEO, social media marketing, Google Ads, web development and branding.",
              "logo": "https://brandlumeo.com/images/logo-icon.png"
            })
          }}
        />
        <style>{`
          @media (max-width: 768px) {
            .navbar { position:fixed!important;top:0!important;left:0!important;right:0!important;transform:none!important;width:100%!important;max-width:100%!important;border-radius:0!important;margin:0!important;padding:12px 20px!important;display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;flex-wrap:nowrap!important;background-color:transparent!important;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:none!important;box-shadow:none!important;z-index:1000!important; }
          }
          html,body{max-width:100vw;overflow-x:hidden;-webkit-text-size-adjust:100%;}
          img,svg,video,canvas,iframe{max-width:100%;height:auto;}
          @media(max-width:768px){
            .sv-hero,.pf-hero,.cn-hero,section[role="banner"]{padding-left:0!important;padding-right:0!important;margin-left:0!important;margin-right:0!important;width:100%!important;max-width:100%!important;}
          }
        `}</style>
      </head>
      <body>

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4E32TBWQW7" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4E32TBWQW7');
        `}</Script>

        <Navbar />
        <main>{children}</main>
        <Footer />
        <HeadingTilt />

        {/* Cookie Consent */}
        <div className="cookie-consent" id="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <div className="container cookie-consent-inner">
            <div className="cookie-consent-copy">
              <p>We use cookies for essential functionality and analytics. See our <a href="/cookies">Cookie Policy</a>.</p>
            </div>
            <div className="cookie-consent-actions">
              <button type="button" className="btn btn-secondary cookie-btn" id="cookie-decline">Decline</button>
              <button type="button" className="btn cookie-btn" id="cookie-accept">Accept</button>
            </div>
          </div>
        </div>

        <Script id="base-scripts" strategy="afterInteractive">{`
          (function(){
            var toggle=document.getElementById("nav-toggle");
            var modal=document.getElementById("nav-menu-modal");
            var closeBtn=document.getElementById("nav-modal-close");
            var backdrop=document.getElementById("nav-modal-backdrop");
            var modalLinks=document.querySelectorAll(".nav-modal-links a");
            if(toggle&&modal){
              var openMenu=function(){modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");toggle.setAttribute("aria-expanded","true");document.body.classList.add("menu-modal-open");};
              var closeMenu=function(){modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-modal-open");};
              toggle.addEventListener("click",openMenu);
              if(closeBtn)closeBtn.addEventListener("click",closeMenu);
              if(backdrop)backdrop.addEventListener("click",closeMenu);
              modalLinks.forEach(function(link){link.addEventListener("click",closeMenu);});
            }
            var navbar=document.querySelector(".navbar");
            var hero=document.querySelector(".hl-hero,.hero-scroll-container,.sv-hero,.ab-hero,.pf-hero,.cn-hero,.page-header,.service-detail-hero,.blog-hero");
            if(navbar){
              if(hero){
                var handleScroll=function(){var heroHeight=hero.offsetHeight>0?hero.offsetHeight:(window.innerHeight*2);var navbarHeight=navbar.offsetHeight>0?navbar.offsetHeight:80;var threshold=heroHeight-navbarHeight;if(window.scrollY>=threshold){navbar.classList.add("is-scrolled");}else{navbar.classList.remove("is-scrolled");}};
                window.addEventListener("scroll",handleScroll,{passive:true});handleScroll();
              }else{navbar.classList.add("is-scrolled");}
            }
            var banner=document.getElementById("cookie-consent");
            var acceptBtn=document.getElementById("cookie-accept");
            var declineBtn=document.getElementById("cookie-decline");
            var consentKey="brandlumeo_cookie_consent";
            if(banner){
              var stored=localStorage.getItem(consentKey);
              if(stored){banner.style.display="none";}
              if(acceptBtn)acceptBtn.addEventListener("click",function(){localStorage.setItem(consentKey,"accepted");banner.style.display="none";});
              if(declineBtn)declineBtn.addEventListener("click",function(){localStorage.setItem(consentKey,"declined");banner.style.display="none";});
            }
            var prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var revealSelector=["main > section","main > .rn-page > section",".section-heading",".service-card",".process-card",".value-card",".portfolio-card",".blog-card",".contact-item",".contact-form-box",".leader-card",".solution-card"].join(", ");
            var revealElements=Array.from(new Set(document.querySelectorAll(revealSelector)));
            revealElements.forEach(function(el,i){el.classList.add("reveal-on-scroll");el.style.setProperty("--reveal-delay",(i%6*70)+"ms");});
            if(prefersReducedMotion||!("IntersectionObserver"in window)){revealElements.forEach(function(el){el.classList.add("is-visible");});}
            else{var obs=new IntersectionObserver(function(entries,o){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-visible");o.unobserve(e.target);}});},{threshold:0,rootMargin:"0px 0px -5% 0px"});revealElements.forEach(function(el){obs.observe(el);});}
          })();
        `}</Script>
      </body>
    </html>
  );
}
