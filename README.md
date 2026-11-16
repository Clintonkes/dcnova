# DC Nova LLC

Marketing site for **DC Nova LLC**, a lawn care company at 1512 San Vicente Rd, Ramona, California (inland San Diego County). Live domain: **https://dcnovallc.com**.

- **Frontend**: React 18, Vite, React Router, Tailwind and react-helmet-async, in `src/`. Deployed to GitHub Pages by `.github/workflows/frontend.yml` on every push to `main`.
- **Backend (optional)**: FastAPI and SQLAlchemy, in `backend/`. Deployable to Render from `render.yaml` and the `Dockerfile`. The site works without it (see *Forms*).

## Design system

| | |
| --- | --- |
| Identity | Sun-country groundskeeping: water-wise, fire-aware lawn care for the Ramona backcountry |
| Palette | Adobe `#F2F5E8` · Chaparral `#17351F` · Sage `#5C7A4C` · Soil `#6D5130` · **Lawn `#B8C94A`** (accent) |
| Type | Bricolage Grotesque (display) + Instrument Sans (body) |
| Layout | Editorial · floating pill nav · asymmetric hero · organic shapes (arch frames, pill buttons) |
| Motif | Topographic contour lines + the four-point “nova spark” (bullets, dividers, loader) |
| Logo | Nova rising over two ridge contours: `src/components/Logo.jsx`, `public/favicon.svg` |

## Where things live

| What | File |
| --- | --- |
| Business details, colours, fonts, nav, hours, service areas, trust signals, form settings | `src/config/site.js` (read by Tailwind and Vite too) |
| Services (cards and `/services/:slug` detail pages) | `src/data/services.js` |
| Gallery, testimonials, FAQ, team, credentials, pricing plans | `src/data/content.js` |
| Form submission (the single submit function) | `src/lib/submitForm.js` |

## Before launch: placeholders to replace

Everything below is marked **Placeholder** on the site:

- **Hours** (`site.hours`, `hoursPlaceholder: true`)
- **Trust signals**: insurance, re-service promise, years in business, star rating (`site.trust`)
- **Testimonials**: sample text only. Replace with real, verified reviews (`content.js`)
- **Team names/photos and credentials** (`content.js`)
- **Prices** in the pricing table and starting rates (`content.js`)
- **Social links** (`site.social`)
- The founder’s quote on `/about`

The photos are verified Pexels images used as representative photography until DC Nova job photos are available.

## Routes

`/`, `/about`, `/services`, `/services/:slug` (8 services), `/pricing`, `/gallery`, `/service-areas`, `/testimonials`, `/faq`, `/quote`, `/contact`, `/privacy`, `/terms`, and a custom 404. `sitemap.xml` and `robots.txt` are generated at build time from the `routes` list in `src/config/site.js`.

## Forms

Both forms validate in the browser, show a loading state and finish on a success screen. They go through one function, `submitForm()` in `src/lib/submitForm.js`:

- **`VITE_API_URL` not set** (default): placeholder mode. The function waits about a second and resolves successfully. Nothing is stored or sent.
- **`VITE_API_URL` set**: the quote wizard posts to `/api/bookings` and the contact form to `/api/contacts` on the FastAPI backend.

To use a different service (Formspree, a CRM webhook, etc.), change only `submitForm()`.

> Note: if your local `.env` sets `VITE_API_URL=http://localhost:8000`, the forms show an error unless the backend is running. Remove the value, or start the backend.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build && npm run preview
```

Optional backend:

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
ADMIN_PASSWORD=devpass123 uvicorn main:app --reload   # http://localhost:8000/docs
```

## Deploying (GitHub Pages + dcnovallc.com)

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Repo → Settings → Secrets and variables → Actions → **Variables**:
   - `CUSTOM_DOMAIN` = `dcnovallc.com` (canonical URLs, Open Graph, sitemap, CNAME)
   - `VITE_API_URL` = backend URL (optional)
3. At the domain registrar, add DNS records:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www`: `clintonkes.github.io`
4. Repo → Settings → Pages → **Custom domain**: `dcnovallc.com`, then tick **Enforce HTTPS** once the certificate is issued.
5. Push to `main`.

The same build also works at `https://clintonkes.github.io/dcnova/`: the router base and asset URLs are resolved at runtime (`src/lib/paths.js`, `vite.config.js`), and `public/404.html` handles deep links.

### Backend (optional, Render)

Render → New → Blueprint → pick this repo; it creates `dcnova-backend` from `render.yaml`. Set `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `RESEND_API_KEY`/`EMAIL_FROM`. `https://dcnovallc.com` and `https://www.dcnovallc.com` are already allowed for CORS in `backend/main.py`.
