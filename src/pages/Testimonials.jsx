import { ExternalLink, MessageSquareHeart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { Breadcrumbs, CtaBand, Eyebrow, Placeholder, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  const google = site.social.find((s) => s.label.startsWith('Google'));
  return (
    <>
      <Seo
        title="Testimonials"
        description="What homeowners and property managers in Ramona and inland San Diego County say about working with DC Nova lawn care."
      />

      <section className="frame pb-14 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Testimonials' }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Testimonials</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.95]">Word travels fast on a small-town route.</h1>
          </div>
          <div className="self-end rounded-blob bg-chaparral p-7 text-adobe lg:col-span-5">
            <div className="flex items-center gap-1 text-poppy" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <p className="mt-3 font-display text-4xl font-extrabold">[X.X] average</p>
            <p className="mt-1 text-adobe/75">from [N] verified reviews</p>
            <Placeholder className="mt-4 text-poppy">Rating: placeholder, link real reviews</Placeholder>
          </div>
        </div>
      </section>

      <section className="frame pb-20" aria-label="Customer reviews">
        <div className="mb-8 rounded-2xl border-2 border-dashed border-manzanita bg-poppy-soft/40 p-4 text-sm">
          <strong>Note for the owner:</strong> the reviews below are sample placeholders that show the layout. Replace them with real, verified customer reviews (with permission) before launch.
        </div>
        <ul className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 70} className="mb-5 break-inside-avoid">
              <figure className={`rounded-blob p-7 ${i % 3 === 1 ? 'bg-manzanita text-adobe' : i % 3 === 2 ? 'bg-adobe-2' : 'border-2 border-chaparral bg-adobe'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-label ${i % 3 === 1 ? 'text-poppy-soft' : 'text-manzanita'}`}>{t.service}</span>
                  <Placeholder className={i % 3 === 1 ? 'text-adobe' : 'text-manzanita'}>Sample</Placeholder>
                </div>
                <blockquote className={`mt-5 font-display font-semibold leading-snug ${i % 2 ? 'text-xl' : 'text-2xl'}`}>“{t.quote}”</blockquote>
                <figcaption className={`mt-6 text-sm ${i % 3 === 1 ? 'text-adobe/80' : 'text-chaparral/70'}`}>
                  <span className="font-semibold">{t.name}</span> · {t.place}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-y-2 border-chaparral bg-adobe-2 py-16">
        <div className="frame grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-poppy">
            <MessageSquareHeart className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-3xl font-extrabold">Already a client?</h2>
            <p className="mt-2 text-chaparral/80">A short, honest review helps neighbors find a crew they can trust. It means a lot to a small local company.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={google.href} target="_blank" rel="noopener noreferrer" className="btn-ink">
              Leave a Google review <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab, placeholder link)</span>
            </a>
            <Link to="/contact" className="btn-line">Send private feedback</Link>
          </div>
        </div>
      </section>

      <CtaBand tone="poppy" title="Be the next good review." />
    </>
  );
}
