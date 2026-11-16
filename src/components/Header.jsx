import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { site } from '@/config/site';
import { useStoredState } from '@/lib/hooks';
import Logo from './Logo';
import { Spark } from './ui';

function AnnouncementBar() {
  const [hidden, setHidden] = useStoredState('dcn-announce-v1', false);
  if (hidden) return null;
  const a = site.announcement;
  return (
    <div className="relative bg-chaparral text-adobe">
      <div className="frame flex items-center justify-center gap-3 py-2.5 pr-12 text-center text-sm">
        <Spark className="hidden h-3 w-3 shrink-0 text-poppy sm:block" />
        <p>
          {a.text}{' '}
          <Link to={a.href} className="font-semibold text-poppy underline decoration-2 underline-offset-4 hover:text-adobe">
            {a.linkLabel}
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setHidden(true)}
        className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-adobe/80 hover:text-adobe"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = menuRef.current;
    panel?.querySelector('a, button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panel) {
        const els = panel.querySelectorAll('a, button');
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-poppy focus:px-5 focus:py-3 focus:font-semibold">
        Skip to content
      </a>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex max-w-frame items-center justify-between gap-4 rounded-full border-2 border-chaparral bg-adobe/95 py-2 pl-3 pr-2 backdrop-blur transition-shadow sm:pl-4 ${
            scrolled ? 'shadow-[0_10px_30px_-12px_rgba(22,33,27,0.35)]' : ''
          }`}
        >
          <Link to="/" aria-label={`${site.name}, home`} className="shrink-0 rounded-full">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition xl:px-4 ${
                        isActive ? 'bg-chaparral text-adobe' : 'hover:bg-adobe-2'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold hover:bg-adobe-2 xl:inline-flex">
              <Phone className="h-4 w-4 text-manzanita" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <Link to="/quote" className="btn-poppy hidden !min-h-[44px] !px-5 !py-2 sm:inline-flex">
              Free quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-chaparral text-adobe lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-dark fixed inset-0 z-[60] flex animate-fade flex-col overflow-y-auto bg-chaparral text-adobe lg:hidden"
        >
          <div className="contours-light pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative flex items-center justify-between px-5 pt-5">
            <Logo light />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="grid h-11 w-11 place-items-center rounded-full bg-poppy text-chaparral"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="relative mt-8 flex-1 px-5">
            <ul className="space-y-1">
              {[{ label: 'Home', href: '/' }, ...site.nav, { label: 'FAQ', href: '/faq' }, { label: 'Contact', href: '/contact' }].map((item, i) => (
                <li key={item.href} className="animate-rise" style={{ animationDelay: `${i * 35}ms` }}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-adobe/15 py-3 font-display text-3xl font-bold ${isActive ? 'text-poppy' : ''}`
                    }
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 opacity-50" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative grid gap-3 p-5">
            <Link to="/quote" className="btn-poppy">Get a free quote</Link>
            <a href={site.phoneHref} className="btn-line-light">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
