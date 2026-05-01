import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Vlad Fix & Install",
  description:
    "How Vlad Fix & Install collects, uses and protects information you submit through our website and contact forms.",
};

const EFFECTIVE_DATE = "May 1, 2026";

const COMPANY = {
  name: "Vlad Fix & Install",
  email: "khanasykv@gmail.com",
  phone: "(760) 626-4981",
  area: "San Diego, CA",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-700 font-bold text-white">
              V
            </span>
            <span className="text-xl font-bold tracking-tight">{COMPANY.name}</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-blue-700"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-600">
            Effective {EFFECTIVE_DATE}. This policy explains how {COMPANY.name}
            {" "}collects, uses and protects the information you submit through
            our website or contact forms.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Section id="introduction" title="1. Introduction">
          <p>
            {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            operates a single-page website that helps homeowners in the {COMPANY.area}{" "}
            area request handyman services. We respect your privacy and only collect
            information that helps us respond to inquiries and deliver the work you
            asked for.
          </p>
          <p>
            By using this site or submitting a contact form, you agree to the
            practices described below.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information We Collect">
          <h3 className="text-lg font-semibold text-slate-900">
            Information you provide
          </h3>
          <p>When you submit a contact form on this site, we collect:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>First and last name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>The service category you selected</li>
            <li>Any details you write in the message field</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Information collected automatically
          </h3>
          <p>
            Our hosting provider receives standard server-log data (IP address,
            browser type, referrer, page viewed, timestamp) for security,
            performance and abuse-prevention purposes. We do not run our own
            advertising or behavioural-tracking scripts.
          </p>
        </Section>

        <Section id="how-we-use" title="3. How We Use Your Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>To respond to your inquiry and provide a free estimate.</li>
            <li>To schedule, perform and follow up on requested services.</li>
            <li>
              To send service-related communications (appointment confirmations,
              quotes, invoices, warranty notices).
            </li>
            <li>
              To keep records of completed work for warranty and accounting
              purposes.
            </li>
            <li>To comply with applicable law and respond to legal requests.</li>
          </ul>
          <p>
            We do not use your information for unrelated marketing without your
            consent.
          </p>
        </Section>

        <Section id="sharing" title="4. How We Share Your Information">
          <p>
            <strong>We do not sell, rent or trade your personal information.</strong>
            {" "}We share information only with the limited set of service
            providers we use to operate the site:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Formsubmit.co</strong> — receives the contents of contact-
              form submissions for the sole purpose of delivering them to our
              business inbox.
            </li>
            <li>
              <strong>Hosting and CDN provider</strong> — handles standard request
              data needed to serve the website.
            </li>
            <li>
              <strong>Google Sheets</strong> (read-only) — we display verified
              customer reviews that we have published in a public Google Sheet.
              No visitor data is sent to Google through this integration; the
              site only fetches publicly readable review content.
            </li>
          </ul>
          <p>
            We may disclose information if required by law, court order, or to
            protect our legal rights, the rights of others, or the safety of any
            person.
          </p>
        </Section>

        <Section id="cookies" title="5. Cookies and Tracking Technologies">
          <p>
            This site uses only the minimal storage necessary for basic
            functionality. We do not use third-party advertising cookies,
            cross-site tracking pixels, or session-replay tools. If we add
            analytics in the future, this policy will be updated and you will see
            a clear notice on the site.
          </p>
        </Section>

        <Section id="third-party" title="6. Third-Party Services">
          <p>
            The site embeds publicly available content from Thumbtack and Google
            (linked review profiles). Visiting those external sites is governed
            by their respective privacy policies. Clicking a third-party link
            opens that site in a new tab; your interaction with it is between you
            and that company.
          </p>
        </Section>

        <Section id="security" title="7. Data Security">
          <p>
            We protect submitted information using industry-standard measures
            including HTTPS for all traffic, limited internal access to your
            inquiries, and prompt deletion of records that are no longer needed
            for the purposes above.
          </p>
          <p>
            No method of transmission over the internet is 100% secure, so we
            cannot guarantee absolute security. If you have reason to believe
            your interaction with us is no longer secure, please contact us
            immediately.
          </p>
        </Section>

        <Section id="retention" title="8. How Long We Keep Information">
          <p>
            We keep contact-form submissions for as long as it takes to respond
            and complete the requested service, plus a reasonable period for
            warranty, recordkeeping and tax purposes (typically up to 4 years).
            After that we delete or anonymize the data.
          </p>
        </Section>

        <Section id="your-rights" title="9. Your Rights">
          <p>
            <strong>California residents (CCPA / CPRA).</strong> California law
            gives you the right to:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Know what personal information we have collected about you.</li>
            <li>Request a copy of that information in a portable format.</li>
            <li>Request deletion of your personal information.</li>
            <li>
              Opt out of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of your
              personal information — note that we do not sell or share it.
            </li>
            <li>
              Be free from discrimination for exercising any of these rights.
            </li>
          </ul>
          <p>
            To exercise these rights, email{" "}
            <a
              className="font-medium text-blue-700 underline hover:text-blue-800"
              href={`mailto:${COMPANY.email}`}
            >
              {COMPANY.email}
            </a>
            {" "}with the subject line &ldquo;Privacy Request&rdquo;. We will
            verify your identity and respond within 45 days.
          </p>
        </Section>

        <Section id="children" title="10. Children's Privacy">
          <p>
            This site is intended for adults requesting home services. We do not
            knowingly collect personal information from anyone under 18. If you
            believe a minor has submitted information, please contact us and we
            will delete it.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the &ldquo;Effective&rdquo; date at the top of the page.
            Material changes will be highlighted on the site for a reasonable
            period before they take effect.
          </p>
        </Section>

        <Section id="contact" title="12. Contact Us">
          <p>If you have questions about this policy or your information:</p>
          <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">{COMPANY.name}</p>
            <p className="mt-1 text-slate-700">{COMPANY.area}</p>
            <p className="mt-3 text-slate-700">
              Email:{" "}
              <a
                className="font-medium text-blue-700 underline hover:text-blue-800"
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
            </p>
            <p className="text-slate-700">
              Phone:{" "}
              <a
                className="font-medium text-blue-700 underline hover:text-blue-800"
                href="tel:+17606264981"
              >
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </Section>

        <p className="mt-12 text-sm text-slate-500">
          Effective {EFFECTIVE_DATE}.
        </p>
      </article>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded bg-blue-700 text-xs font-bold text-white">
              V
            </span>
            <span>
              © {new Date().getFullYear()} {COMPANY.name} · Licensed &amp;
              insured
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="font-semibold text-white">
              Privacy
            </Link>
            <a href="/#contact" className="hover:text-white">
              Contact
            </a>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
