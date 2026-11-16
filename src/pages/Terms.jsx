import { site } from '@/config/site';
import Legal from './Legal';

const sections = [
  {
    id: 'website',
    title: 'Using this website',
    body: <p>The content on this site is general information about our services and about lawn care in inland San Diego County. It is not professional, legal or fire-safety advice for your specific property. Requirements such as defensible-space rules are set by government agencies and can change.</p>,
  },
  {
    id: 'quotes',
    title: 'Quotes and prices',
    body: (
      <>
        <p>Prices shown on this website are starting points for illustration only. A quote is binding only once we have seen the property and sent it to you in writing.</p>
        <p>Written quotes are valid for 30 days unless stated otherwise. If the scope of work changes once we start, we agree any price change with you before doing the extra work.</p>
      </>
    ),
  },
  {
    id: 'plans',
    title: 'Maintenance plans',
    body: (
      <ul>
        <li>Plans are month to month. You can pause or cancel with notice before your next scheduled visit.</li>
        <li>Visits missed because of weather, holidays or unsafe conditions (including red-flag fire days) are rescheduled, not skipped.</li>
        <li>We may decline to work on any day when conditions make the work unsafe.</li>
      </ul>
    ),
  },
  {
    id: 'access',
    title: 'Property access and safety',
    body: (
      <ul>
        <li>Please give us safe access on visit days and secure pets.</li>
        <li>Tell us about hidden hazards such as shallow lines, buried cables, sprinkler heads or soft ground. We aren’t responsible for damage to unmarked items we couldn’t reasonably have known about.</li>
        <li>If we damage something through our own error, we will repair or replace it.</li>
      </ul>
    ),
  },
  {
    id: 'guarantee',
    title: 'Re-service promise',
    body: <p>If something in the agreed scope was missed, tell us within 48 hours of the visit and we will return to fix it at no charge. (Placeholder: the owner is to confirm these terms.)</p>,
  },
  {
    id: 'payment',
    title: 'Payment',
    body: <p>Maintenance plans are billed monthly. Projects and one-off jobs are invoiced on completion unless your written quote says otherwise. Payment terms are stated on each invoice.</p>,
  },
  {
    id: 'liability',
    title: 'Limits of liability',
    body: <p>To the extent permitted by law, our liability for any claim related to our services is limited to the amount you paid for the service in question. Nothing in these terms limits rights you have under California law that cannot be waived.</p>,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about these terms: <a href={site.emailHref}>{site.email}</a> or <a href={site.phoneHref}>{site.phoneDisplay}</a>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <Legal
      title="Terms of Service"
      description="The terms that apply to DC Nova LLC’s website, quotes, maintenance plans and lawn care services in Ramona and inland San Diego County."
      updated="2026-11-16"
      intro={`These terms cover your use of this website and the services ${site.legalName} provides. Your written quote or service agreement takes priority where it says something different.`}
      sections={sections}
    />
  );
}
