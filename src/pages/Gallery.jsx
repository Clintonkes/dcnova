import { useCallback, useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import { Breadcrumbs, CtaBand, Eyebrow, Reveal } from '@/components/ui';
import { gallery, galleryCategories } from '@/data/content';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const items = useMemo(() => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const count = (c) => (c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length);

  return (
    <>
      <Seo
        title="Our Work"
        description="A gallery of lawn care, water-wise planting, irrigation, brush clearance, hedge and cleanup work of the kind DC Nova does across Ramona and inland San Diego County."
      />

      <section className="frame pb-10 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Work' }]} />
        <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.95]">The work, up close.</h1>
          </div>
          <p className="max-w-md text-chaparral/80">
            Filter by type of work, then open any photo full-size. These are representative photos; DC Nova job photos will replace them as projects are completed.
          </p>
        </div>
      </section>

      <div className="sticky top-[5.5rem] z-30 border-y-2 border-chaparral bg-adobe/95 backdrop-blur">
        <div className="frame">
          <div role="group" aria-label="Filter photos by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-3">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  filter === c ? 'border-chaparral bg-chaparral text-adobe' : 'border-chaparral/25 hover:border-chaparral'
                }`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-xs tabular-nums ${filter === c ? 'bg-poppy text-chaparral' : 'bg-adobe-2'}`}>{count(c)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="frame py-12 lg:py-16" aria-label={`${filter} photos`}>
        <p className="sr-only" aria-live="polite">Showing {items.length} photos</p>
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <Reveal as="li" key={g.id} delay={(i % 3) * 60} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-blob border-2 border-chaparral text-left"
                aria-label={`Open photo: ${g.title}`}
              >
                <Img
                  src={g.src}
                  alt={g.alt}
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                  className={`w-full transition duration-700 group-hover:scale-105 ${['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square'][i % 3]}`}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-chaparral/90 to-transparent p-4 pt-16 text-adobe">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-label text-poppy">{g.category}</span>
                    <span className="font-display text-lg font-bold">{g.title}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-adobe text-chaparral opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </section>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}

      <CtaBand title="Want your yard in here?" />
    </>
  );
}
