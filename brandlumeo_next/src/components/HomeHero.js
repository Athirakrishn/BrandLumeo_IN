
// Film strip frames live in /public/images/scrolling (0.jpeg, 1.jpeg, ...).
const FILM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14].map((n) => ({
  src: `/images/scrolling/${n}.jpeg`,
  alt: 'Brandlumeo work and culture',
}));

// Home hero: giant BRAND / LUMEO title followed by a scrolling film strip of our work.
export default function HomeHero() {
  return (
    <>
      <div className="hh-intro">
        <h1 className="hh-title">
          <span className="sr-only">BrandLumeo LLP – Digital Marketing Agency in Kerala &amp; UAE</span>
          <span className="hh-title__brand" aria-hidden="true">Brand</span>
          <span className="hh-title__lumeo" aria-hidden="true">Lumeo</span>
        </h1>
      </div>

      <div className="hh-film" aria-label="Our work and culture">
        <div className="hh-film__track">
          {[...FILM, ...FILM].map((frame, i) => (
            <div key={i} className="hh-film__frame" aria-hidden={i >= FILM.length ? 'true' : undefined}>
              <img src={frame.src} alt={i >= FILM.length ? '' : frame.alt} loading="lazy" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
