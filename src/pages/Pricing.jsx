import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Seo from '@/components/Seo';
import { Breadcrumbs, CtaBand, Eyebrow, Placeholder, Reveal, SectionHead } from '@/components/ui';
import { addOns, planFeatures, plans, pricingFactors } from '@/data/content';

function Cell({ v }) {
  if (v === true) return (<><Check className="mx-auto h-5 w-5 text-chaparral" strokeWidth={3} aria-hidden="true" /><span className="sr-only">Included</span></>);
  if (v === false) return (<><Minus className="mx-auto h-5 w-5 text-chaparral/30" aria-hidden="true" /><span className="sr-only">Not included</span></>);
  return <span className="text-sm font-medium">{v}</span>;
}

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing"
        description="How DC Nova prices lawn care in Ramona: plan comparison, the factors that set your price, and starting rates for irrigation, aeration, cleanups and brush clearance."
      />

      {/* Ledger-style header */}
      <section className="frame pb-16 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Pricing' }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.95]">Clear prices. Written down before we start.</h1>
          </div>
          <div className="self-end rounded-blob border-2 border-dashed border-manzanita p-6 text-chaparral/85">
            <p className="font-semibold text-manzanita">About the numbers on this page</p>
            <p className="mt-2">
              Every yard is measured before it is quoted, so the figures below are starting points, not promises. They are also <strong>placeholders</strong> until the owner sets final rates.
            </p>
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="bg-adobe-2 py-20" aria-labelledby="how-h">
        <div className="frame">
          <SectionHead eyebrow="How pricing works" title={<span id="how-h">Four things set your price</span>} titleClass="text-4xl sm:text-5xl" />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricingFactors.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 70} className="rounded-blob bg-adobe p-6 ring-2 ring-chaparral">
                <span className="font-display text-5xl font-extrabold text-poppy">{i + 1}</span>
                <h3 className="mt-3 text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 text-chaparral/75">{f.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison table */}
      <section className="frame py-20 lg:py-28" aria-labelledby="plans-h">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Maintenance plans" title={<span id="plans-h">Compare the plans</span>} intro="Month to month. Pause or cancel before your next visit." />
          <Placeholder className="text-manzanita">Prices: placeholder</Placeholder>
        </div>

        <div className="relative mt-12 overflow-x-auto rounded-blob border-2 border-chaparral" role="region" aria-label="Plan comparison table" tabIndex={0}>
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">Maintenance plan comparison. Prices are placeholders.</caption>
            <thead>
              <tr>
                <td className="w-[34%] bg-adobe p-5 align-bottom text-sm text-chaparral/70">Prices per visit for a typical suburban lawn.</td>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={`p-5 text-center align-top ${p.featured ? 'bg-chaparral text-adobe' : 'bg-adobe-2'}`}>
                    {p.featured && <span className="mb-2 inline-block rounded-full bg-poppy px-3 py-0.5 text-xs font-semibold text-chaparral">Most chosen</span>}
                    <span className="block font-display text-2xl font-bold">{p.name}</span>
                    <span className="mt-2 block font-display text-4xl font-extrabold">
                      {p.price !== 'Custom' && <span className="mr-1 text-base font-semibold opacity-70">from</span>}
                      {p.price}
                    </span>
                    <span className={`block text-sm ${p.featured ? 'text-adobe/75' : 'text-chaparral/70'}`}>{p.unit}</span>
                    <span className={`mt-3 block text-sm font-normal ${p.featured ? 'text-adobe/85' : 'text-chaparral/80'}`}>{p.blurb}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planFeatures.map((f, r) => (
                <tr key={f.label} className={r % 2 ? 'bg-adobe' : 'bg-adobe-2/50'}>
                  <th scope="row" className="border-t border-chaparral/15 p-4 pl-5 font-medium">{f.label}</th>
                  {f.values.map((v, c) => (
                    <td key={c} className={`border-t border-chaparral/15 p-4 text-center ${plans[c].featured ? 'bg-poppy-soft/60' : ''}`}>
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border-t-2 border-chaparral p-4" />
                {plans.map((p) => (
                  <td key={p.id} className={`border-t-2 border-chaparral p-4 text-center ${p.featured ? 'bg-poppy-soft/60' : ''}`}>
                    <Link to={`/quote?plan=${p.id}`} className={`${p.featured ? 'btn-ink' : 'btn-line'} !min-h-[44px] w-full !px-4 !py-2 text-sm`}>
                      Choose {p.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-chaparral/70 sm:hidden">Swipe the table sideways to compare all plans.</p>
      </section>

      {/* Add-ons as a ledger */}
      <section className="on-dark relative overflow-hidden bg-chaparral py-20 text-adobe lg:py-28" aria-labelledby="addons-h">
        <div className="contours-light absolute inset-0" aria-hidden="true" />
        <div className="frame relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead light eyebrow="One-off jobs" title={<span id="addons-h">Starting rates</span>} titleClass="text-4xl sm:text-5xl" />
            <p className="mt-5 text-adobe/75">For single jobs or as add-ons to any plan. Final prices follow the walk-through.</p>
            <Placeholder className="mt-5 text-poppy">Rates: placeholder</Placeholder>
          </div>
          <dl className="lg:col-span-8">
            {addOns.map((a) => (
              <div key={a.name} className="flex items-baseline gap-4 border-b border-adobe/15 py-5">
                <dt className="min-w-0">
                  <span className="block font-display text-xl font-bold sm:text-2xl">{a.name}</span>
                  <span className="text-sm text-adobe/70">{a.note}</span>
                </dt>
                <span className="mx-2 hidden flex-1 border-b-2 border-dotted border-adobe/25 sm:block" aria-hidden="true" />
                <dd className="ml-auto shrink-0 whitespace-nowrap font-display text-xl font-bold text-poppy sm:text-2xl">{a.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="frame py-16 text-center">
        <p className="mx-auto max-w-2xl font-display text-3xl font-bold">No surprise fees. If the job changes, the price change is agreed in writing first.</p>
        <Link to="/quote" className="btn-poppy mt-8">
          Get my exact price <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <CtaBand tone="poppy" />
    </>
  );
}
