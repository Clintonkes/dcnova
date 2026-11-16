import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Breadcrumbs, Eyebrow, Reveal, Spark } from '@/components/ui';
import { formatDate, posts } from '@/data/posts';

const upcoming = ['When to aerate fescue versus Bermuda in Ramona', 'Native plants that handle Ramona frost and heat', 'Reading your water bill: where outdoor water goes'];

export default function Blog() {
  const [lead, ...rest] = posts;
  return (
    <>
      <Seo
        title="Field Notes"
        description="Practical lawn care advice for Ramona and inland San Diego County: defensible space, watering schedules, aeration timing and water-wise yards."
      />

      <section className="frame pb-12 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Field notes' }]} />
        <div className="mt-10 border-b-2 border-chaparral pb-8">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="mt-5 text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.88] tracking-tight">Field notes.</h1>
          <p className="mt-6 max-w-xl text-lg text-chaparral/80">Practical advice from the routes: what works in Ramona’s heat, clay and fire season, written so you can use it this weekend.</p>
        </div>
      </section>

      <section className="frame pb-16" aria-label="Featured article">
        <Reveal>
          <Link to={`/blog/${lead.slug}`} className="group grid overflow-hidden rounded-blob border-2 border-chaparral bg-adobe lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Img src={lead.image} alt={lead.alt} sizes="(min-width:1024px) 50vw, 100vw" className="h-full w-full transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
              <div>
                <p className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-poppy px-3 py-1 font-semibold">{lead.category}</span>
                  <time dateTime={lead.date} className="text-chaparral/70">{formatDate(lead.date)}</time>
                </p>
                <h2 className="mt-6 text-3xl font-extrabold leading-tight transition group-hover:text-manzanita sm:text-5xl">{lead.title}</h2>
                <p className="mt-5 text-lg text-chaparral/80">{lead.dek}</p>
              </div>
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-chaparral/70">
                  <Clock className="h-4 w-4" aria-hidden="true" /> {lead.readMins} min read
                </span>
                <span className="inline-flex items-center gap-2 font-semibold">
                  Read the guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="frame grid gap-10 pb-24 lg:grid-cols-12" aria-label="More articles">
        <div className="lg:col-span-8">
          {rest.map((p) => (
            <Reveal key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="group grid gap-6 border-b-2 border-chaparral/15 pb-10 sm:grid-cols-[14rem_1fr]">
                <div className="aspect-square overflow-hidden rounded-arch border-2 border-chaparral">
                  <Img src={p.image} alt={p.alt} sizes="14rem" className="h-full w-full transition duration-700 group-hover:scale-105" />
                </div>
                <div className="self-center">
                  <p className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-chaparral px-3 py-1 font-semibold text-adobe">{p.category}</span>
                    <time dateTime={p.date} className="text-chaparral/70">{formatDate(p.date)}</time>
                    <span className="text-chaparral/70">· {p.readMins} min</span>
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight transition group-hover:text-manzanita">{p.title}</h2>
                  <p className="mt-3 text-chaparral/80">{p.dek}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-blob bg-adobe-2 p-7">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-label text-manzanita">Coming up</h2>
            <ul className="mt-4 space-y-4">
              {upcoming.map((t) => (
                <li key={t} className="flex gap-3">
                  <Spark className="mt-1.5 h-3 w-3 shrink-0 text-poppy" />
                  <span className="font-display text-lg font-semibold leading-snug">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-chaparral/75">
              Got a question you want answered? <Link to="/contact" className="link-u font-semibold">Send it in</Link>.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
