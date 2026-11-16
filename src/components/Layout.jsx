import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { BackToTop, CookieBanner, MobileCallButton, ScrollManager } from './Chrome';
import { LocalBusinessSchema } from './Seo';

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessSchema />
      <ScrollManager />
      <Header />
      {/* Keyed on the path so each route plays the page-in transition. */}
      <main id="main" tabIndex={-1} key={pathname} className="flex-1 animate-rise outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileCallButton />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}
