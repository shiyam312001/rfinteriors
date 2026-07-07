export default function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  background = "default",
}) {
  const backgrounds = {
    default: "bg-background",
    surface: "bg-surface",
    muted: "bg-border-light/50",
    accent: "bg-accent-soft/40",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
