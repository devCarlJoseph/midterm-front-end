import { ArrowUpRight, Mail, MapPin, PackageCheck } from "lucide-react";
import { Link } from "react-router";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Stores", to: "/stores" },
  { label: "Book Delivery", to: "/booking" },
];

const supportLinks = [
  { label: "Help Center", to: "/help-center" },
  { label: "Contact Us", to: "/contact" },
  { label: "Track Order", to: "/track-order" },
  { label: "Frequently Asked Questions", to: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms and Conditions", to: "/terms-and-conditions" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-emerald-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex w-fit items-center gap-3">
              <img
                src="/dali-transparent.png"
                alt="DALI"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-emerald-100/70">
              Direct access to local inventory, delivered straight to your
              door.
            </p>

            <div className="mt-6 space-y-3 text-sm text-emerald-100/80">
              <a
                href="mailto:hello@dali.com"
                className="flex w-fit items-center gap-2 transition hover:text-white"
              >
                <Mail size={16} />
                hello@dali.com
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Philippines
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h2>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-emerald-100/70 transition hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Customer Support
            </h2>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-emerald-100/70 transition hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h2>

            <p className="mt-5 text-sm leading-6 text-emerald-100/70">
              Get delivery updates, special offers, and fresh local finds.
            </p>

            <Link
              to="/booking"
              className="mt-5 flex w-fit items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              <PackageCheck size={16} />
              Book Delivery
            </Link>

            <div className="mt-6 flex gap-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-xs font-bold text-emerald-100 transition hover:border-emerald-400 hover:bg-emerald-800"
              >
                f
              </a>

              <a
                href="#instagram"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-xs font-bold text-emerald-100 transition hover:border-emerald-400 hover:bg-emerald-800"
              >
                ig
              </a>

              <a
                href="#twitter"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-xs font-bold text-emerald-100 transition hover:border-emerald-400 hover:bg-emerald-800"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-emerald-900 pt-6 text-sm text-emerald-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DALI. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="transition hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="#top"
              className="flex items-center gap-1 font-medium text-emerald-200 transition hover:text-white"
            >
              Back to top
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
