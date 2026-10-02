import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICE_SECTIONS } from '@/data/services';

export const dynamicParams = false;

function publicFileExists(urlPath) {
  return fs.existsSync(path.join(process.cwd(), 'public', ...urlPath.split('/').filter(Boolean)));
}

function findService(slug) {
  for (const section of SERVICE_SECTIONS) {
    const service = section.services.find((s) => s.slug === slug);
    if (!service) continue;

    // Prefer the configured image; if missing, try the subsection SVG before the section image.
    let image = service.image || `/images/services/subsections/${slug}.jpg`;
    if (!publicFileExists(image)) {
      const svg = `/images/services/subsections/${slug}.svg`;
      image = publicFileExists(svg) ? svg : section.image;
    }

    return { ...service, image, sectionId: section.id, sectionName: section.name };
  }
  return null;
}

export function generateStaticParams() {
  return SERVICE_SECTIONS.flatMap((section) => section.services.map((s) => ({ slug: s.slug })));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | BrandLumeo LLP`,
    description: service.short_description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const related = SERVICE_SECTIONS.find((s) => s.id === service.sectionId).services.filter((s) => s.slug !== slug);

  return (
    <>
      <section className="rn-page-hero" aria-label={service.title}>
        <div className="rn-wrap">
          <span className="rn-eyebrow">
            <Link href="/services" style={{ color: 'inherit' }}>Services</Link> / {service.sectionName}
          </span>
          <h1 className="rn-display">{service.title}</h1>
          <div className="rn-hero-row">
            <p className="rn-lead">{service.short_description}</p>
            <div className="rn-actions">
              <Link href="/contact" className="rn-btn rn-btn--solid">Discuss This Service</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rn-section" aria-label="Service overview">
        <div className="rn-wrap">
          <article className="rn-split" style={{ borderTop: 0, paddingTop: 0 }}>
            <div className="rn-split__media">
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
            <div className="rn-split__body">
              <span className="rn-eyebrow">Service Overview</span>
              <p>{service.description}</p>
              <span className="rn-eyebrow">What You Get</span>
              <ul className="rn-tags">
                {service.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="rn-section" aria-label={`More ${service.sectionName}`}>
        <div className="rn-wrap">
          <h2 className="rn-display rn-display--md">More {service.sectionName}</h2>
          <ul className="rn-tags">
            {related.map((s) => (
              <li key={s.slug} style={{ padding: 0, border: 0 }}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
