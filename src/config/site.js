/**
 * DC Nova LLC: single source of truth.
 * Business details, brand colours, fonts, navigation and form settings all
 * live here. tailwind.config.js and vite.config.js read this file too, so a
 * change here flows through the whole site (plus sitemap and JSON-LD) on the
 * next build. Keep this file free of imports: Node loads it at build time.
 */

export const site = {
  name: 'DC Nova LLC',
  shortName: 'DC Nova',
  legalName: 'DC Nova LLC',
  industry: 'Lawn care',
  tagline: 'Lawn care for the Ramona backcountry',
  promise: 'Healthy lawns, lean water bills, clean fire lines.',
  description:
    'DC Nova is a lawn care company in Ramona, California. Mowing, fertilization, aeration, irrigation repair, water-wise conversions and defensible-space brush clearance across inland San Diego County.',

  phone: '+1 (760) 315-2870',
  phoneDisplay: '(760) 315-2870',
  phoneHref: 'tel:+17603152870',
  email: 'dcnovallc@proton.me',
  emailHref: 'mailto:dcnovallc@proton.me',

  address: {
    street: '1512 San Vicente Rd',
    city: 'Ramona',
    region: 'CA',
    postal: '92065',
    country: 'US',
    county: 'San Diego County',
  },
  // Approximate location of the street address, used for JSON-LD geo only.
  geo: { lat: 33.0303, lng: -116.8698 },
  timeZone: 'America/Los_Angeles',

  /** PLACEHOLDER hours: owner to confirm before launch. */
  hoursPlaceholder: true,
  hours: [
    { label: 'Monday to Friday', short: 'Mon–Fri', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '07:00', close: '17:00', value: '7:00 am – 5:00 pm' },
    { label: 'Saturday', short: 'Sat', days: ['Sa'], open: '08:00', close: '13:00', value: '8:00 am – 1:00 pm' },
    { label: 'Sunday', short: 'Sun', days: ['Su'], open: null, close: null, value: 'Closed' },
  ],

  /** Service area. Distances are approximate road miles from the Ramona yard. */
  serviceArea: [
    { name: 'Ramona', slug: 'ramona', distance: 0, zone: 'core', note: 'Home yard. Weekly routes run every weekday.' },
    { name: 'San Diego Country Estates', slug: 'sdce', distance: 5, zone: 'core', note: 'Weekly routes, slopes and HOA frontages.' },
    { name: 'Santa Ysabel', slug: 'santa-ysabel', distance: 14, zone: 'extended', note: 'Acreage, brush clearance and seasonal visits.' },
    { name: 'Poway', slug: 'poway', distance: 15, zone: 'extended', note: 'Maintenance routes and water-wise conversions.' },
    { name: 'Escondido (east)', slug: 'escondido', distance: 17, zone: 'extended', note: 'Maintenance routes and irrigation work.' },
    { name: 'Lakeside', slug: 'lakeside', distance: 18, zone: 'extended', note: 'Defensible space and seasonal cleanups.' },
    { name: 'Rancho Bernardo', slug: 'rancho-bernardo', distance: 19, zone: 'extended', note: 'Irrigation tune-ups and turf replacement.' },
    { name: 'Valley Center', slug: 'valley-center', distance: 22, zone: 'project', note: 'Projects and brush clearance by arrangement.' },
    { name: 'Julian', slug: 'julian', distance: 23, zone: 'project', note: 'Fire-season clearance and fall cleanups by arrangement.' },
  ],

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/', placeholder: true },
    { label: 'Facebook', href: 'https://www.facebook.com/', placeholder: true },
    { label: 'Google Business Profile', href: 'https://www.google.com/business/', placeholder: true },
    { label: 'Nextdoor', href: 'https://nextdoor.com/', placeholder: true },
  ],

  announcement: {
    text: 'Fire-season brush clearance is booking now for Ramona and the backcountry.',
    linkLabel: 'Get on the schedule',
    href: '/services/brush-clearance',
  },

  /** Brand palette. Tailwind utilities are generated from these names. */
  colors: {
    adobe: '#F2F5E8', // canvas: soft lawn green
    chaparral: '#17351F', // ink: deep turf green
    sage: '#5C7A4C', // secondary text, rules
    manzanita: '#6D5130', // warm soil accent
    poppy: '#B8C94A', // fresh grass accent
  },

  fonts: {
    display: 'Bricolage Grotesque',
    body: 'Instrument Sans',
    googleHref:
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
  },

  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Work', href: '/gallery' },
    { label: 'Areas', href: '/service-areas' },
    { label: 'About', href: '/about' },
  ],

  footerNav: [
    {
      heading: 'Company',
      links: [
        { label: 'About DC Nova', href: '/about' },
        { label: 'Our work', href: '/gallery' },
        { label: 'Testimonials', href: '/testimonials' },
      ],
    },
    {
      heading: 'Lawn care',
      links: [
        { label: 'All services', href: '/services' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Service areas', href: '/service-areas' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      heading: 'Start here',
      links: [
        { label: 'Get a quote', href: '/quote' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy policy', href: '/privacy' },
        { label: 'Terms of service', href: '/terms' },
      ],
    },
  ],

  formSettings: {
    /**
     * Base URL of the FastAPI backend in backend/. Leave empty here and set
     * VITE_API_URL at build time; that value takes precedence. When neither
     * is set, submitForm() runs as a placeholder and resolves successfully.
     */
    apiUrl: '',
    endpoints: { quote: '/api/bookings', contact: '/api/contacts' },
    timeoutMs: 75000,
    slowNoticeMs: 6000,
    minMessageLength: 15,
    replyPromise: 'A real person at DC Nova reads every message and replies within one business day.',
  },

  /** Trust signals. Everything marked placeholder must be confirmed by the owner. */
  trust: [
    { key: 'insured', label: 'Licensed & insured', detail: 'Certificates on request', placeholder: true },
    { key: 'guarantee', label: '48-hour re-service promise', detail: 'Missed a spot? We return free', placeholder: true },
    { key: 'years', label: '[X] years in Ramona', detail: 'Owner to confirm', placeholder: true },
    { key: 'stars', label: '[X.X] ★ average rating', detail: 'Link verified reviews', placeholder: true },
  ],

  deploy: {
    // GitHub Pages project path. The router and 404.html use this so one build
    // works on https://clintonkes.github.io/dcnova/ and on the custom domain.
    repoBase: 'dcnova',
    githubUrl: 'https://clintonkes.github.io/dcnova',
    domain: 'https://dcnovallc.com',
  },
};

/** Every public route, used by the sitemap generator in vite.config.js. */
export const routes = [
  '/',
  '/about',
  '/services',
  '/services/lawn-mowing',
  '/services/fertilization-weed-control',
  '/services/aeration-overseeding',
  '/services/irrigation',
  '/services/water-wise-conversions',
  '/services/brush-clearance',
  '/services/hedge-shrub-care',
  '/services/seasonal-cleanups',
  '/pricing',
  '/gallery',
  '/service-areas',
  '/testimonials',
  '/faq',
  '/quote',
  '/contact',
  '/privacy',
  '/terms',
];
