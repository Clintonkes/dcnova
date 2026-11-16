import { BadgeCheck, MapPin } from 'lucide-react';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Mark } from '@/components/Logo';
import { Arch, Breadcrumbs, CtaBand, Eyebrow, Placeholder, Reveal, SectionHead, Spark, TrustBar } from '@/components/ui';
import { site } from '@/config/site';
import { credentials, team, values } from '@/data/content';
import { pexels } from '@/lib/img';

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="DC Nova LLC is a Ramona, California lawn care company built around water-wise care and fire-season readiness. Meet the team and see our credentials."
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

      {/* Team */}
      <section className="frame py-20 lg:py-28" aria-labelledby="team-h">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow="The crew" title={<span id="team-h">People you’ll see on your property</span>} />
          <Placeholder className="text-manzanita">Names, bios and photos: owner to supply</Placeholder>
        </div>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={m.role} delay={i * 90}>
              <Arch className="relative grid aspect-[4/5] place-items-center border-2 border-chaparral bg-adobe-2">
                <div className="contours absolute inset-0" aria-hidden="true" />
                <Mark className="relative h-24 w-24 text-chaparral" />
                <span className="sr-only">Portrait placeholder</span>
              </Arch>
              <p className="mt-5 text-xs font-semibold uppercase tracking-label text-manzanita">{m.role}</p>
              <h3 className="mt-1 text-2xl font-bold">{m.name}</h3>
              <p className="mt-2 text-chaparral/75">{m.bio}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Credentials */}
      <section className="on-dark bg-chaparral py-20 text-adobe lg:py-28" aria-labelledby="cred-h">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead light eyebrow="Credentials" title={<span id="cred-h">Paperwork, in the open</span>} titleClass="text-4xl sm:text-5xl" />
            <p className="mt-5 text-adobe/75">
              Ask for any certificate before we start. Each item below is marked as a placeholder until the owner confirms the policy or license details.
            </p>
          </div>
          <ul className="divide-y divide-adobe/15 border-y border-adobe/15 lg:col-span-8">
            {credentials.map((c) => (
              <li key={c.title} className="grid gap-2 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
                <BadgeCheck className="h-6 w-6 text-poppy" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-lg font-semibold">{c.title}</h3>
                  <p className="text-adobe/70">{c.detail}</p>
                </div>
                <span className="chip-placeholder w-fit text-poppy">{c.status}</span>
              </li>
            ))}
          </ul>
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
