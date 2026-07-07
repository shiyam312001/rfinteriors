import Link from "next/link";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-charcoal text-white hover:bg-walnut shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-border bg-surface text-charcoal hover:border-accent/40 hover:bg-accent-soft hover:text-accent shadow-sm",
  ghost: "text-muted hover:bg-accent-soft hover:text-charcoal",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
