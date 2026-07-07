"use client";

import FadeIn from "./FadeIn";

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {eyebrow ? (
            <p className="inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-charcoal md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {description}
            </p>
          ) : null}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}
