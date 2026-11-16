import { site } from '@/config/site';
import Legal from './Legal';

const sections = [
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <>
        <p>We only collect what you choose to send us:</p>
        <ul>
          <li><strong>Quote requests:</strong> your name, email, phone, property address, the services you’re interested in, details about the yard, and your preferred visit time.</li>
          <li><strong>Contact messages:</strong> your name, email, optional phone number, topic and message.</li>
          <li><strong>Calls, texts and emails</strong> you send us directly, including any photos.</li>
        </ul>
        <p>We don’t ask for payment details on this website.</p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use it',
    body: (
      <ul>
        <li>To respond to your request, schedule a walk-through and prepare a quote.</li>
        <li>To provide and bill for services you have agreed to.</li>
        <li>To send service notes and updates about visits to your property.</li>
        <li>To keep basic business records as required by law.</li>
      </ul>
    ),
  },
  {
    id: 'share',
    title: 'Who we share it with',
    body: (
      <>
        <p>We do not sell or rent your personal information, and we do not share it for advertising.</p>
        <p>We share information only with service providers that help us run the business, such as email delivery and website hosting, under terms that limit how they use it. We may also share it when the law requires.</p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and browser storage',
    body: (
      <p>
        This website does not use advertising or cross-site tracking cookies. It uses your browser’s local storage to remember small choices, like dismissing the announcement bar or this site’s cookie notice. You can clear this at any time in your browser settings. Fonts and images are loaded from Google Fonts and Pexels, which may receive your IP address as part of delivering those files.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your California privacy rights',
    body: (
      <>
        <p>
          California residents may have the right to know what personal information we hold about them, to ask us to correct or delete it, and to opt out of its sale or sharing. We don’t sell or share personal information as defined by California law.
        </p>
        <p>To make a request, email <a href={site.emailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phoneDisplay}</a>. We will verify the request and respond within the time the law requires.</p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: <p>We keep quote and contact details for as long as needed to respond and, for clients, for the length of the relationship plus the period required for tax and business records. Requests that don’t become jobs are deleted periodically.</p>,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postal}. Email <a href={site.emailHref}>{site.email}</a>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <Legal
      title="Privacy Policy"
      description="How DC Nova LLC collects, uses and protects the information you share through our website, quote requests and contact form."
      updated="2026-11-16"
      intro={`This policy explains what information ${site.legalName} collects through this website and how we use it. In short: we use your details to answer you and look after your property, and nothing else.`}
      sections={sections}
    />
  );
}
