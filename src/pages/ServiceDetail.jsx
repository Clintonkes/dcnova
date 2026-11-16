import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Home as HomeIcon } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { AccordionItem, Arch, Breadcrumbs, CtaBand, Eyebrow, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { services, serviceBySlug } from '@/data/services';
import { SITE_URL } from '@/lib/paths';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;
  const Icon = s.icon;
  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];
  const prev = services[(idx - 1 + services.length) % services.length];

  return (
    <>
      <Seo
        title={`${s.name} in Ramona, CA`}
        description={`${s.summary} Serving Ramona and inland San Diego County.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.name,
          description: s.intro,
          serviceType: s.name,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: site.serviceArea.map((a) => a.name),
        }}
      />

      <section className="frame pb-16 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: s.short }]} />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-chaparral text-poppy">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.98]">{s.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chaparral/80">{s.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`/quote?service=${s.slug}`} className="btn-poppy">
                Quote this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/pricing" className="btn-line">How pricing works</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Arch className="aspect-[4/5] border-2 border-chaparral">
              <Img src={s.image} alt={s.alt} priority sizes="(min-width:1024px) 38vw, 100vw" className="h-full w-full" />
            </Arch>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-chaparral bg-adobe-2 py-20">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>What’s included</Eyebrow>
            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {s.includes.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 50} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-poppy">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <aside className="grid gap-4 self-start lg:col-span-4 lg:col-start-9">
            <div className="rounded-blob bg-chaparral p-6 text-adobe">
              <CalendarDays className="h-6 w-6 text-poppy" aria-hidden="true" />
              <h2 className="mt-3 font-sans text-sm font-semibold uppercase tracking-label text-poppy">When we do it</h2>
              <p className="mt-2">{s.rhythm}</p>
            </div>
            <div className="rounded-blob border-2 border-chaparral bg-adobe p-6">
              <HomeIcon className="h-6 w-6 text-manzanita" aria-hidden="true" />
              <h2 className="mt-3 font-sans text-sm font-semibold uppercase tracking-label text-manzanita">Best for</h2>
              <p className="mt-2">{s.goodFor}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="frame grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold">About {s.short.toLowerCase()}</h2>
          <Link to="/faq" className="mt-5 inline-block link-u font-semibold">More answers in the FAQ</Link>
        </div>
        <div className="lg:col-span-8">
          {s.faqs.map((f, i) => (
            <AccordionItem key={f.q} q={f.q} defaultOpen={i === 0}>
              <p>{f.a}</p>
            </AccordionItem>
          ))}
        </div>
      </section>

      <nav aria-label="More services" className="frame grid gap-4 pb-20 sm:grid-cols-2">
        <Link to={`/services/${prev.slug}`} className="group flex items-center gap-4 rounded-blob border-2 border-chaparral p-6 hover:bg-adobe-2">
          <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-label text-sage">Previous</span>
            <span className="font-display text-xl font-bold">{prev.name}</span>
          </span>
        </Link>
        <Link to={`/services/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-blob border-2 border-chaparral p-6 text-right hover:bg-adobe-2">
          <span>
            <span className="block text-xs font-semibold uppercase tracking-label text-sage">Next</span>
            <span className="font-display text-xl font-bold">{next.name}</span>
          </span>
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </nav>

      <CtaBand title={`Ready for ${s.short.toLowerCase()}?`} />
    </>
  );
}
