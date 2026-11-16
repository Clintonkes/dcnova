import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ChevronRight, Phone, RotateCcw, ShieldCheck, Star, Sun } from 'lucide-react';
import { site } from '@/config/site';
import { useReveal } from '@/lib/hooks';

/** The nova spark: the brand's bullet, divider and accent glyph. */
export function Spark({ className = 'h-3.5 w-3.5 text-poppy' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0 14.6 9.4 24 12 14.6 14.6 12 24 9.4 14.6 0 12 9.4 9.4Z" />
    </svg>
  );
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = 'text-manzanita' }) {
  return (
    <p className={`eyebrow ${className}`}>
      <Spark className="h-3 w-3 text-poppy" />
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, intro, align = 'left', className = '', titleClass = 'text-4xl sm:text-5xl lg:text-6xl', light = false, as: H = 'h2' }) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className={light ? 'text-poppy' : 'text-manzanita'}>{eyebrow}</Eyebrow>}
      <H className={`mt-4 font-extrabold ${titleClass}`}>{title}</H>
      {intro && <p className={`mt-5 text-lg ${light ? 'text-adobe/80' : 'text-chaparral/80'} ${align === 'center' ? 'mx-auto' : ''} max-w-2xl`}>{intro}</p>}
    </Reveal>
  );
}

export function Placeholder({ children = 'Placeholder', className = '' }) {
  return (
    <span className={`chip-placeholder ${className}`} title="Placeholder: owner to confirm before launch">
      {children}
    </span>
  );
}

export function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? 'text-adobe/75' : 'text-sage'}`}>
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {it.href && i < items.length - 1 ? (
              <Link to={it.href} className="hover:underline">{it.label}</Link>
            ) : (
              <span aria-current="page" className={light ? 'text-adobe' : 'text-chaparral'}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const TRUST_ICONS = { insured: ShieldCheck, guarantee: RotateCcw, years: Sun, stars: Star };

/** Trust signals, all flagged as placeholders in site.js until the owner confirms. */
export function TrustBar({ variant = 'strip' }) {
  if (variant === 'stack') {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {site.trust.map((t) => {
          const Icon = TRUST_ICONS[t.key] || BadgeCheck;
          return (
            <li key={t.key} className="flex items-start gap-3 rounded-blob border-2 border-line bg-adobe p-5">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-manzanita" aria-hidden="true" />
              <div>
                <p className="font-semibold">{t.label}</p>
                <p className="text-sm text-chaparral/70">{t.detail}</p>
                {t.placeholder && <Placeholder className="mt-2 text-manzanita" />}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <section aria-label="Why homeowners trust DC Nova" className="border-y-2 border-chaparral bg-adobe-2">
      <ul className="frame grid grid-cols-2 lg:grid-cols-4">
        {site.trust.map((t, i) => {
          const Icon = TRUST_ICONS[t.key] || BadgeCheck;
          return (
            <li key={t.key} className={`flex items-center gap-3 py-5 lg:py-6 ${i % 2 ? 'pl-4 sm:pl-6' : 'pr-4'} ${i > 0 ? 'lg:border-l-2 lg:border-chaparral/15 lg:pl-6' : ''}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-chaparral text-poppy">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold leading-tight">{t.label}</span>
                <span className="mt-0.5 block text-xs text-chaparral/70">
                  {t.detail}
                  {t.placeholder && <span className="ml-1 font-semibold uppercase tracking-wider text-manzanita">· placeholder</span>}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Closing call to action. `tone` switches between the poppy and dark versions. */
export function CtaBand({ title = 'Let’s walk your property.', body = 'Tell us what the yard needs. We come out, measure, and send a written quote within one business day. No charge, no pressure.', tone = 'dark' }) {
  const dark = tone === 'dark';
  return (
    <section className={`relative overflow-hidden ${dark ? 'on-dark bg-chaparral text-adobe' : 'bg-poppy text-chaparral'}`}>
      <div className={`absolute inset-0 ${dark ? 'contours-light' : 'contours'}`} aria-hidden="true" />
      <div className="frame relative grid items-center gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
        <Reveal>
          <h2 className="text-4xl font-extrabold sm:text-6xl">{title}</h2>
          <p className={`mt-5 max-w-xl text-lg ${dark ? 'text-adobe/80' : 'text-chaparral/85'}`}>{body}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
          <Link to="/quote" className={dark ? 'btn-poppy' : 'btn-ink'}>
            Get my free quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={site.phoneHref} className={dark ? 'btn-line-light' : 'btn-line'}>
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Arch-topped photo frame: the site's signature image shape. */
export function Arch({ children, className = '' }) {
  return <div className={`overflow-hidden rounded-arch ${className}`}>{children}</div>;
}

/** Accessible disclosure for FAQs. */
export function AccordionItem({ q, children, defaultOpen = false, compact = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b-2 border-chaparral/15">
      <h3 className="font-sans">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((o) => !o)}
          className={`group flex w-full items-start justify-between gap-6 text-left ${compact ? 'py-4' : 'py-6'}`}
        >
          <span className={`font-display font-bold ${compact ? 'text-lg' : 'text-xl sm:text-2xl'} leading-snug tracking-tight`}>{q}</span>
          <span
            className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-chaparral transition ${open ? 'rotate-45 bg-poppy' : 'group-hover:bg-adobe-2'}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" /></svg>
          </span>
        </button>
      </h3>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!open} className="pb-6 pr-12 text-chaparral/85">
        {children}
      </div>
    </div>
  );
}

export function ArrowLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2 font-semibold ${className}`}>
      <span className="link-u">{children}</span>
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
