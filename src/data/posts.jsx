import { Link } from 'react-router-dom';
import { pexels } from '@/lib/img';

/** Field notes. Slugs must match the routes list in src/config/site.js. */
export const posts = [
  {
    slug: 'defensible-space-ramona-100-foot-rule',
    title: 'Defensible space in Ramona: what the 100-foot rule asks of your yard',
    dek: 'A plain-language walk through the zones around your house, what to cut, what to keep, and when to do it.',
    category: 'Fire safety',
    date: '2026-04-14',
    readMins: 7,
    image: pexels(18027616),
    alt: 'Rolling golden hills dotted with oak trees in late evening light',
    body: (
      <>
        <p>
          Every spring the hills around Ramona go from green to gold in a few weeks. That cured grass is beautiful, and it is also the fuel that carries fire toward houses. Defensible space is the buffer you keep between the two. It gives your home a better chance of surviving on its own and gives firefighters room to work.
        </p>
        <p>
          California law requires defensible space around structures in fire hazard areas, and CAL FIRE publishes the guidance most local inspectors work from. Here is what that guidance means for an ordinary backcountry lot.
        </p>

        <h2>The zones, from the house out</h2>
        <h3>Zone 0: the first 5 feet (ember-resistant)</h3>
        <p>
          Most homes lost to wildfire are ignited by embers, not by a wall of flame. The strip right against the house is where embers land and pile up. State rules for this zone are still being finalized, but the direction is clear: keep it free of anything that burns easily.
        </p>
        <ul>
          <li>Swap bark mulch against the foundation for gravel, pavers or bare soil.</li>
          <li>Clear dead leaves and needles from roofs, gutters, decks and the base of walls.</li>
          <li>Move firewood, lumber and propane tanks away from the house.</li>
          <li>Keep plants here sparse, low, well-watered and away from windows and vents.</li>
        </ul>

        <h3>Zone 1: 5 to 30 feet (lean, clean and green)</h3>
        <ul>
          <li>Remove all dead plants, grass and weeds.</li>
          <li>Keep tree branches at least 10 feet from chimneys and other trees.</li>
          <li>Space shrubs so fire can’t jump from one to the next.</li>
          <li>Keep irrigated lawn and plantings watered. A green, mowed lawn is one of the better things to have here.</li>
        </ul>

        <h3>Zone 2: 30 to 100 feet (reduce the fuel)</h3>
        <ul>
          <li>Cut annual grasses to a maximum height of 4 inches.</li>
          <li>Create horizontal space between shrubs and trees, and more of it on slopes.</li>
          <li>Limb trees up so fire on the ground can’t climb into the canopy.</li>
          <li>Remove fallen branches and thick layers of leaf litter.</li>
        </ul>
        <p>
          The 100 feet is measured from the structure, and only applies within your property line. If your neighbor’s land sits inside your 100 feet, talk with them and with your local fire authority.
        </p>

        <h2>Timing matters as much as the work</h2>
        <p>
          Cut too early and the grass grows back before summer. Cut too late and you are running equipment over cured, explosive fuel. For most of Ramona, the sweet spot is late April through early June, as the grass browns but before the heat sets in. A second pass before the fall Santa Ana season catches regrowth and the leaf drop.
        </p>
        <p>
          <strong>How you cut matters too.</strong> CAL FIRE’s advice is to mow before 10 a.m., and never when it is hot, windy or very dry. Metal blades striking a rock can throw a spark. Our crews use string trimmers near rocks, carry water and an extinguisher on every clearance job, and stand down on red-flag days.
        </p>

        <h2>A quick self-check</h2>
        <ol>
          <li>Walk the outside of the house. Is anything that burns touching the walls?</li>
          <li>Look up. Are branches over the roof, or is the gutter full?</li>
          <li>Pace out 30 feet. Is everything in that ring alive, watered and spaced out?</li>
          <li>Pace to 100 feet, or your property line. Is the grass taller than your ankle?</li>
        </ol>
        <p>
          If you answered “yes” to the last three, or got a notice from an inspector, it is time to book a clearance. We work from current guidance, take before-and-after photos for your records, and haul the material away.{' '}
          <Link to="/services/brush-clearance">See how our brush clearance works</Link>, or{' '}
          <Link to="/quote">request a quote</Link>.
        </p>
        <p className="text-sm text-chaparral/70">
          This article is general guidance, not legal advice. Requirements change, and your local fire authority’s interpretation is the one that counts. Check readyforwildfire.org and San Diego County Fire for current rules.
        </p>
      </>
    ),
  },
  {
    slug: 'watering-schedule-inland-san-diego-lawns',
    title: 'Watering a lawn in inland San Diego County: a season-by-season schedule',
    dek: 'Why deep and infrequent beats a little every day, how to stop runoff on clay, and how to set your controller by season.',
    category: 'Water',
    date: '2026-06-02',
    readMins: 6,
    image: pexels(25283561),
    alt: 'Pop-up sprinkler spraying a fan of water across green grass',
    body: (
      <>
        <p>
          Most of the struggling lawns we see in Ramona aren’t short of water. They get it the wrong way: short, daily bursts that wet the top inch of soil, run off the clay, and train roots to stay shallow. Change the pattern and you can often use less water and get a better lawn.
        </p>

        <h2>The rule: deep, infrequent, early</h2>
        <ul>
          <li><strong>Deep:</strong> wet the root zone, about 6 inches for fescue. Roots follow the water down, and deep roots ride out heat waves.</li>
          <li><strong>Infrequent:</strong> let the top of the soil dry between waterings. It discourages fungus and shallow roots.</li>
          <li><strong>Early:</strong> water before sunrise, when evaporation and wind are lowest and the grass dries off as the day warms.</li>
        </ul>

        <h2>Cycle and soak: the fix for clay and slopes</h2>
        <p>
          Our soils, especially the heavier clays, take water slowly. Run a spray zone for 15 minutes straight and much of it ends up in the gutter. Instead, split the run into two or three shorter cycles with about an hour between them. Each cycle soaks in before the next arrives. Most modern controllers have a cycle-and-soak setting; if yours doesn’t, add extra start times.
        </p>
        <p>
          A simple test: run one cycle, wait 30 minutes, then push a long screwdriver into the lawn. Where it slides in easily, the soil is wet. If it stops at 2 inches, you need more cycles, not longer ones.
        </p>

        <h2>A starting schedule by season</h2>
        <p>These are starting points for an established tall fescue lawn on spray heads. Adjust for your soil, shade and slope, and always follow your water district’s current watering rules.</p>
        <table>
          <thead>
            <tr><th scope="col">Season</th><th scope="col">Days per week</th><th scope="col">Per day (spray heads)</th></tr>
          </thead>
          <tbody>
            <tr><td>Winter (Dec to Feb)</td><td>0 to 1, skip after rain</td><td>2 cycles × 4 min</td></tr>
            <tr><td>Spring (Mar to May)</td><td>2</td><td>2 cycles × 5 min</td></tr>
            <tr><td>Summer (Jun to Sep)</td><td>3</td><td>3 cycles × 5 min</td></tr>
            <tr><td>Fall (Oct to Nov)</td><td>2</td><td>2 cycles × 5 min</td></tr>
          </tbody>
        </table>
        <p>
          Rotor heads put down water more slowly than sprays, so they need roughly two to three times the run time. Warm-season grasses like Bermuda go dormant in winter and need very little water until spring green-up.
        </p>

        <h2>Signs you are under- or over-watering</h2>
        <ul>
          <li><strong>Too little:</strong> footprints that stay pressed in, a blue-grey tint, and dry spots that show up first on slopes and near pavement.</li>
          <li><strong>Too much:</strong> mushrooms, soggy low spots, algae on the soil, and a lawn that feels spongy underfoot.</li>
          <li><strong>The system, not the schedule:</strong> one brown patch in an otherwise green lawn usually means a clogged, tilted or broken head.</li>
        </ul>

        <h2>Get the hardware right first</h2>
        <p>
          No schedule fixes a broken system. Before you change run times, run each zone and watch it: look for geysers, misting from too much pressure, heads blocked by grass, and spray landing on the driveway. An{' '}
          <Link to="/services/irrigation">irrigation tune-up</Link> fixes those problems and leaves you with a schedule set for your yard. If you would rather need less water altogether, read about{' '}
          <Link to="/services/water-wise-conversions">water-wise conversions</Link>.
        </p>
      </>
    ),
  },
];

export const postBySlug = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
