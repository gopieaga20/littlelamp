import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <section className="bg-white">
      <div className="section prose max-w-2xl">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-400">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-ink-600">
          <p>
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
            explains what information we collect through this website and how we use it.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Information We Collect</h2>
          <p>
            When you submit our contact or booking forms, we collect the parent&apos;s name, phone
            number, optional email address, your child&apos;s class, and any message you provide.
            Booking tools may also collect the date/time you select for a session.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">How We Use It</h2>
          <p>
            We use this information solely to respond to your inquiry, schedule and conduct your
            free session, and share relevant information about our paid packages. We do not sell
            your data to third parties.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Analytics</h2>
          <p>
            We use aggregated, privacy-respecting analytics (e.g., Google Analytics) to understand
            how visitors use this site. Where required, we ask for your consent before enabling
            non-essential analytics or advertising cookies.
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data at any time
            by contacting us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary-700">
              {siteConfig.email}
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-ink-800">Contact</h2>
          <p>
            Questions about this policy can be directed to {siteConfig.email} or {siteConfig.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
