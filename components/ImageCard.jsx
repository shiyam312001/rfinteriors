import Image from "next/image";
import Card from "./Card";

export default function ImageCard({
  image,
  title,
  description,
  className = "",
  priority = false,
}) {
  if (!image) return null;

  return (
    <Card hover className={`overflow-hidden ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      {(title || description) && (
        <div className="p-6">
          {title ? (
            <h3 className="font-heading text-xl font-semibold text-charcoal">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          ) : null}
        </div>
      )}
    </Card>
  );
}
