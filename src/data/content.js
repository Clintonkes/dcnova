import { pexels } from '@/lib/img';

/** Representative photography (verified Pexels images), not DC Nova job photos. */
export const gallery = [
  { id: 'mower', src: pexels(4162011), category: 'Mowing', title: 'Weekly cut, sharp blade', alt: 'Red walk-behind mower resting on a dense, freshly cut lawn' },
  { id: 'aloe', src: pexels(374934), category: 'Water-wise', title: 'Aloe and cactus border', alt: 'Red-tipped aloes with tall flower spikes in front of columnar cactus in a sunny garden' },
  { id: 'sprinkler', src: pexels(25283561), category: 'Irrigation', title: 'Re-aimed pop-up spray', alt: 'Pop-up sprinkler spraying a fan of water across green grass' },
  { id: 'hills', src: pexels(18027616), category: 'Fire safety', title: 'Oak-dotted hillside', alt: 'Rolling golden hills dotted with oak trees in late evening light' },
  { id: 'stripes', src: pexels(280222), category: 'Mowing', title: 'Front lawn, even colour', alt: 'Bright, evenly striped front lawn in front of a white house under blue sky' },
  { id: 'hedge', src: pexels(38936349), category: 'Hedges & shrubs', title: 'Hand-shaped hedge', alt: 'Gardener in workwear trimming a dense green hedge with long-handled shears' },
  { id: 'succulents', src: pexels(1903970), category: 'Water-wise', title: 'Succulent groundcover', alt: 'Overhead view of a dense bed of blue-grey and pink rosette succulents' },
  { id: 'trim', src: pexels(11364122), category: 'Fire safety', title: 'Trimming to 4 inches', alt: 'String trimmer line cutting grass close to the ground along a paved edge' },
  { id: 'blower', src: pexels(9620215), category: 'Cleanups', title: 'Fall leaf clearance', alt: 'Worker in a red jacket using a backpack leaf blower to clear fallen leaves' },
  { id: 'rotor', src: pexels(32974053), category: 'Irrigation', title: 'Rotor head check', alt: 'Close-up of a lawn sprinkler head throwing a jet of water across short green turf' },
  { id: 'pool', src: pexels(8143675), category: 'Mowing', title: 'Poolside lawn', alt: 'Manicured lawn with a single young tree beside a swimming pool and brick house' },
  { id: 'shears', src: pexels(38936344), category: 'Hedges & shrubs', title: 'Flat-top finish', alt: 'Hands guiding orange-handled hedge shears across a flat-topped hedge' },
  { id: 'rockplant', src: pexels(6421982), category: 'Water-wise', title: 'Gravel garden detail', alt: 'Broad-leaved succulent growing among white rocks and dry grasses' },
  { id: 'leaves', src: pexels(20805905), category: 'Cleanups', title: 'Wind debris cleanup', alt: 'Leaves flying from a blower as a worker clears a wooded garden' },
  { id: 'golden', src: pexels(6728925), category: 'Mowing', title: 'Golden-hour lawn', alt: 'Low view across sunlit grass toward a push mower in warm evening light' },
  { id: 'arbor', src: pexels(4920288), category: 'Hedges & shrubs', title: 'Screen-row trim', alt: 'Groundskeeper with a string trimmer beside a row of tall arborvitae' },
];

export const galleryCategories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];

/**
 * PLACEHOLDER reviews. These illustrate layout only and must be replaced with
 * real, verified customer reviews (with permission) before launch.
 */
export const testimonials = [
  { quote: 'They noticed two broken sprinkler heads on the first visit and had them fixed by the next. Our water bill dropped the following month.', name: 'Homeowner', place: 'San Diego Country Estates', service: 'Mowing + irrigation' },
  { quote: 'Clear quote, showed up when they said, and the defensible-space work was done before the wind season started. Photos and all.', name: 'Homeowner', place: 'Ramona', service: 'Brush clearance' },
  { quote: 'We took out half the front lawn. It used to be a chore; now it’s the best-looking yard on the street and takes almost no water.', name: 'Homeowner', place: 'Poway', service: 'Water-wise conversion' },
  { quote: 'The fescue was thin and patchy. After aeration and overseeding in the fall it filled in properly for the first time in years.', name: 'Homeowner', place: 'Ramona', service: 'Aeration & overseeding' },
  { quote: 'Every visit ends with a short text about what they saw. It feels like someone is actually paying attention to the property.', name: 'Property manager', place: 'Escondido', service: 'Weekly maintenance' },
  { quote: 'Hedges were overgrown past the windows. They brought them back over two visits without killing them, which the last crew managed to do.', name: 'Homeowner', place: 'Lakeside', service: 'Hedge & shrub care' },
];

export const process = [
  { n: '01', title: 'Walk the property', body: 'We meet you on site, or walk it ourselves if you prefer, and note turf type, soil, slope, irrigation and access.' },
  { n: '02', title: 'Written quote in a day', body: 'You get an itemized quote by text or email within one business day. No bundled extras you didn’t ask for.' },
  { n: '03', title: 'A set route day', body: 'Your property joins a regular route, so you know which day we come and roughly when.' },
  { n: '04', title: 'A note after every visit', body: 'A short message after each visit: what we did, what we saw, and anything that needs your call.' },
];

export const faqGroups = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      { q: 'How does the free quote work?', a: 'Fill in the quote form or call us. We visit the property, usually within a few business days, then send a written, itemized quote within one business day of the visit.' },
      { q: 'Do I need to be home for the walk-through?', a: 'It helps for the first one so we can hear what matters to you, but it isn’t required. Leave the gate code and any notes and we will send photos with the quote.' },
      { q: 'Is there a contract?', a: 'Maintenance plans are month to month. You can pause or cancel with notice before your next scheduled visit. Larger projects get a written agreement covering scope and price.' },
      { q: 'Which areas do you serve?', a: 'Ramona and San Diego Country Estates are our core routes. We also serve Poway, east Escondido, Lakeside, Santa Ysabel, Rancho Bernardo, and by arrangement Julian and Valley Center.' },
    ],
  },
  {
    id: 'lawn-care',
    title: 'Lawn care & water',
    items: [
      { q: 'How short should my lawn be cut?', a: 'Tall fescue does best at around 3 to 4 inches, and higher in summer heat. Bermuda tolerates lower cuts. We set the height for your grass and the season rather than one height for every yard.' },
      { q: 'Why is my lawn brown in winter?', a: 'If you have Bermuda or kikuyu, that is likely normal winter dormancy and the lawn will green up as soil warms in spring. Fescue browning in summer is usually a water or soil compaction problem we can diagnose.' },
      { q: 'How often should I water?', a: 'Deeply and less often is better than a little every day. Most inland lawns do well with two to three cycle-and-soak sessions a week in summer and much less in winter. Always follow your water district’s current rules.' },
      { q: 'Can you make my lawn use less water?', a: 'Yes. Usually through an irrigation tune-up, aeration to help water soak in, a higher mowing height, and sometimes converting the parts of the lawn you don’t use.' },
    ],
  },
  {
    id: 'fire-safety',
    title: 'Fire safety & brush clearance',
    items: [
      { q: 'What is defensible space?', a: 'The buffer between your home and the vegetation around it. Current CAL FIRE guidance divides it into zones out to 100 feet, with the strictest clearance closest to the house.' },
      { q: 'When should brush clearance be done?', a: 'In spring, as grasses dry out, and again before the fall Santa Ana season. We book clearance early because demand peaks in May and June.' },
      { q: 'Is it safe to mow dry grass?', a: 'Metal blades striking rocks can spark. We cut dry grass in the cool morning hours, use string trimmers near rocks, carry water and extinguishers, and never work on red-flag days.' },
    ],
  },
  {
    id: 'billing',
    title: 'Scheduling & billing',
    items: [
      { q: 'How do I pay?', a: 'Maintenance plans are billed monthly. Projects and cleanups are invoiced on completion. Accepted payment methods are listed on your invoice.' },
      { q: 'What if you miss something?', a: 'Tell us within 48 hours and we come back to fix it at no charge. That promise is a placeholder until the owner confirms it.' },
      { q: 'What happens on holidays or in bad weather?', a: 'We shift the route a day and let you know by text. Visits are never silently skipped.' },
    ],
  },
];

/** Team: placeholders until the owner supplies names, bios and photos. */
export const team = [
  { role: 'Owner & lead technician', name: '[Owner name]', bio: 'Runs every quote walk-through and sets the care plan for each property.' },
  { role: 'Irrigation lead', name: '[Team member]', bio: 'Handles sprinkler repairs, drip conversions and controller programming.' },
  { role: 'Field crew', name: '[Team member]', bio: 'Mowing, edging, hedges and cleanups on the weekly routes.' },
];

/** Credentials: status to be confirmed by the owner. Do not publish as fact until verified. */
export const credentials = [
  { title: 'General liability insurance', detail: 'Certificate of insurance available on request.', status: 'Owner to confirm' },
  { title: 'Workers’ compensation', detail: 'Coverage for every crew member on your property.', status: 'Owner to confirm' },
  { title: 'California business registration', detail: 'DC Nova LLC, registered in California.', status: 'Owner to confirm' },
  { title: 'Pest control business licensing', detail: 'Required in California for applying weed and pest control products for hire.', status: 'Owner to confirm' },
  { title: 'CSLB contractor license (C-27)', detail: 'Required for landscape construction over the state threshold, such as larger conversion projects.', status: 'Owner to confirm' },
];

export const values = [
  { title: 'Water is the budget', body: 'Every decision, from mowing height to plant choice, starts with how much water the yard will need in August.' },
  { title: 'Fire season is real', body: 'We treat defensible space as part of lawn care, not an extra. A neat yard should also be a safer one.' },
  { title: 'Say what we saw', body: 'You get a short note after every visit. If something is broken, dying or about to cost you money, you hear it from us first.' },
  { title: 'Same crew, same day', body: 'Fixed routes mean familiar faces and a predictable schedule, not a different stranger every week.' },
];

/** Plans for the pricing table. Prices are PLACEHOLDERS for the owner to set. */
export const plans = [
  { id: 'essential', name: 'Essential', price: '$45', unit: 'per visit', blurb: 'Clean, regular cuts for smaller lawns.', cadence: 'Every other week' },
  { id: 'steward', name: 'Steward', price: '$65', unit: 'per visit', blurb: 'Weekly care with feeding and irrigation checks built in.', cadence: 'Weekly', featured: true },
  { id: 'ranch', name: 'Ranch', price: 'Custom', unit: 'quoted on site', blurb: 'Acreage, slopes and full-property care including fire clearance.', cadence: 'Weekly + seasonal' },
];

export const planFeatures = [
  { label: 'Mowing, edging & blow-off', values: [true, true, true] },
  { label: 'Visit frequency', values: ['Every 2 weeks', 'Weekly (spring to fall)', 'Weekly + seasonal'] },
  { label: 'Visit note with photos', values: [true, true, true] },
  { label: 'Seasonal feeding program', values: ['Add-on', true, true] },
  { label: 'Spot weed control', values: ['Add-on', true, true] },
  { label: 'Monthly irrigation check', values: [false, true, true] },
  { label: 'Hedge & shrub trimming', values: ['Add-on', '2 visits / yr', '4 visits / yr'] },
  { label: 'Spring & fall cleanup', values: ['Add-on', '10% off', 'Included'] },
  { label: 'Defensible-space clearance', values: ['Add-on', 'Add-on', 'Included (1 / yr)'] },
  { label: 'Priority scheduling after storms', values: [false, true, true] },
];

export const pricingFactors = [
  { title: 'Turf area', body: 'Measured on the walk-through. Most of the price is time on site, and lawn size drives it.' },
  { title: 'Slope & access', body: 'Steep slopes, narrow gates and lots of obstacles mean more trimming by hand.' },
  { title: 'Condition', body: 'An overgrown first visit costs more than a regular cut. We quote it separately, once.' },
  { title: 'Frequency', body: 'Weekly visits cost less each than occasional ones because the grass is easier to manage.' },
];

export const addOns = [
  { name: 'Irrigation tune-up', price: 'From $95', note: 'Per controller, up to 6 zones' },
  { name: 'Core aeration', price: 'From $120', note: 'Typical suburban lawn' },
  { name: 'Overseeding', price: 'From $90', note: 'Seed and top-dressing extra' },
  { name: 'Spring or fall cleanup', price: 'From $180', note: 'Two-person crew, half-day' },
  { name: 'Brush clearance', price: 'From $250', note: 'Quoted by area and terrain' },
  { name: 'Water-wise conversion', price: 'Quoted', note: 'After a design walk-through' },
];
