import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { Breadcrumbs, Eyebrow } from '@/components/ui';
import { formatDate } from '@/data/posts';

/** Shared layout for Privacy and Terms: sticky table of contents + article. */
export default function Legal({ title, description, updated, sections, intro }) {
  return (
    <>
      <Seo title={title} description={description} />
      <section className="frame pb-10 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: title }]} />
        <div className="mt-10 border-b-2 border-chaparral pb-8">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-5xl font-extrabold sm:text-6xl">{title}</h1>
          <p className="mt-4 text-chaparral/75">Last updated <time dateTime={updated}>{formatDate(updated)}</time></p>
        </div>
      </section>
      <section className="frame grid gap-12 pb-24 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-label text-manzanita">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 hover:underline">
                    <span className="tabular-nums text-sage">{String(i + 1).padStart(2, '0')}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="prose-nova lg:col-span-8 lg:col-start-5">
          <p className="text-lg">{intro}</p>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <h2>
                <span className="mr-3 text-poppy">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
          <p className="rounded-2xl border-2 border-dashed border-manzanita p-4 text-sm">
            This page is a plain-language template provided with the website. Have it reviewed by a qualified professional before relying on it. Questions? <Link to="/contact">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
