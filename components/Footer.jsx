import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { navLinks, siteInfo } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
           <img
                src="/logo.png"
                alt={`${siteInfo.name} logo`}
                className="h-auto w-[180px]  bg-transparent"
              />
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            {siteInfo.description}
          </p>
          <a
            href={siteInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-white"
            aria-label="Visit RF Interior Spot on Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
            @rf.interior.spot
          </a>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{siteInfo.address}</span>
            </li>
            <li>
              <a
                href={`tel:+91${siteInfo.phone}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                +91 {siteInfo.phone}
              </a>
            </li>
            <li>{siteInfo.workingHours.weekdays}</li>
            <li>{siteInfo.workingHours.sunday}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-light bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-light sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <p>Premium PVC & UPVC interiors across Chennai.</p>
        </div>
      </div>
    </footer>
  );
}
