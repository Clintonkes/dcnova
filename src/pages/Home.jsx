import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Droplets, Flame, Phone, Quote as QuoteIcon, Sprout } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { AccordionItem, Arch, ArrowLink, CtaBand, Eyebrow, Placeholder, Reveal, SectionHead, Spark, TrustBar } from '@/components/ui';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { faqGroups, gallery, process, testimonials } from '@/data/content';
import { pexels } from '@/lib/img';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="contours pointer-events-none absolute inset-x-0 top-0 h-[80%]" aria-hidden="true" />
      <div className="frame relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          <Eyebrow>Lawn care · {site.address.city}, California</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.9rem,8.4vw,6.6rem)] font-extrabold leading-[0.95]">
            Lawns that thrive in{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">backcountry</span>
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-1 left-0 z-0 h-[0.32em] w-full text-poppy" aria-hidden="true">
                <path d="M2 16c50-10 100-14 150-10s100 8 146-4" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
              </svg>
            </span>{' '}
            sun.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-chaparral/80 sm:text-xl">
            DC Nova keeps Ramona yards green on less water and clear of fire fuel: mowing, feeding, irrigation, water-wise conversions and brush clearance, from one local crew.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-poppy">
              Get a free quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.phoneHref} className="btn-line">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-chaparral/80">
            {['Free on-site walk-through', 'Written quote in one business day', 'Month-to-month plans'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Spark className="h-3 w-3 text-poppy" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
            <Arch className="aspect-[4/5] border-2 border-chaparral">
              <Img
                src={pexels(6728925)}
                alt="Low view across sunlit grass toward a push mower in warm evening light"
                priority
                sizes="(min-width:1024px) 34vw, 90vw"
                className="h-full w-full"
              />
            </Arch>
            {/* Rotating nova seal */}
            <div className="absolute -left-2 top-6 grid h-28 w-28 place-items-center rounded-full bg-poppy text-chaparral shadow-xl sm:-left-10 sm:h-36 sm:w-36" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
                <defs>
                  <path id="seal" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                </defs>
                <text fontSize="8.6" fontWeight="700" letterSpacing="1.5" fill="currentColor">
                  <textPath href="#seal">WATER-WISE · FIRE-AWARE · RAMONA CA ·</textPath>
                </text>
              </svg>
              <Spark className="h-9 w-9 text-chaparral" />
            </div>
            <div className="absolute -bottom-6 right-3 max-w-[15rem] rounded-blob border-2 border-chaparral bg-adobe p-4 shadow-xl sm:-right-6">
              <p className="text-xs font-semibold uppercase tracking-label text-manzanita">Next step</p>
              <p className="mt-1 font-display text-lg font-bold leading-snug">We walk the yard, then quote in writing.</p>
              <Link to="/quote" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold link-u">
                Book a walk-through
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesIndex() {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <section className="frame py-20 lg:py-28" aria-labelledby="services-h">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              eyebrow="What we do"
              title={<span id="services-h">Eight services. One crew that knows your yard.</span>}
              intro="Start with weekly mowing or book a single job. Either way, the people who quote it are the people who do it."
            />
            <div className="mt-10 hidden lg:block" aria-hidden="true">
              <Arch className="aspect-[5/4] border-2 border-chaparral">
                <Img key={s.slug} src={s.image} alt="" sizes="34vw" className="h-full w-full animate-fade" />
              </Arch>
            </div>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <li key={svc.slug} className="border-b-2 border-chaparral/15 first:border-t-2">
                <Link
                  to={`/services/${svc.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6 sm:gap-7"
                >
                  <span className="font-display text-sm font-bold tabular-nums text-sage">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-manzanita" aria-hidden="true" />
                      <span className="font-display text-2xl font-bold transition group-hover:text-manzanita sm:text-3xl">{svc.name}</span>
                    </span>
                    <span className="mt-2 block max-w-lg text-chaparral/75">{svc.summary}</span>
                  </span>
                  <span className="mt-1 grid h-10 w-10 place-items-center rounded-full border-2 border-chaparral transition group-hover:bg-poppy">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Climate() {
  const pillars = [
    { icon: Droplets, title: 'Less water, still green', body: 'Tuned sprinklers, cycle-and-soak schedules and higher mowing heights that cut waste without browning the lawn.' },
    { icon: Flame, title: 'Clear fire lines', body: 'Defensible-space clearance to current CAL FIRE guidance, timed for spring cure and the fall Santa Anas.' },
    { icon: Sprout, title: 'Soil that drinks', body: 'Aeration and feeding for compacted clay and decomposed granite, so water soaks in instead of running off.' },
  ];
  return (
    <section className="on-dark relative overflow-hidden bg-manzanita text-adobe">
      <div className="contours-light absolute inset-0" aria-hidden="true" />
      <div className="frame relative grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <SectionHead
          light
          className="lg:col-span-5"
          eyebrow="Built for this climate"
          title="Hot summers, dry winds, clay soil. We plan for all three."
          intro="Ramona sits around 1,400 feet up, with summer heat, cold winter nights and Santa Ana winds. Coastal lawn routines don’t work up here, so ours are built for the backcountry."
        />
        <ul className="grid gap-4 lg:col-span-7 lg:col-start-6">
          {pillars.map((p, i) => (
            <Reveal as="li" delay={i * 90} key={p.title} className="flex gap-5 rounded-blob bg-adobe/10 p-6 ring-1 ring-adobe/20 sm:p-7">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-poppy text-chaparral">
                <p.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-2xl font-bold">{p.title}</span>
                <span className="mt-2 block text-adobe/80">{p.body}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="frame py-20 lg:py-28" aria-labelledby="process-h">
      <SectionHead align="center" eyebrow="How it works" title={<span id="process-h">From first call to first cut</span>} />
      <div className="relative mt-16">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute left-0 right-0 top-7 hidden h-14 w-full text-chaparral/25 lg:block" aria-hidden="true">
          <path d="M0 30c150-30 300-30 450 0s300 30 450 0 200-20 300-10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
        </svg>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.map((p, i) => (
            <Reveal as="li" delay={i * 100} key={p.n} className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-chaparral bg-adobe font-display text-xl font-extrabold">
                {p.n}
              </span>
              <h3 className="mt-6 text-2xl font-bold">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-chaparral/75">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function GalleryTeaser() {
  const picks = ['lawn-detail', 'mower', 'hills', 'sprinkler', 'hedge'].map((id) => gallery.find((g) => g.id === id));
  return (
    <section className="bg-adobe-2 py-20 lg:py-28" aria-labelledby="work-h">
      <div className="frame">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead eyebrow="The work" title={<span id="work-h">Yards we’d be proud to sign</span>} />
          <ArrowLink to="/gallery">See the full gallery</ArrowLink>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {picks.map((g, i) => {
            const layout = [
              'col-span-2 aspect-[4/3] lg:col-span-5 lg:row-span-2 lg:aspect-auto rounded-arch',
              'aspect-square lg:col-span-4 lg:aspect-[4/3] rounded-blob',
              'aspect-square lg:col-span-3 lg:aspect-auto rounded-blob',
              'aspect-square lg:col-span-3 lg:aspect-auto rounded-full',
              'aspect-square lg:col-span-4 lg:aspect-[4/3] rounded-blob',
            ][i];
            return (
              <Reveal key={g.id} delay={i * 70} className={`group relative overflow-hidden border-2 border-chaparral ${layout}`}>
                <Img src={g.src} alt={g.alt} sizes="(min-width:1024px) 33vw, 50vw" className="h-full w-full transition duration-700 group-hover:scale-105" />
                <span className={`absolute bottom-3 rounded-full bg-adobe px-3 py-1 text-xs font-semibold ${i === 3 ? 'left-1/2 -translate-x-1/2' : 'left-3'}`}>{g.category}</span>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-chaparral/70">Representative photography. Project photos from DC Nova jobs will replace these.</p>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d) => setI((i + d + testimonials.length) % testimonials.length);
  return (
    <section className="frame py-20 lg:py-28" aria-labelledby="voices-h" aria-roledescription="carousel">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Client voices" title={<span id="voices-h">What neighbors say</span>} titleClass="text-4xl sm:text-5xl" />
          <Placeholder className="mt-5 text-manzanita">Placeholder reviews: replace with verified ones</Placeholder>
          <div className="mt-8 flex gap-2">
            <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-chaparral hover:bg-poppy" aria-label="Previous review">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-chaparral hover:bg-poppy" aria-label="Next review">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <figure className="relative rounded-blob bg-chaparral p-8 text-adobe sm:p-12 lg:col-span-8" aria-live="polite" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${testimonials.length}`}>
          <QuoteIcon className="h-10 w-10 text-poppy" aria-hidden="true" />
          <blockquote key={i} className="mt-6 animate-fade font-display text-2xl font-semibold leading-snug sm:text-4xl">“{t.quote}”</blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-adobe/20 pt-6">
            <span>
              <span className="block font-semibold">{t.name}, {t.place}</span>
              <span className="text-sm text-adobe/70">{t.service}</span>
            </span>
            <span className="text-sm text-adobe/70 tabular-nums">
              {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </figcaption>
        </figure>
      </div>
      <div className="mt-8 text-right">
        <ArrowLink to="/testimonials">All testimonials</ArrowLink>
      </div>
    </section>
  );
}

function FaqTeaser() {
  const items = [faqGroups[0].items[0], faqGroups[1].items[2], faqGroups[2].items[1], faqGroups[0].items[2]];
  return (
    <section className="border-t-2 border-chaparral bg-adobe-2 py-20 lg:py-28" aria-labelledby="faq-h">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Questions" title={<span id="faq-h">Good to know</span>} titleClass="text-4xl sm:text-5xl" />
          <p className="mt-5 text-chaparral/80">Straight answers to what people ask on the first call.</p>
          <ArrowLink to="/faq" className="mt-6">Read every FAQ</ArrowLink>
        </div>
        <div className="lg:col-span-8">
          {items.map((f, i) => (
            <AccordionItem key={f.q} q={f.q} defaultOpen={i === 0}>
              <p>{f.a}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        description="DC Nova is a lawn care company in Ramona, CA. Mowing, fertilization, aeration, irrigation repair, water-wise conversions and defensible-space brush clearance. Free on-site quotes."
      />
      <Hero />
      <TrustBar />
      <ServicesIndex />
      <Climate />
      <Process />
      <GalleryTeaser />
      <Testimonials />
      <FaqTeaser />
      <CtaBand />
    </>
  );
}
