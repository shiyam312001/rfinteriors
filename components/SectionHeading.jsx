export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignment =
    align === "center" ? "text-center mx-auto" : "text-left max-w-3xl";

  return (
    <div className={`mb-14 md:mb-16 ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
