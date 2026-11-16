import { Droplets, Flame, Leaf, Scissors, Sprout, TreeDeciduous, Wind, Waves } from 'lucide-react';
import { pexels } from '@/lib/img';

/**
 * Services shown on /services and /services/:slug. Slugs must match the
 * routes list in src/config/site.js (used for the sitemap).
 */
export const services = [
  {
    slug: 'lawn-mowing',
    name: 'Lawn mowing & edging',
    short: 'Mowing',
    icon: Scissors,
    image: pexels(4162011),
    alt: 'Red walk-behind mower resting on a dense, freshly cut lawn',
    summary: 'Weekly or every-other-week cuts at the right height for your grass, with crisp edges and a clean blow-off.',
    intro:
      'Most lawns in Ramona are tall fescue, Bermuda or kikuyu, and each wants a different height and rhythm. We set the deck for your turf and the season, never scalp in summer, and finish every visit by edging hard lines and blowing clippings off drives and walks.',
    includes: [
      'Mowing at a height set for your grass type and the season',
      'Edging along drives, walks and curbs',
      'String-trimming around beds, posts, fences and slopes',
      'Blow-off of all hard surfaces',
      'Sharpened blades every week, for a clean cut that browns less',
      'A quick note after each visit if we spot pests, dry spots or broken heads',
    ],
    rhythm: 'Weekly from March to October, every other week through winter dormancy.',
    goodFor: 'Homeowners who want the lawn handled without having to think about it.',
    faqs: [
      { q: 'Do you bag clippings?', a: 'Usually not. Mulched clippings return nitrogen to the soil. We bag on request, and when growth is heavy enough that clumps would smother the turf.' },
      { q: 'What if it rains on my day?', a: 'We shift the route a day and text you. Mowing wet clay soil leaves ruts, so we wait it out.' },
    ],
  },
  {
    slug: 'fertilization-weed-control',
    name: 'Fertilization & weed control',
    short: 'Feed & weed',
    icon: Sprout,
    image: pexels(280222),
    alt: 'Bright, evenly striped front lawn in front of a white house under blue sky',
    summary: 'A seasonal feeding program matched to warm- or cool-season turf, with targeted weed control instead of blanket spraying.',
    intro:
      'Inland soils here run alkaline and often low in organic matter. We feed on a schedule built for your turf type, use slow-release products to avoid surge growth, and spot-treat weeds rather than spraying the whole yard. Any product application is done in line with California and San Diego County requirements.',
    includes: [
      'Turf-type and soil check on the first visit',
      'Four to six seasonal feedings, timed to your grass',
      'Pre-emergent for crabgrass and spurge where it makes sense',
      'Spot treatment of broadleaf weeds and nutsedge',
      'Iron and micronutrient treatments for yellowing turf',
      'Notes on watering after each application',
    ],
    rhythm: 'Every six to eight weeks, timed to the turf’s growth.',
    goodFor: 'Thin, pale or patchy lawns, and yards losing ground to weeds.',
    faqs: [
      { q: 'Is it safe for kids and pets?', a: 'We tell you exactly what was applied and how long to keep off the lawn, which is usually until it has dried. Organic-leaning programs are available on request.' },
      { q: 'How soon will I see results?', a: 'Colour usually improves within two to three weeks. Thickening up a thin lawn takes a full season, often alongside aeration and overseeding.' },
    ],
  },
  {
    slug: 'aeration-overseeding',
    name: 'Aeration & overseeding',
    short: 'Aeration',
    icon: Waves,
    image: pexels(7546775),
    alt: 'Single-storey home with a covered patio opening onto a wide, even lawn',
    summary: 'Core aeration to open compacted clay, then overseeding and top-dressing to rebuild thin, tired turf.',
    intro:
      'Ramona’s clay and decomposed granite pack down hard, so water runs off instead of soaking in. Core aeration pulls plugs of soil to let air, water and feed reach the roots. Paired with overseeding, it is the most effective way to thicken a fescue lawn without starting over.',
    includes: [
      'Marking of sprinkler heads and shallow lines before we start',
      'Double-pass core aeration on compacted areas',
      'Dethatching where thatch is thicker than half an inch',
      'Overseeding with a blend suited to your sun and shade',
      'Compost top-dressing on request',
      'A written watering plan for germination',
    ],
    rhythm: 'Fall for cool-season fescue; late spring for Bermuda and other warm-season grasses.',
    goodFor: 'Lawns that puddle, run off, feel hard underfoot or have thinned out.',
    faqs: [
      { q: 'What happens to the soil plugs?', a: 'We leave them on the lawn. They break down within one to two weeks of watering and mowing and return soil to the surface.' },
      { q: 'Will you damage my sprinklers?', a: 'We flag every head and valve box before the aerator goes down. If we hit anything, we fix it at no cost.' },
    ],
  },
  {
    slug: 'irrigation',
    name: 'Irrigation repair & tune-ups',
    short: 'Irrigation',
    icon: Droplets,
    image: pexels(25283561),
    alt: 'Pop-up sprinkler spraying a fan of water across green grass',
    summary: 'Sprinkler and drip repairs, head adjustments and smart-controller scheduling that cut waste without browning the lawn.',
    intro:
      'In inland San Diego County, a large share of a household’s water use goes outdoors. Most systems we open up have broken heads, overspray onto pavement, or a controller still on last summer’s schedule. A tune-up fixes the hardware and sets run times to the soil, slope and season.',
    includes: [
      'Zone-by-zone inspection with the system running',
      'Repair or replacement of heads, nozzles, risers and drip lines',
      'Re-aiming to stop overspray onto drives and walls',
      'Cycle-and-soak programming for clay soil and slopes',
      'Smart and weather-based controller setup',
      'Leak checks at valves and backflow (reported, not certified)',
    ],
    rhythm: 'A full tune-up in spring, a quick check before the summer heat, and on call for leaks.',
    goodFor: 'High water bills, dry or soggy patches, and systems nobody has touched in years.',
    faqs: [
      { q: 'Do you install whole new systems?', a: 'We handle repairs, retrofits, drip conversions and controller upgrades. For larger installs we scope the job and quote it in writing first.' },
      { q: 'Can you help with water-district rebates?', a: 'We can point you to current programs and supply the details they ask for. Rebate rules change, so check eligibility with your water district before work starts.' },
    ],
  },
  {
    slug: 'water-wise-conversions',
    name: 'Water-wise lawn conversions',
    short: 'Water-wise',
    icon: Leaf,
    image: pexels(374934),
    alt: 'Red-tipped aloes with tall flower spikes in front of columnar cactus in a sunny San Diego garden',
    summary: 'Swap thirsty turf for drought-tolerant planting, mulch and drip, or shrink the lawn to the part you actually use.',
    intro:
      'You don’t have to give up green to save water. We help you decide how much lawn to keep, remove the rest properly so it doesn’t come back, and replant with California-native and Mediterranean plants on drip irrigation. The result needs a fraction of the water and very little mowing.',
    includes: [
      'Site walk and a sketch plan of lawn to keep and lawn to convert',
      'Turf removal by sod-cutting or sheet-mulching',
      'Soil prep and grading for drainage',
      'Planting of natives and drought-tolerant perennials',
      'Drip irrigation and controller programming',
      'Decorative rock, decomposed granite or bark mulch',
    ],
    rhythm: 'Best planted from October to March, when winter rain helps roots establish.',
    goodFor: 'Front yards, parkway strips, slopes and any lawn that only gets looked at.',
    faqs: [
      { q: 'Will it look like a rock yard?', a: 'No. Done well, a water-wise yard is full of texture, colour and seasonal bloom. Rock and mulch are there to hold moisture, not to be the whole design.' },
      { q: 'How long until it fills in?', a: 'Most plantings look settled after one full season and mature in two to three years. We space plants for their adult size.' },
    ],
  },
  {
    slug: 'brush-clearance',
    name: 'Brush clearance & defensible space',
    short: 'Fire safety',
    icon: Flame,
    image: pexels(18027616),
    alt: 'Rolling golden hills dotted with oak trees in late evening light',
    summary: 'Cutting dry grass and brush, limbing trees and clearing debris to create defensible space around your home.',
    intro:
      'Ramona sits in wildfire country, and defensible space is one of the most effective protections a home has. We work from current CAL FIRE guidance: keep the first 30 feet lean, clean and green, and reduce fuel out to 100 feet. We use tools and timing that keep sparks off dry grass.',
    includes: [
      'Cutting dry annual grass to 4 inches or less within 100 feet of structures',
      'Clearing dead plants, leaves and needles from roofs, gutters and decks',
      'Limbing trees up off the ground and away from rooflines',
      'Spacing shrubs to break up continuous fuel',
      'Hauling or chipping cleared material',
      'Before-and-after photos you can keep with your records',
    ],
    rhythm: 'Once in spring as grasses cure, and again before the fall Santa Ana season.',
    goodFor: 'Homes on acreage, slopes, and lots that border open land.',
    faqs: [
      { q: 'Do you mow dry grass in the heat?', a: 'No. We cut dry grass in the cooler morning hours and never on hot, windy red-flag days. Crews carry water and extinguishers on every clearance job.' },
      { q: 'Will this satisfy an inspection?', a: 'We work to current CAL FIRE and county guidance, but inspectors make the final call. If you have a notice, share it with us and we will work to its specific requirements.' },
    ],
  },
  {
    slug: 'hedge-shrub-care',
    name: 'Hedge & shrub care',
    short: 'Hedges',
    icon: TreeDeciduous,
    image: pexels(38936349),
    alt: 'Gardener in workwear trimming a dense green hedge with long-handled shears',
    summary: 'Shaping, thinning and rejuvenation pruning for hedges, screens and foundation shrubs, timed to each plant.',
    intro:
      'Shearing everything into boxes stresses many shrubs and costs them their flowers. We prune by plant: formal shapes for hedges that want it, selective thinning for natives and flowering shrubs, and gradual rejuvenation for anything overgrown.',
    includes: [
      'Formal shearing of privet, boxwood, pittosporum and similar hedges',
      'Selective thinning of natives and flowering shrubs',
      'Clearance from windows, walks, AC units and utility meters',
      'Rejuvenation pruning of overgrown shrubs over one to two seasons',
      'Removal of dead and diseased wood',
      'All cuttings hauled away',
    ],
    rhythm: 'Two to four visits a year depending on the plant.',
    goodFor: 'Privacy screens, foundation plantings, and overgrown corners.',
    faqs: [
      { q: 'Can you cut it way back in one go?', a: 'Some plants handle it and some don’t. We will tell you which is which, and stage hard pruning over two seasons when needed.' },
      { q: 'Do you remove trees?', a: 'We handle shrubs and small ornamental trees. For large tree work we refer you to a certified arborist.' },
    ],
  },
  {
    slug: 'seasonal-cleanups',
    name: 'Seasonal cleanups',
    short: 'Cleanups',
    icon: Wind,
    image: pexels(9620215),
    alt: 'Worker in a red jacket using a backpack leaf blower to clear fallen autumn leaves',
    summary: 'Spring and fall resets, plus storm and Santa Ana wind debris cleanups that put the whole yard back in order.',
    intro:
      'A cleanup is a reset. We clear the leaf drop, wind debris and winter weeds, cut back spent perennials, refresh bed edges and leave the yard ready for regular maintenance or for guests this weekend.',
    includes: [
      'Leaf and debris removal from lawns, beds and hardscape',
      'Cutback of spent perennials and ornamental grasses',
      'Weeding and re-edging of beds',
      'Gutter and roof-valley debris clearing at single-storey eaves',
      'Fresh mulch top-up on request',
      'Full haul-away',
    ],
    rhythm: 'Spring (March to April), fall (October to December), and after major wind events.',
    goodFor: 'Move-ins, move-outs, rentals between tenants, and yards that got away from you.',
    faqs: [
      { q: 'Is this a one-time visit?', a: 'It can be. Many clients book spring and fall cleanups on their own; others add them to a maintenance plan at a lower rate.' },
      { q: 'Do you dispose of green waste?', a: 'Yes. Green waste goes to a composting facility wherever possible. Disposal is included in the quoted price.' },
    ],
  },
];

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
