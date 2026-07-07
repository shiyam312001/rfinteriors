export default function Card({
  children,
  className = "",
  hover = false,
  as: Component = "div",
}) {
  return (
    <Component
      className={`rounded-2xl border border-border/80 bg-surface shadow-soft ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-soft-lg"
          : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
