import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig, navLinks } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-cream-300 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-ink-500">{siteConfig.description}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LittleLamp on Instagram"
              className="rounded-full bg-cream-300 p-2 text-ink-700 transition hover:bg-primary-100 hover:text-primary-700"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LittleLamp on Facebook"
              className="rounded-full bg-cream-300 p-2 text-ink-700 transition hover:bg-primary-100 hover:text-primary-700"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-800">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-500 hover:text-primary-700">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="text-sm text-ink-500 hover:text-primary-700">
                Book a Session
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-800">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-500">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-primary-700">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-700">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <span>{siteConfig.availableHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-300 py-6 text-center text-xs text-ink-400">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. ·{" "}
          <Link href="/privacy" className="hover:text-primary-700">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="hover:text-primary-700">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
