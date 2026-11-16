import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Lock, Phone } from 'lucide-react';
import Seo from '@/components/Seo';
import { Spark } from '@/components/ui';
import { site } from '@/config/site';
import { services, serviceBySlug } from '@/data/services';
import { plans } from '@/data/content';
import { submitForm } from '@/lib/submitForm';
import { formatPhone, isEmail, isPhone, required, todayISO } from '@/lib/validate';

const STEPS = [
  { id: 'property', label: 'Property' },
  { id: 'services', label: 'Services' },
  { id: 'yard', label: 'Yard details' },
  { id: 'timing', label: 'Timing' },
  { id: 'contact', label: 'Your details' },
];

const OPTIONS = {
  propertyType: ['Single-family home', 'Acreage (1+ acre)', 'HOA or multi-unit', 'Commercial property'],
  lawnSize: ['Under 2,000 sq ft', '2,000 – 5,000 sq ft', '5,000 – 10,000 sq ft', 'Over 10,000 sq ft', 'Not sure'],
  terrain: ['Mostly flat', 'Gentle slope', 'Steep slope', 'A mix'],
  frequency: ['Weekly', 'Every 2 weeks', 'Monthly', 'One-time job'],
  grass: ['Tall fescue', 'Bermuda', 'St. Augustine', 'Kikuyu', 'Not sure'],
  watering: ['Automatic sprinklers', 'Drip irrigation', 'Hand watering', 'No irrigation'],
  irrigationIssues: ['Broken or leaking heads', 'Dry spots', 'Soggy areas', 'High water bill', 'Controller setup'],
  clearance: ['Within 30 ft of the house', '30 – 100 ft', 'Full 100 ft or more', 'I received an inspection notice'],
  convert: ['Part of the front lawn', 'The whole front lawn', 'Backyard lawn', 'Slope or parkway strip'],
  timeWindow: ['Morning (7–10 am)', 'Midday (10 am–1 pm)', 'Afternoon (1–5 pm)', 'Flexible'],
  contactPref: ['Phone call', 'Text message', 'Email'],
};

const initial = {
  propertyType: '', lawnSize: '', terrain: '', area: '', address: '', gated: false, dogs: false,
  services: [], frequency: '', plan: '',
  grass: '', watering: '', irrigationIssues: [], clearance: '', convert: '', goals: '',
  date: '', timeWindow: '', contactPref: '',
  name: '', email: '', phone: '', notes: '', consent: false,
};

function validate(step, d) {
  const e = {};
  if (step === 0) {
    if (!d.propertyType) e.propertyType = 'Choose the type of property.';
    if (!d.lawnSize) e.lawnSize = 'Pick a size, or “Not sure”.';
    if (!d.terrain) e.terrain = 'Tell us about the terrain.';
    if (!d.area) e.area = 'Choose the closest town.';
    if (!required(d.address) || d.address.trim().length < 6) e.address = 'Enter the street address for the property.';
  }
  if (step === 1) {
    if (!d.services.length) e.services = 'Pick at least one service.';
    if (!d.frequency) e.frequency = 'Choose how often you need us.';
  }
  if (step === 2) {
    if (!d.watering) e.watering = 'Tell us how the lawn is watered.';
    if (d.services.includes('brush-clearance') && !d.clearance) e.clearance = 'Tell us how far out the clearance should go.';
    if (d.services.includes('water-wise-conversions') && !d.convert) e.convert = 'Tell us which area you’d like to convert.';
  }
  if (step === 3) {
    if (!d.date) e.date = 'Pick a preferred date for the walk-through.';
    else if (d.date < todayISO()) e.date = 'Choose today or a later date.';
    if (!d.timeWindow) e.timeWindow = 'Choose a time window.';
    if (!d.contactPref) e.contactPref = 'How should we reach you?';
  }
  if (step === 4) {
    if (!required(d.name) || d.name.trim().length < 2) e.name = 'Enter your name.';
    if (!isEmail(d.email)) e.email = 'Enter a valid email address.';
    if (!isPhone(d.phone)) e.phone = 'Enter a 10-digit US phone number.';
    if (!d.consent) e.consent = 'Please agree so we can contact you about this quote.';
  }
  return e;
}

/* ---------- Field primitives ---------- */

function ErrorText({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} className="field-error">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {msg}
    </p>
  );
}

/** Radio group rendered as selectable tiles. */
function Tiles({ name, legend, options, value, onChange, error, cols = 'sm:grid-cols-2' }) {
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined} aria-invalid={!!error} data-field={name}>
      <legend className="field-label">{legend}</legend>
      <div className={`grid gap-2.5 ${cols}`}>
        {options.map((o) => {
          const on = value === o;
          return (
            <label
              key={o}
              className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-poppy/40 ${
                on ? 'border-chaparral bg-chaparral text-adobe' : error ? 'border-alert/60 hover:border-chaparral' : 'border-line hover:border-chaparral'
              }`}
            >
              <input type="radio" name={name} value={o} checked={on} onChange={() => onChange(o)} className="sr-only" />
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-poppy bg-poppy' : 'border-current opacity-60'}`} aria-hidden="true">
                {on && <span className="h-2 w-2 rounded-full bg-chaparral" />}
              </span>
              <span className="font-medium">{o}</span>
            </label>
          );
        })}
      </div>
      <ErrorText id={`${name}-err`} msg={error} />
    </fieldset>
  );
}

function Checks({ name, legend, options, values, onToggle, error, hint }) {
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined} data-field={name}>
      <legend className="field-label">{legend}</legend>
      {hint && <p className="-mt-1 mb-3 text-sm text-chaparral/70">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          const on = values.includes(v);
          return (
            <label
              key={v}
              className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-poppy/40 ${
                on ? 'border-chaparral bg-poppy' : error ? 'border-alert/60' : 'border-line hover:border-chaparral'
              }`}
            >
              <input type="checkbox" checked={on} onChange={() => onToggle(v)} className="sr-only" />
              <span className={`grid h-4 w-4 place-items-center rounded border-2 border-chaparral ${on ? 'bg-chaparral text-poppy' : ''}`} aria-hidden="true">
                {on && <Check className="h-3 w-3" strokeWidth={4} />}
              </span>
              {label}
            </label>
          );
        })}
      </div>
      <ErrorText id={`${name}-err`} msg={error} />
    </fieldset>
  );
}

function Text({ name, label, error, hint, as = 'input', ...props }) {
  const Tag = as;
  const desc = [hint && `${name}-hint`, error && `${name}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div data-field={name}>
      <label htmlFor={`q-${name}`} className="field-label">{label}</label>
      {hint && <p id={`${name}-hint`} className="-mt-1 mb-2 text-sm text-chaparral/70">{hint}</p>}
      <Tag id={`q-${name}`} name={name} aria-invalid={!!error} aria-describedby={desc} className="field" {...props} />
      <ErrorText id={`${name}-err`} msg={error} />
    </div>
  );
}

/* ---------- Summary ---------- */

function summaryRows(d) {
  const svc = d.services.map((s) => serviceBySlug(s)?.short).filter(Boolean).join(', ');
  const area = site.serviceArea.find((a) => a.slug === d.area)?.name || (d.area === 'other' ? 'Other area' : '');
  const plan = plans.find((p) => p.id === d.plan)?.name;
  return [
    { k: 'Property', v: [d.propertyType, d.lawnSize].filter(Boolean).join(' · ') },
    { k: 'Terrain', v: d.terrain },
    { k: 'Location', v: [d.address, area].filter(Boolean).join(', ') },
    { k: 'Services', v: svc },
    { k: 'Frequency', v: [d.frequency, plan && `${plan} plan`].filter(Boolean).join(' · ') },
    { k: 'Grass & water', v: [d.grass, d.watering].filter(Boolean).join(' · ') },
    { k: 'Walk-through', v: [d.date && new Date(`${d.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), d.timeWindow].filter(Boolean).join(' · ') },
    { k: 'Contact', v: [d.name, d.contactPref].filter(Boolean).join(' · ') },
  ];
}

function Summary({ data, step }) {
  const rows = summaryRows(data);
  const filled = rows.filter((r) => r.v).length;
  return (
    <aside aria-label="Your quote summary" className="rounded-blob bg-chaparral p-6 text-adobe sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Your request</h2>
        <span className="rounded-full bg-adobe/10 px-2.5 py-1 text-xs tabular-nums">{filled}/{rows.length}</span>
      </div>
      <dl className="mt-5 divide-y divide-adobe/10">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 text-sm">
            <dt className="text-adobe/70">{r.k}</dt>
            <dd className={r.v ? 'font-medium' : 'text-adobe/40'}>{r.v || '—'}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-2xl bg-adobe/10 p-4 text-sm text-adobe/80">
        <p className="flex items-center gap-2 font-semibold text-poppy">
          <Spark className="h-3 w-3 text-poppy" /> What happens next
        </p>
        <p className="mt-1.5">
          {step < 4 ? 'No commitment at any step. ' : ''}We confirm the walk-through, measure on site and send a written quote within one business day.
        </p>
      </div>
    </aside>
  );
}

/* ---------- Page ---------- */

export default function Quote() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => {
    const d = { ...initial };
    const svc = params.get('service');
    if (svc && serviceBySlug(svc)) d.services = [svc];
    const plan = params.get('plan');
    if (plan && plans.some((p) => p.id === plan)) {
      d.plan = plan;
      d.services = Array.from(new Set([...d.services, 'lawn-mowing']));
      d.frequency = plan === 'essential' ? 'Every 2 weeks' : 'Weekly';
    }
    const area = params.get('area');
    if (area && site.serviceArea.some((a) => a.slug === area)) d.area = area;
    return d;
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | slow | done | error
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const firstRender = useRef(true);

  const set = (k) => (v) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggle = (k) => (v) => {
    setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    const top = formRef.current?.getBoundingClientRect().top + window.scrollY - 110;
    if (window.scrollY > top) window.scrollTo({ top });
  }, [step]);

  const focusFirstError = (errs) => {
    const key = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector(`[data-field="${key}"]`);
      el?.querySelector('input, textarea, select')?.focus();
    });
  };

  const next = () => {
    const errs = validate(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    const errs = validate(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);

    // Map to the backend's BookingCreate schema; extra answers go in notes.
    const svcNames = data.services.map((s) => serviceBySlug(s)?.name).join(', ');
    const areaName = site.serviceArea.find((a) => a.slug === data.area)?.name || 'Other area';
    const notes = [
      `Property: ${data.propertyType}; terrain: ${data.terrain}; area: ${areaName}`,
      data.gated || data.dogs ? `Access: ${[data.gated && 'gated', data.dogs && 'dogs on property'].filter(Boolean).join(', ')}` : '',
      data.plan ? `Plan of interest: ${data.plan}` : '',
      data.grass ? `Grass: ${data.grass}` : '',
      `Watering: ${data.watering}`,
      data.irrigationIssues.length ? `Irrigation issues: ${data.irrigationIssues.join(', ')}` : '',
      data.clearance ? `Clearance: ${data.clearance}` : '',
      data.convert ? `Convert: ${data.convert}` : '',
      data.goals ? `Goals: ${data.goals.trim()}` : '',
      `Preferred contact: ${data.contactPref}`,
      data.notes ? `Notes: ${data.notes.trim()}` : '',
    ].filter(Boolean).join('\n');

    setStatus('sending');
    setServerError('');
    const slow = setTimeout(() => setStatus((s) => (s === 'sending' ? 'slow' : s)), site.formSettings.slowNoticeMs);
    try {
      const res = await submitForm('quote', {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        service: svcNames,
        frequency: data.frequency,
        lawn_size: data.lawnSize,
        preferred_date: data.date || null,
        preferred_time: data.timeWindow,
        notes,
      });
      setResult(res);
      setStatus('done');
      window.scrollTo(0, 0);
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    } finally {
      clearTimeout(slow);
    }
  };

  const pct = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);
  const sending = status === 'sending' || status === 'slow';
  const has = (s) => data.services.includes(s);

  if (status === 'done') {
    return (
      <>
        <Seo title="Quote Request Received" description="Your DC Nova quote request has been received." noindex />
        <section className="frame py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-poppy">
              <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
            </span>
            <h1 tabIndex={-1} ref={(el) => el?.focus()} className="mt-8 text-5xl font-extrabold outline-none sm:text-6xl">
              Request received, {data.name.split(' ')[0]}.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-chaparral/80">
              We’ll {data.contactPref === 'Email' ? 'email' : data.contactPref === 'Text message' ? 'text' : 'call'} you within one business day to confirm the walk-through.
            </p>
            {result?.reference && (
              <p className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border-2 border-chaparral px-5 py-2">
                <span className="text-sm text-chaparral/70">Reference</span>
                <span className="font-display text-lg font-bold tracking-wide">{result.reference}</span>
              </p>
            )}
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
            <Summary data={data} step={5} />
            <div className="rounded-blob border-2 border-chaparral p-7">
              <h2 className="text-2xl font-bold">While you wait</h2>
              <ol className="mt-5 space-y-4">
                {['Flag any sprinkler heads, valve boxes or soft ground you know about.', 'Unlock the gate or text us the code before the visit.', 'Jot down anything that bugs you about the yard. We want to hear it.'].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-chaparral text-sm font-bold text-adobe">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/" className="btn-ink">Back to home</Link>
                <Link to="/blog" className="btn-line">Read field notes</Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Get a Free Quote"
        description="Request a free, written lawn care quote from DC Nova in Ramona, CA. Five quick steps covering property, services, yard details and timing."
      />

      <section className="border-b-2 border-chaparral bg-adobe-2">
        <div className="frame grid gap-6 py-10 lg:grid-cols-12 lg:items-end lg:py-14">
          <div className="lg:col-span-8">
            <p className="eyebrow text-manzanita"><Spark className="h-3 w-3 text-poppy" /> Free quote · about 3 minutes</p>
            <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98]">Tell us about the yard.</h1>
          </div>
          <p className="flex items-center gap-2 text-sm text-chaparral/75 lg:col-span-4 lg:justify-end">
            <Lock className="h-4 w-4" aria-hidden="true" /> Your details are only used for this quote.
          </p>
        </div>
      </section>

      <section className="frame py-10 lg:py-14">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Step {step + 1} of {STEPS.length}: {STEPS[step].label}</span>
            <span className="tabular-nums text-chaparral/70">{pct}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-adobe-3" role="progressbar" aria-label="Quote progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <div className="h-full rounded-full bg-poppy transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid">
            {STEPS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={i >= step || sending}
                  onClick={() => { setErrors({}); setStep(i); }}
                  aria-current={i === step ? 'step' : undefined}
                  className={`flex w-full items-center gap-2 text-left text-sm ${i === step ? 'font-semibold' : i < step ? 'text-chaparral hover:underline' : 'text-chaparral/50'}`}
                >
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i < step ? 'bg-chaparral text-poppy' : i === step ? 'bg-poppy' : 'border-2 border-chaparral/25'}`}>
                    {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  {s.label}
                  {i < step && <span className="sr-only">(completed, edit)</span>}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-labelledby="step-h">
            <h2 id="step-h" ref={headingRef} tabIndex={-1} className="text-3xl font-extrabold outline-none sm:text-4xl">
              {['Where’s the property?', 'What do you need?', 'A few yard details', 'When suits you?', 'How do we reach you?'][step]}
            </h2>

            {Object.keys(errors).filter((k) => errors[k]).length > 0 && (
              <div role="alert" className="mt-6 flex gap-3 rounded-2xl border-2 border-alert bg-poppy-soft/50 p-4 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-alert" aria-hidden="true" />
                <p>Please fix {Object.keys(errors).filter((k) => errors[k]).length === 1 ? 'the highlighted field' : 'the highlighted fields'} to continue.</p>
              </div>
            )}

            <div key={step} className="mt-8 animate-rise space-y-8">
              {step === 0 && (
                <>
                  <Tiles name="propertyType" legend="Type of property" options={OPTIONS.propertyType} value={data.propertyType} onChange={set('propertyType')} error={errors.propertyType} />
                  <Tiles name="lawnSize" legend="Roughly how much lawn?" options={OPTIONS.lawnSize} value={data.lawnSize} onChange={set('lawnSize')} error={errors.lawnSize} />
                  <Tiles name="terrain" legend="Terrain" options={OPTIONS.terrain} value={data.terrain} onChange={set('terrain')} error={errors.terrain} cols="grid-cols-2 sm:grid-cols-4" />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div data-field="area">
                      <label htmlFor="q-area" className="field-label">Closest town</label>
                      <select id="q-area" value={data.area} onChange={(e) => set('area')(e.target.value)} aria-invalid={!!errors.area} aria-describedby={errors.area ? 'area-err' : undefined} className="field">
                        <option value="">Select…</option>
                        {site.serviceArea.map((a) => (
                          <option key={a.slug} value={a.slug}>{a.name}</option>
                        ))}
                        <option value="other">Somewhere else</option>
                      </select>
                      <ErrorText id="area-err" msg={errors.area} />
                    </div>
                    <Text name="address" label="Street address" autoComplete="street-address" value={data.address} onChange={(e) => set('address')(e.target.value)} error={errors.address} placeholder="1234 Example Rd" />
                  </div>
                  <Checks
                    name="access"
                    legend="Anything we should know about access?"
                    options={[{ value: 'gated', label: 'Gated or locked yard' }, { value: 'dogs', label: 'Dogs on the property' }]}
                    values={[data.gated && 'gated', data.dogs && 'dogs'].filter(Boolean)}
                    onToggle={(v) => set(v)(!data[v])}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <Checks
                    name="services"
                    legend="Services (choose all that apply)"
                    hint="Not sure? Pick what’s closest. We’ll confirm on the walk-through."
                    options={services.map((s) => ({ value: s.slug, label: s.name }))}
                    values={data.services}
                    onToggle={toggle('services')}
                    error={errors.services}
                  />
                  <Tiles name="frequency" legend="How often?" options={OPTIONS.frequency} value={data.frequency} onChange={set('frequency')} error={errors.frequency} cols="grid-cols-2 sm:grid-cols-4" />
                  <div data-field="plan">
                    <p className="field-label">Interested in a plan? <span className="font-normal text-chaparral/70">(optional)</span></p>
                    <div className="flex flex-wrap gap-2">
                      {[{ id: '', name: 'No preference' }, ...plans].map((p) => (
                        <button
                          key={p.id || 'none'}
                          type="button"
                          aria-pressed={data.plan === p.id}
                          onClick={() => set('plan')(p.id)}
                          className={`min-h-[44px] rounded-full border-2 px-4 py-2 text-sm font-semibold ${data.plan === p.id ? 'border-chaparral bg-chaparral text-adobe' : 'border-line hover:border-chaparral'}`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                    <Link to="/pricing" className="mt-2 inline-block text-sm link-u">Compare plans</Link>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <Tiles name="grass" legend="Grass type (optional)" options={OPTIONS.grass} value={data.grass} onChange={set('grass')} cols="grid-cols-2 sm:grid-cols-3" />
                  <Tiles name="watering" legend="How is the lawn watered?" options={OPTIONS.watering} value={data.watering} onChange={set('watering')} error={errors.watering} />
                  {(has('irrigation') || data.watering === 'Automatic sprinklers' || data.watering === 'Drip irrigation') && (
                    <Checks name="irrigationIssues" legend="Any irrigation trouble? (optional)" options={OPTIONS.irrigationIssues} values={data.irrigationIssues} onToggle={toggle('irrigationIssues')} />
                  )}
                  {has('brush-clearance') && (
                    <Tiles name="clearance" legend="How far out should brush clearance go?" options={OPTIONS.clearance} value={data.clearance} onChange={set('clearance')} error={errors.clearance} />
                  )}
                  {has('water-wise-conversions') && (
                    <Tiles name="convert" legend="Which area would you like to convert?" options={OPTIONS.convert} value={data.convert} onChange={set('convert')} error={errors.convert} />
                  )}
                  <Text
                    as="textarea"
                    name="goals"
                    label="What would make this yard a win for you? (optional)"
                    rows={3}
                    value={data.goals}
                    onChange={(e) => set('goals')(e.target.value)}
                    placeholder="e.g. Lower water bill, greener back lawn, ready for fire inspection by June"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <Text name="date" label="Preferred walk-through date" hint="We’ll confirm by phone or email. Weekdays fill fastest." type="date" min={todayISO()} value={data.date} onChange={(e) => set('date')(e.target.value)} error={errors.date} />
                  <Tiles name="timeWindow" legend="Best time window" options={OPTIONS.timeWindow} value={data.timeWindow} onChange={set('timeWindow')} error={errors.timeWindow} />
                  <Tiles name="contactPref" legend="Preferred way to reach you" options={OPTIONS.contactPref} value={data.contactPref} onChange={set('contactPref')} error={errors.contactPref} cols="grid-cols-1 sm:grid-cols-3" />
                </>
              )}

              {step === 4 && (
                <>
                  <Text name="name" label="Full name" autoComplete="name" value={data.name} onChange={(e) => set('name')(e.target.value)} error={errors.name} />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Text name="email" label="Email" type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set('email')(e.target.value)} error={errors.email} />
                    <Text name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={(e) => set('phone')(formatPhone(e.target.value))} error={errors.phone} placeholder="(760) 555-0123" />
                  </div>
                  <Text as="textarea" name="notes" label="Anything else? (optional)" rows={3} value={data.notes} onChange={(e) => set('notes')(e.target.value)} placeholder="Gate code, HOA rules, best parking spot…" />
                  <div data-field="consent">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => set('consent')(e.target.checked)}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-err' : undefined}
                        className="mt-1 h-5 w-5 shrink-0 accent-chaparral"
                      />
                      <span className="text-sm text-chaparral/85">
                        DC Nova may contact me by phone, text or email about this quote. See the <Link to="/privacy" className="link-u">privacy policy</Link>.
                      </span>
                    </label>
                    <ErrorText id="consent-err" msg={errors.consent} />
                  </div>
                </>
              )}
            </div>

            {status === 'error' && (
              <div role="alert" className="mt-8 rounded-2xl border-2 border-alert bg-poppy-soft/50 p-4 text-sm">
                <p className="font-semibold">{serverError}</p>
                <a href={site.phoneHref} className="mt-1 inline-flex items-center gap-1 link-u">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </div>
            )}
            {status === 'slow' && (
              <p className="mt-6 text-sm text-chaparral/80" role="status">Still sending. The first request after a quiet spell can take up to a minute. Please keep this page open.</p>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 border-t-2 border-chaparral/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button type="button" onClick={back} disabled={sending} className="btn-line">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
              ) : (
                <span className="text-sm text-chaparral/70">Prefer to talk? <a href={site.phoneHref} className="link-u font-semibold">{site.phoneDisplay}</a></span>
              )}
              {step < STEPS.length - 1 ? (
                <button type="submit" className="btn-ink">
                  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button type="submit" disabled={sending} aria-busy={sending} className="btn-poppy disabled:opacity-70">
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending request…
                    </>
                  ) : (
                    <>
                      Send my quote request <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Summary data={data} step={step} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
