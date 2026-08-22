import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for using the ${siteConfig.name} website.`,
};

export default function TermsPage() {
  return (
    <section className="bg-white">
      <div className="section prose max-w-2xl">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-sm text-ink-400">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-ink-600">
          <p>
            By using this website, you agree to the following terms. If you do not agree, please
            do not use this site.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Services Described</h2>
          <p>
            {siteConfig.name} provides educational counseling services, including study-habit
            coaching, board-exam preparation guidance, career counseling, and teacher
            recommendations, for students in Class 2–12.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Free Session</h2>
          <p>
            The 10-minute intro session is offered free of charge, with no obligation to purchase
            any paid package.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Payment for Paid Packages</h2>
          <p>
            Paid packages are not sold or charged through this website. Pricing shown is
            informational; payment, if you choose to proceed, is arranged offline by phone after
            your free session.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">No Guarantee of Outcomes</h2>
          <p>
            While we aim to provide genuinely useful guidance, we do not guarantee specific
            academic, exam, or career outcomes.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes
            constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Contact</h2>
          <p>
            Questions about these terms can be directed to {siteConfig.email} or {siteConfig.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
