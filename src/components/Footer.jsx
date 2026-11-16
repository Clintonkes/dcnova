import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site';
import Logo from './Logo';
import { Placeholder, Spark } from './ui';

export default function Footer() {
  const a = site.address;
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-chaparral text-adobe">
      {/* Ridge line: the contour motif at the top of the footer */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-12 w-full text-adobe sm:h-16" aria-hidden="true">
        <path d="M0 0h1440v34c-120 26-240 40-380 22S820 2 680 12 420 64 280 62 80 30 0 40Z" fill="currentColor" />
        <path d="M0 52c80-10 200 18 300 18s240-46 380-52 260 40 380 46 260-12 380-30" fill="none" stroke="#D4A64A" strokeWidth="2" />
      </svg>

      <div className="frame relative grid gap-12 pb-10 pt-10 lg:grid-cols-12 lg:pt-14">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-adobe/75">{site.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social profiles">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-adobe/25 px-3 py-1.5 text-sm hover:border-poppy hover:text-poppy"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab{s.placeholder ? ', placeholder link' : ''})</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-adobe/75">Social links are placeholders until profiles are live.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {site.footerNav.map((col) => (
            <div key={col.heading}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-label text-poppy">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-adobe/85 hover:text-poppy hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="space-y-5 lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-label text-poppy">Reach us</h2>
          <a href={site.phoneHref} className="flex items-center gap-3 font-display text-2xl font-bold hover:text-poppy">
            <Phone className="h-5 w-5" aria-hidden="true" /> {site.phoneDisplay}
          </a>
          <a href={site.emailHref} className="flex items-center gap-3 break-all hover:text-poppy">
            <Mail className="h-5 w-5 shrink-0" aria-hidden="true" /> {site.email}
          </a>
          <p className="flex gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>
              {a.street}
              <br />
              {a.city}, {a.region} {a.postal}
            </span>
          </p>
          <div className="flex gap-3">
            <Clock className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {site.hours.map((h) => (
                <div key={h.label} className="contents">
                  <dt className="text-adobe/70">{h.short}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {site.hoursPlaceholder && <Placeholder className="text-poppy">Hours: placeholder</Placeholder>}
        </div>
      </div>

      <div className="frame relative flex flex-col gap-3 border-t border-adobe/15 py-6 text-sm text-adobe/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. {a.city}, {a.county}, California.
        </p>
        <p className="flex items-center gap-2">
          <Link to="/privacy" className="hover:text-poppy">Privacy</Link>
          <Spark className="h-2 w-2 text-poppy" />
          <Link to="/terms" className="hover:text-poppy">Terms</Link>
          <Spark className="h-2 w-2 text-poppy" />
          <a href="#main" className="hover:text-poppy">Back to top</a>
        </p>
      </div>
    </footer>
  );
}
