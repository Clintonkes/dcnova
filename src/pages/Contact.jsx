import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowUpRight, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import Seo from '@/components/Seo';
import { Breadcrumbs, Placeholder, Spark } from '@/components/ui';
import { Mark } from '@/components/Logo';
import { site } from '@/config/site';
import { useOpenNow } from '@/lib/hooks';
import { submitForm } from '@/lib/submitForm';
import { formatPhone, isEmail, isPhone } from '@/lib/validate';

const TOPICS = ['General question', 'I’m an existing client', 'Billing', 'Feedback', 'Work with us'];
const empty = { name: '', email: '', phone: '', topic: TOPICS[0], message: '', website: '' };

function MapPlaceholder() {
  const a = site.address;
  const q = encodeURIComponent(`${a.street}, ${a.city}, ${a.region} ${a.postal}`);
  return (
    <div className="relative overflow-hidden rounded-blob border-2 border-chaparral bg-adobe-2">
      <svg viewBox="0 0 400 260" className="block h-auto w-full" role="img" aria-label={`Stylized map placeholder showing ${a.street}, ${a.city}`}>
        <rect width="400" height="260" fill="#E8DDC9" />
        <g fill="none" stroke="#16211B" strokeOpacity=".12" strokeWidth="1.2">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M-10 ${40 + i * 26}c70-30 120-40 190-18s120 32 230-10`} />
          ))}
        </g>
        <path d="M0 150 C80 140 140 120 200 128 S320 160 400 140" stroke="#F1E9DB" strokeWidth="14" fill="none" />
        <path d="M0 150 C80 140 140 120 200 128 S320 160 400 140" stroke="#5D6B52" strokeWidth="1.5" strokeDasharray="8 8" fill="none" />
        <path d="M210 0 C205 60 200 100 200 128 S196 200 186 260" stroke="#F1E9DB" strokeWidth="10" fill="none" />
        <text x="18" y="140" fontSize="11" fontWeight="600" fill="#16211B" opacity=".7">Main St / SR-67</text>
        <text x="216" y="40" fontSize="11" fontWeight="600" fill="#16211B" opacity=".7">San Vicente Rd</text>
        <circle cx="203" cy="160" r="22" fill="#F25C1E" opacity=".25" />
        <path d="M203 168c-10-12-16-20-16-28a16 16 0 1 1 32 0c0 8-6 16-16 28Z" fill="#16211B" />
        <circle cx="203" cy="140" r="6" fill="#F25C1E" />
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-adobe/95 p-3 text-sm">
        <span className="font-semibold">{a.street}, {a.city}</span>
        <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold link-u">
          Open in Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <span className="absolute right-3 top-3"><Placeholder className="bg-adobe text-manzanita">Map placeholder</Placeholder></span>
    </div>
  );
}

export default function Contact() {
  const [d, setD] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const { open, today } = useOpenNow(site.hours);
  const min = site.formSettings.minMessageLength;

  const set = (k) => (e) => {
    const v = k === 'phone' ? formatPhone(e.target.value) : e.target.value;
    setD((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (d.website) return; // honeypot
    const errs = {};
    if (d.name.trim().length < 2) errs.name = 'Enter your name.';
    if (!isEmail(d.email)) errs.email = 'Enter a valid email address.';
    if (d.phone && !isPhone(d.phone)) errs.phone = 'Enter a 10-digit number, or leave it blank.';
    if (d.message.trim().length < min) errs.message = `Tell us a little more (at least ${min} characters).`;
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      await submitForm('contact', { name: d.name.trim(), email: d.email.trim(), phone: d.phone.trim() || null, subject: d.topic, message: d.message.trim() });
      setStatus('done');
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  const field = (k, label, props = {}) => (
    <div>
      <label htmlFor={`c-${k}`} className="field-label">{label}</label>
      <input id={`c-${k}`} value={d[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `c-${k}-err` : undefined} className="field" {...props} />
      {errors[k] && (
        <p id={`c-${k}-err`} className="field-error"><AlertCircle className="h-4 w-4" aria-hidden="true" /> {errors[k]}</p>
      )}
    </div>
  );

  return (
    <>
      <Seo
        title="Contact"
        description={`Call ${site.phoneDisplay} or email ${site.email}. DC Nova lawn care, ${site.address.street}, Ramona, CA ${site.address.postal}. Hours, directions and a quick message form.`}
      />

      <section className="frame pb-10 pt-10 lg:pt-14">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.95]">Say hello.</h1>
          <p className="max-w-md text-lg text-chaparral/80">
            Quick question, existing account or feedback? Use the form or reach us directly. Looking for a price? The{' '}
            <Link to="/quote" className="link-u font-semibold">quote form</Link> gets you one faster.
          </p>
        </div>
      </section>

      {/* Tap-to-reach tiles */}
      <section className="frame grid gap-4 pb-14 md:grid-cols-3" aria-label="Ways to reach us">
        <a href={site.phoneHref} className="group flex flex-col justify-between gap-10 rounded-blob bg-poppy p-7 transition hover:-translate-y-1">
          <Phone className="h-8 w-8" aria-hidden="true" />
          <span>
            <span className="block text-sm font-semibold uppercase tracking-label">Tap to call</span>
            <span className="mt-1 block font-display text-3xl font-extrabold">{site.phoneDisplay}</span>
          </span>
        </a>
        <a href={`sms:${site.phoneHref.replace('tel:', '')}`} className="group flex flex-col justify-between gap-10 rounded-blob bg-chaparral p-7 text-adobe transition hover:-translate-y-1">
          <MessageCircle className="h-8 w-8 text-poppy" aria-hidden="true" />
          <span>
            <span className="block text-sm font-semibold uppercase tracking-label text-poppy">Tap to text</span>
            <span className="mt-1 block font-display text-3xl font-extrabold">Send a photo</span>
            <span className="mt-1 block text-sm text-adobe/75">Texting a picture of the problem helps.</span>
          </span>
        </a>
        <a href={site.emailHref} className="group flex flex-col justify-between gap-10 rounded-blob border-2 border-chaparral p-7 transition hover:-translate-y-1 hover:bg-adobe-2">
          <Mail className="h-8 w-8 text-manzanita" aria-hidden="true" />
          <span>
            <span className="block text-sm font-semibold uppercase tracking-label text-manzanita">Tap to email</span>
            <span className="mt-1 block break-all font-display text-2xl font-extrabold">{site.email}</span>
          </span>
        </a>
      </section>

      <section className="border-t-2 border-chaparral bg-adobe-2 py-16 lg:py-20">
        <div className="frame grid gap-12 lg:grid-cols-12">
          {/* Short form */}
          <div className="lg:col-span-6">
            {status === 'done' ? (
              <div className="rounded-blob border-2 border-chaparral bg-adobe p-8 sm:p-10" role="status">
                <Mark className="h-14 w-14 text-chaparral" />
                <h2 tabIndex={-1} ref={(el) => el?.focus()} className="mt-6 text-4xl font-extrabold outline-none">Message sent. Thank you.</h2>
                <p className="mt-4 text-chaparral/80">{site.formSettings.replyPromise} We’ll reply to <strong>{d.email}</strong>.</p>
                <button type="button" onClick={() => { setD(empty); setStatus('idle'); }} className="btn-line mt-8">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="rounded-blob border-2 border-chaparral bg-adobe p-6 sm:p-9" aria-labelledby="form-h">
                <h2 id="form-h" className="text-3xl font-extrabold">Send a message</h2>
                <p className="mt-2 text-sm text-chaparral/75">{site.formSettings.replyPromise}</p>
                <div className="mt-8 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {field('name', 'Name', { autoComplete: 'name' })}
                    {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                    <div>
                      <label htmlFor="c-topic" className="field-label">Topic</label>
                      <select id="c-topic" value={d.topic} onChange={set('topic')} className="field">
                        {TOPICS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="field-label">Message</label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={d.message}
                      onChange={set('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={`c-message-count${errors.message ? ' c-message-err' : ''}`}
                      className="field"
                    />
                    <div className="mt-1 flex items-start justify-between gap-4">
                      {errors.message ? (
                        <p id="c-message-err" className="field-error !mt-0"><AlertCircle className="h-4 w-4" aria-hidden="true" /> {errors.message}</p>
                      ) : <span />}
                      <span id="c-message-count" className="shrink-0 text-xs tabular-nums text-chaparral/70">{d.message.trim().length} characters</span>
                    </div>
                  </div>
                  {/* Honeypot for bots; hidden from people and assistive tech */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="c-website">Website</label>
                    <input id="c-website" tabIndex={-1} autoComplete="off" value={d.website} onChange={set('website')} />
                  </div>
                </div>
                {status === 'error' && (
                  <p role="alert" className="mt-5 rounded-2xl border-2 border-alert bg-poppy-soft/50 p-3 text-sm font-medium">{serverError}</p>
                )}
                <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="btn-ink mt-7 w-full sm:w-auto disabled:opacity-70">
                  {status === 'sending' ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>) : (<>Send message <Send className="h-4 w-4" aria-hidden="true" /></>)}
                </button>
              </form>
            )}
          </div>

          {/* Details, hours, map */}
          <div className="space-y-6 lg:col-span-5 lg:col-start-8">
            <div className="rounded-blob bg-chaparral p-7 text-adobe">
              <div className="flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold"><Clock className="h-5 w-5 text-poppy" aria-hidden="true" /> Hours</h2>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${open ? 'bg-poppy text-chaparral' : 'bg-adobe/10 text-adobe'}`}>
                  <span className={`h-2 w-2 rounded-full ${open ? 'bg-chaparral' : 'bg-adobe/60'}`} aria-hidden="true" />
                  {open ? 'Open now' : 'Closed now'}
                </span>
              </div>
              <dl className="mt-5 divide-y divide-adobe/10">
                {site.hours.map((h) => (
                  <div key={h.label} className={`flex justify-between py-3 ${today?.label === h.label ? 'font-semibold text-poppy' : ''}`}>
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-adobe/70">Pacific Time. Messages after hours are answered the next business day.</p>
              {site.hoursPlaceholder && <Placeholder className="mt-3 text-poppy">Hours: placeholder</Placeholder>}
            </div>

            <MapPlaceholder />

            <address className="flex gap-3 not-italic">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-manzanita" aria-hidden="true" />
              <span>
                <strong>{site.legalName}</strong>
                <br />
                {site.address.street}, {site.address.city}, {site.address.region} {site.address.postal}
              </span>
            </address>
          </div>
        </div>
      </section>

      <section className="frame flex flex-col items-start justify-between gap-5 py-14 sm:flex-row sm:items-center">
        <p className="flex items-center gap-3 font-display text-2xl font-bold">
          <Spark className="h-4 w-4 text-poppy" /> Need a price for your yard?
        </p>
        <Link to="/quote" className="btn-poppy">
          Start the quote wizard <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
