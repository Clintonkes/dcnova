import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Breadcrumbs, CtaBand, Eyebrow, Reveal, SectionHead, Spark } from '@/components/ui';
import { services, serviceBySlug } from '@/data/services';

const symptoms = [
  { says: 'The lawn is thin, pale or full of weeds', slugs: ['fertilization-weed-control', 'aeration-overseeding'] },
  { says: 'The water bill keeps climbing', slugs: ['irrigation', 'water-wise-conversions'] },
  { says: 'There are brown patches in a green lawn', slugs: ['irrigation', 'aeration-overseeding'] },
  { says: 'Dry grass and brush near the house', slugs: ['brush-clearance'] },
  { says: 'Hedges are swallowing the windows', slugs: ['hedge-shrub-care'] },
  { says: 'I just want the yard handled', slugs: ['lawn-mowing', 'seasonal-cleanups'] },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Lawn Care Services"
        description="Mowing, fertilization and weed control, aeration, irrigation repair, water-wise conversions, brush clearance, hedge care and seasonal cleanups in Ramona and inland San Diego County."
      />

      <section className="frame pb-14 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Services' }]} />
        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.95]">Everything the yard needs, from turf to fire line.</h1>
          </div>
          <p className="text-lg text-chaparral/80 lg:col-span-4">
            Book a regular plan or a single job. Each service has its own page with what’s included, when we do it, and answers to common questions.
          </p>
        </div>
      </section>

      {/* Bento grid of services */}
      <section className="frame pb-20" aria-label="All services">
        <ul className="grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            const big = i === 0 || i === 5;
            return (
              <Reveal
                as="li"
                key={s.slug}
                delay={(i % 4) * 60}
                className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : big ? 'sm:col-span-2' : ''}
              >
                <Link
                  to={`/services/${s.slug}`}
                  className={`group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-blob border-2 border-chaparral p-6 transition sm:p-7 ${
                    big ? 'text-adobe' : 'bg-adobe hover:bg-adobe-2'
                  }`}
                >
                  {big && (
                    <>
                      <Img src={s.image} alt="" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" />
                      <span className="absolute inset-0 bg-gradient-to-t from-chaparral via-chaparral/60 to-chaparral/10" aria-hidden="true" />
                    </>
                  )}
                  <span className="relative flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-full ${big ? 'bg-poppy text-chaparral' : 'bg-chaparral text-poppy'}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="relative mt-10 block">
                    <span className={`block font-display font-bold ${big ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{s.name}</span>
                    <span className={`mt-3 block ${big ? 'max-w-md text-adobe/85' : 'text-chaparral/75'}`}>{s.summary}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Symptom finder */}
      <section className="bg-adobe-2 py-20 lg:py-28" aria-labelledby="symptoms-h">
        <div className="frame">
          <SectionHead
            eyebrow="Not sure where to start?"
            title={<span id="symptoms-h">Start with what you’re seeing</span>}
            intro="Find the line that sounds like your yard. We confirm on the walk-through, so there’s no risk in picking the wrong one."
          />
          <ul className="mt-12 divide-y-2 divide-chaparral/15 border-y-2 border-chaparral">
            {symptoms.map((row) => (
              <li key={row.says} className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
                <p className="flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
                  <Spark className="h-4 w-4 shrink-0 text-poppy" /> “{row.says}”
                </p>
                <ul className="flex flex-wrap gap-2">
                  {row.slugs.map((slug) => {
                    const s = serviceBySlug(slug);
                    return (
                      <li key={slug}>
                        <Link to={`/services/${slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-chaparral px-4 py-2 text-sm font-semibold text-adobe hover:bg-poppy hover:text-chaparral">
                          {s.short} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Bundle it into one plan." body="Most clients combine weekly mowing with feeding, irrigation checks and a yearly clearance. One visit day, one monthly bill." />
    </>
  );
}
