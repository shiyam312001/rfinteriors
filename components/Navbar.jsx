"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, siteInfo } from "@/lib/content";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/80 bg-surface/90 py-3 shadow-soft backdrop-blur-xl"
            : "bg-surface/70 py-4 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 font-heading text-lg font-semibold text-charcoal transition-colors hover:text-accent md:text-xl"
          >
            <img
              src="/logo.png"
              alt={`${siteInfo.shortName} logo`}
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <span>{siteInfo.shortName}</span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:bg-accent-soft hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={siteInfo.whatsappUrl} external size="sm">
              Get Quote
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-surface p-2.5 text-charcoal shadow-sm transition-all hover:border-accent/30 hover:shadow-soft lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(88vw,320px)] flex-col bg-surface px-6 py-8 shadow-soft-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="flex items-center gap-3 font-heading text-lg text-charcoal">
            <img
              src="/logo.png"
              alt={`${siteInfo.shortName} logo`}
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <span>{siteInfo.shortName}</span>
          </span>
          <button
            type="button"
            className="rounded-xl border border-border p-2 text-charcoal transition-colors hover:bg-background"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-muted transition-all hover:bg-accent-soft hover:text-charcoal"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <Button
            href={siteInfo.whatsappUrl}
            external
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Get Quote
          </Button>
        </div>
      </aside>
    </>
  );
}
