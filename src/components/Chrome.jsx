import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { useStoredState } from '@/lib/hooks';

/** Scrolls to top (or to a hash target) on route change, and moves focus to main. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}

/** Thumb-reach call button on small screens. */
export function MobileCallButton() {
  const { pathname } = useLocation();
  if (pathname === '/quote') return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_auto] gap-2 sm:hidden">
      <Link to="/quote" className="btn-ink !min-h-[52px] shadow-lg">Free quote</Link>
      <a href={site.phoneHref} className="btn-poppy !min-h-[52px] !px-5 shadow-lg" aria-label={`Call ${site.phoneDisplay}`}>
        <Phone className="h-5 w-5" aria-hidden="true" /> Call
      </a>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border-2 border-chaparral bg-adobe text-chaparral shadow-lg transition sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      } hover:bg-poppy`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/** Cookie notice. The site sets no tracking cookies; this records the visitor's choice only. */
export function CookieBanner() {
  const [choice, setChoice] = useStoredState('dcn-cookies-v1', null);
  if (choice) return null;
  return (
    <section
      aria-label="Cookie notice"
      className="fixed bottom-20 left-3 right-3 z-50 max-w-md animate-rise rounded-blob border-2 border-chaparral bg-adobe p-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto"
    >
      <h2 className="font-display text-xl font-bold">A quick note on cookies</h2>
      <p className="mt-2 text-sm text-chaparral/80">
        We only use your browser’s storage to remember small choices, like dismissing this notice. No ad trackers. Read the{' '}
        <Link to="/privacy" className="link-u">privacy policy</Link>.
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => setChoice('accepted')} className="btn-ink !min-h-[44px] !py-2">Sounds good</button>
        <button type="button" onClick={() => setChoice('essential')} className="btn-line !min-h-[44px] !py-2">Essential only</button>
      </div>
    </section>
  );
}
