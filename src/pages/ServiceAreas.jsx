import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Breadcrumbs, CtaBand, Eyebrow, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { pexels } from '@/lib/img';

const ZONES = {
  core: { label: 'Core routes', detail: 'Weekly maintenance, every service', ring: 'bg-poppy text-chaparral' },
  extended: { label: 'Extended routes', detail: 'Maintenance and all project work', ring: 'bg-chaparral text-adobe' },
  project: { label: 'By arrangement', detail: 'Projects, clearance and cleanups', ring: 'bg-adobe text-chaparral border-2 border-chaparral' },
};

/** Schematic (not to scale) placement of towns around Ramona for the radar map. */
const POS = {
  ramona: [50, 50], sdce: [57, 58], 'santa-ysabel': [70, 30], poway: [28, 66], escondido: [24, 36], lakeside: [44, 82], 'rancho-bernardo': [20, 55], 'valley-center': [36, 16], julian: [84, 40],
};

export default function ServiceAreas() {
  const [active, setActive] = useState('ramona');
  const a = site.serviceArea.find((s) => s.slug === active);

  return (
    <>
      <Seo
        title="Service Areas"
        description="DC Nova serves Ramona, San Diego Country Estates, Poway, Escondido, Lakeside, Santa Ysabel, Rancho Bernardo, Julian and Valley Center with lawn care and brush clearance."
      />

      <section className="on-dark relative overflow-hidden bg-chaparral text-adobe">
        <Img src={pexels(18027616)} alt="" className="absolute inset-0 h-full w-full opacity-35" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-chaparral via-chaparral/85 to-chaparral/30" aria-hidden="true" />
        <div className="frame relative pb-20 pt-10 lg:pb-28 lg:pt-14">
          <Breadcrumbs light items={[{ label: 'Service areas' }]} />
          <div className="mt-12 max-w-3xl">
            <Eyebrow className="text-poppy">Where we work</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.95]">Ramona, and about 25 miles in every direction.</h1>
            <p className="mt-6 max-w-xl text-lg text-adobe/80">
              Tight routes keep crews on time and travel costs out of your price. Pick a town on the map to see what we offer there.
            </p>
          </div>
        </div>
      </section>

      <section className="frame grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        {/* Radar map */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square max-w-[36rem] overflow-hidden rounded-full border-2 border-chaparral bg-adobe-2">
            <div className="contours absolute inset-0" aria-hidden="true" />
            {[88, 62, 34].map((d) => (
              <span key={d} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-chaparral/25" style={{ width: `${d}%`, height: `${d}%` }} aria-hidden="true" />
            ))}
            <span className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left animate-spin-slow bg-gradient-to-r from-poppy to-transparent" aria-hidden="true" />
            <ul aria-label="Towns served">
              {site.serviceArea.map((t) => {
                const [x, y] = POS[t.slug];
                const on = active === t.slug;
                return (
                  <li key={t.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                    <button
                      type="button"
                      onClick={() => setActive(t.slug)}
                      aria-pressed={on}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-semibold shadow-sm transition sm:text-xs ${
                        on ? 'scale-110 bg-chaparral text-adobe ring-4 ring-poppy' : ZONES[t.zone].ring
                      }`}
                    >
                      {t.slug === 'ramona' ? <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
                      {t.name.replace(' (east)', '')}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-4 text-center text-sm text-chaparral/70">Schematic map, not to scale. Rings mark roughly 5, 15 and 25 miles.</p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-blob border-2 border-chaparral bg-adobe p-7 lg:sticky lg:top-32" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-label text-manzanita">{ZONES[a.zone].label}</p>
            <h2 className="mt-2 text-4xl font-extrabold">{a.name}</h2>
            <p className="mt-3 flex items-center gap-2 text-chaparral/75">
              <Navigation className="h-4 w-4 text-manzanita" aria-hidden="true" />
              {a.distance === 0 ? 'Our home base' : `About ${a.distance} miles from our yard`}
            </p>
            <p className="mt-5 text-lg">{a.note}</p>
            <Link to={`/quote?area=${a.slug}`} className="btn-poppy mt-7 w-full">
              Get a quote in {a.name.replace(' (east)', '')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Zone table */}
      <section className="bg-adobe-2 py-20" aria-labelledby="zones-h">
        <div className="frame">
          <h2 id="zones-h" className="text-4xl font-extrabold sm:text-5xl">Every town, at a glance</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {Object.entries(ZONES).map(([key, z], i) => (
              <Reveal key={key} delay={i * 80} className="rounded-blob bg-adobe p-6 ring-2 ring-chaparral">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${z.ring}`}>{z.label}</span>
                <p className="mt-3 text-chaparral/75">{z.detail}</p>
                <ul className="mt-5 divide-y divide-chaparral/15">
                  {site.serviceArea.filter((t) => t.zone === key).map((t) => (
                    <li key={t.slug} className="flex items-center justify-between py-3">
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-sm tabular-nums text-chaparral/70">{t.distance === 0 ? 'Base' : `~${t.distance} mi`}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-chaparral/80">
            Outside these areas? <Link to="/contact" className="link-u font-semibold">Ask us anyway</Link>. Larger projects and brush clearance can travel.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
