import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import Seo from '@/components/Seo';
import { Spark } from '@/components/ui';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Service areas', href: '/service-areas' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="That page wandered off the route. Head back to DC Nova lawn care in Ramona, CA." noindex />
      <section className="relative overflow-hidden">
        <div className="contours absolute inset-0" aria-hidden="true" />
        <div className="frame relative grid min-h-[70vh] items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-manzanita"><Spark className="h-3 w-3 text-poppy" /> Error 404</p>
            <h1 className="mt-5 text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.92]">This patch hasn’t been planted.</h1>
            <p className="mt-6 max-w-md text-lg text-chaparral/80">
              The page you’re after has moved or never existed. Try one of these instead, or head home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/" className="btn-ink">
                <Home className="h-4 w-4" aria-hidden="true" /> Back to home
              </Link>
              <Link to="/quote" className="btn-line">Get a quote</Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="inline-flex items-center gap-1.5 rounded-full border-2 border-chaparral/25 px-4 py-2 text-sm font-semibold hover:border-chaparral">
                    {l.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Illustration: bare-soil "404" with a single sprout */}
          <svg viewBox="0 0 400 300" className="mx-auto w-full max-w-lg" role="img" aria-label="Illustration of the number 404 drawn as soil mounds with a small sprout">
            <ellipse cx="200" cy="262" rx="190" ry="18" fill="#DCCEB4" />
            <text x="200" y="230" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="170" fill="#16211B" letterSpacing="-8">0</text>
            <text x="58" y="230" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="170" fill="#7A2E1D" letterSpacing="-8">4</text>
            <text x="342" y="230" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="170" fill="#7A2E1D" letterSpacing="-8">4</text>
            <g transform="translate(200 72)">
              <path d="M0 40V0" stroke="#5D6B52" strokeWidth="5" strokeLinecap="round" />
              <path d="M0 14C-4 0-18-6-30-2c4 12 18 18 30 2Z" fill="#5D6B52" />
              <path d="M0 6C4-8 18-14 30-10c-4 12-18 18-30 4Z" fill="#5D6B52" />
            </g>
            <path d="M200 12 204 26 218 30 204 34 200 48 196 34 182 30 196 26Z" fill="#F25C1E" />
          </svg>
        </div>
      </section>
    </>
  );
}
