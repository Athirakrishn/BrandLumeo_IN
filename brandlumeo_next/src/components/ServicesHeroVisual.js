import ServicesHero3D from './ServicesHero3D';

const chips = [
  { label: 'SEO', x: '8%', y: '18%', d: '0s' },
  { label: 'Google Ads', x: '24%', y: '64%', d: '-2s' },
  { label: 'Meta Ads', x: '44%', y: '12%', d: '-4s' },
  { label: 'Branding', x: '6%', y: '78%', d: '-1s' },
  { label: 'Content', x: '36%', y: '40%', d: '-3s' },
  { label: 'Social', x: '52%', y: '74%', d: '-5s' },
];

const bars = [28, 36, 32, 48, 44, 58, 66, 62, 78, 92];

export default function ServicesHeroVisual() {
  return (
    <div className="shv" role="img" aria-label="Brandlumeo services driving growth: SEO, ads, branding, content and social feeding a rising revenue curve">
      <div className="shv__grid" aria-hidden="true" />
      <div className="shv__glow" aria-hidden="true" />
      <ServicesHero3D />

      <div className="shv__chips" aria-hidden="true">
        {chips.map((c) => (
          <span key={c.label} className="shv__chip" style={{ left: c.x, top: c.y, animationDelay: c.d }}>
            <i />{c.label}
          </span>
        ))}
      </div>

      <div className="shv__chart" aria-hidden="true">
        <div className="shv__bars">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${0.3 + i * 0.08}s` }} />
          ))}
        </div>
        <svg className="shv__line" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="shvFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0aa53e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0aa53e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="shv__area" d="M0,170 C60,160 90,150 130,130 S200,120 240,90 S320,50 400,12 L400,200 L0,200 Z" fill="url(#shvFill)" />
          <path className="shv__stroke" d="M0,170 C60,160 90,150 130,130 S200,120 240,90 S320,50 400,12" fill="none" pathLength="1" />
        </svg>
        <span className="shv__dot" />
      </div>

      <div className="shv__kpi">
        <span className="shv__kpi-label">Average ROI</span>
        <span className="shv__kpi-num">3<em>x</em></span>
        <span className="shv__kpi-trend">▲ Full-funnel growth</span>
      </div>
    </div>
  );
}
