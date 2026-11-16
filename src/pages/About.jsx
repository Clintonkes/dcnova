import { MapPin } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Arch, Breadcrumbs, CtaBand, Eyebrow, Placeholder, Reveal, SectionHead, Spark, TrustBar } from '@/components/ui';
import { site } from '@/config/site';
import { values } from '@/data/content';
import { pexels } from '@/lib/img';

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="DC Nova LLC is a Ramona, California lawn care company built around water-wise care and fire-season readiness. Learn how we approach every property."
      />

      {/* Story: typographic opener over a full-width landscape */}
      <section className="frame pb-12 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'About' }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <h1 className="text-[clamp(2.6rem,7vw,5.8rem)] font-extrabold leading-[0.95] lg:col-span-8">
            A lawn care company that grew up under the <span className="text-manzanita">Ramona</span> sun.
          </h1>
          <div className="self-end lg:col-span-4">
            <p className="text-lg text-chaparral/80">
              DC Nova LLC is based on San Vicente Road and works the backcountry from Ramona to Julian. We started with one mower and a simple idea: lawn care up here should respect the water, the heat and the fire season.
            </p>
          </div>
        </div>
      </section>

      <section className="frame">
        <Reveal className="overflow-hidden rounded-[2.5rem] border-2 border-chaparral">
          <Img src={pexels(4088333)} alt="A lone oak on a golden hillside with the morning sun rising behind it" sizes="100vw" className="aspect-[16/9] w-full sm:aspect-[21/9]" priority />
        </Reveal>
      </section>

      <section className="frame grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <Eyebrow>Our story</Eyebrow>
          <p className="mt-6 font-display text-3xl font-bold leading-tight">
            “The best compliment a yard can get is that nobody notices how little water it uses.”
          </p>
          <p className="mt-4 text-sm text-sage">Founder’s note <Placeholder className="ml-1 text-manzanita">Owner to confirm wording</Placeholder></p>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-chaparral/85 lg:col-span-7 lg:col-start-6">
          <p>
            Ramona is not the coast. Summer afternoons sit in the 90s, winter nights drop near freezing, and every fall the Santa Ana winds come down the canyons. Lawns here need a different playbook from the ones on most maintenance company checklists.
          </p>
          <p>
            So we built ours around three things. <strong className="text-chaparral">Water:</strong> every property gets an irrigation check, because the cheapest gallon is the one that never runs into the gutter. <strong className="text-chaparral">Soil:</strong> clay and decomposed granite pack down, so we aerate and feed to help water soak in. <strong className="text-chaparral">Fire:</strong> we treat defensible space as part of regular care, not an emergency in June.
          </p>
          <p>
            We keep routes tight and local, so the same crew sees your yard every week. And we tell you what we saw. A short note after each visit costs us a minute and saves you from surprises.
          </p>
          <p className="flex items-center gap-2 text-base text-chaparral/70">
            <MapPin className="h-4 w-4 text-manzanita" aria-hidden="true" /> {site.address.street}, {site.address.city}, {site.address.region} {site.address.postal}
          </p>
        </div>
      </section>

      {/* Values: numbered index cards */}
      <section className="bg-adobe-2 py-20 lg:py-28" aria-labelledby="values-h">
        <div className="frame">
          <SectionHead eyebrow="What we hold to" title={<span id="values-h">Four rules for every property</span>} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 80} className="relative overflow-hidden rounded-blob border-2 border-chaparral bg-adobe p-8 sm:p-10">
                <span className="absolute -right-3 -top-6 font-display text-[7rem] font-extrabold leading-none text-adobe-3" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="relative text-3xl font-bold">{v.title}</h3>
                <p className="relative mt-4 max-w-md text-chaparral/80">{v.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="frame py-16">
        <div className="mb-6 flex items-center gap-3">
          <Spark />
          <p className="font-semibold">Trust signals</p>
        </div>
        <TrustBar variant="stack" />
      </section>

      <CtaBand tone="poppy" title="Come meet us in your yard." />
    </>
  );
}
