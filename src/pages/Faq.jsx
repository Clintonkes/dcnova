import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import Seo from '@/components/Seo';
import { AccordionItem, Breadcrumbs, Eyebrow } from '@/components/ui';
import { site } from '@/config/site';
import { faqGroups } from '@/data/content';

export default function Faq() {
  const [q, setQ] = useState('');
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return faqGroups;
    return faqGroups
      .map((g) => ({ ...g, items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(term)) }))
      .filter((g) => g.items.length);
  }, [q]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title="FAQ"
        description="Answers about DC Nova lawn care in Ramona: quotes, contracts, mowing height, watering, defensible space, brush clearance timing, scheduling and billing."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqGroups.flatMap((g) => g.items).map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
        }}
      />

      <section className="frame pb-10 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <Eyebrow className="justify-center text-manzanita">Frequently asked</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.95]">Questions, answered plainly.</h1>
          <div className="relative mx-auto mt-10 max-w-xl">
            <label htmlFor="faq-search" className="sr-only">Search questions</label>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sage" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: watering, contract, brush…"
              className="field !rounded-full !py-4 !pl-14"
            />
          </div>
          <p className="mt-3 text-sm text-chaparral/70" aria-live="polite">
            {q ? `${total} matching question${total === 1 ? '' : 's'}` : `${total} questions in ${faqGroups.length} groups`}
          </p>
        </div>
      </section>

      <section className="frame grid gap-12 pb-24 pt-6 lg:grid-cols-12">
        <nav aria-label="FAQ groups" className="min-w-0 lg:col-span-3">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:sticky lg:top-32 lg:flex-col lg:overflow-visible">
            {faqGroups.map((g) => (
              <li key={g.id} className="shrink-0">
                <a href={`#${g.id}`} className="block rounded-full border-2 border-chaparral/20 px-4 py-2 text-sm font-semibold hover:border-chaparral lg:rounded-2xl lg:py-3">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16 lg:col-span-8 lg:col-start-5">
          {groups.length === 0 && (
            <div className="rounded-blob border-2 border-dashed border-chaparral/30 p-10 text-center">
              <p className="font-display text-2xl font-bold">No questions match “{q}”.</p>
              <p className="mt-2 text-chaparral/75">Ask us directly. We usually reply the same day.</p>
              <Link to="/contact" className="btn-ink mt-6">Ask a question</Link>
            </div>
          )}
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-32">
              <h2 id={`${g.id}-h`} className="flex items-center gap-4 text-3xl font-extrabold sm:text-4xl">
                <span className="h-3 w-3 shrink-0 rounded-full bg-poppy" aria-hidden="true" />
                {g.title}
              </h2>
              <div className="mt-4">
                {g.items.map((i) => (
                  <AccordionItem key={i.q} q={i.q} compact defaultOpen={!!q}>
                    <p>{i.a}</p>
                  </AccordionItem>
                ))}
              </div>
            </section>
          ))}

          <aside className="flex flex-col items-start gap-5 rounded-blob bg-chaparral p-8 text-adobe sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Still wondering about something?</h2>
              <p className="mt-1 text-adobe/75">Call or send a message. A real person answers.</p>
            </div>
            <a href={site.phoneHref} className="btn-poppy shrink-0">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
