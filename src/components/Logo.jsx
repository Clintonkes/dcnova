import { site } from '@/config/site';

/**
 * DC Nova mark: a nova (four long rays, four short) rising over two ridge
 * contours, cut into a round badge. Uses currentColor for the ink, poppy for
 * the nova, so it works on light and dark grounds.
 */
export function Mark({ className = 'h-10 w-10', title }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx="32" cy="32" r="31" fill="currentColor" />
      <g fill="#B8C94A">
        <path d="M32 9 35 26 52 29 35 32 32 49 29 32 12 29 29 26Z" />
        <path d="M43 18 36.5 27 42 22.5ZM21 18l6.5 9L22 22.5Z" opacity=".9" />
      </g>
      <path d="M4 42c9-6 16-9 24-7s14 6 22 4 9-4 10-5v9c-3 6-8 13-28 13S6 50 4 42Z" fill="#F2F5E8" />
      <path d="M8 49c8-4 14-6 21-4.5S41 49 49 47.5 56 45 59 43" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 55c6-2.5 11-3.5 17-2.6s10 3 16 2.2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className = '', light = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className={`h-10 w-10 shrink-0 ${light ? 'text-chaparral-2' : 'text-chaparral'}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.32rem] font-extrabold tracking-tight ${light ? 'text-adobe' : 'text-chaparral'}`}>
          DC&nbsp;Nova
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${light ? 'text-adobe/75' : 'text-sage'}`}>
          Lawn care · {site.address.city}
        </span>
      </span>
    </span>
  );
}
