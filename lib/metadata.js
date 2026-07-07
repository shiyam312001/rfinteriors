import { siteInfo } from "./content";
import { ogImage } from "./images.server";

export function createMetadata({
  title,
  description = siteInfo.description,
  path = "/",
}) {
  const pageTitle = title
    ? `${title} | ${siteInfo.shortName}`
    : `${siteInfo.shortName} | ${siteInfo.tagline}`;

  const url = `https://rfinteriorspot.in${path}`;

  return {
    metadataBase: new URL("https://rfinteriorspot.in"),
    title: pageTitle,
    description,
    icons: {
      icon: [{ url: "/vercel.svg", type: "image/svg+xml" }],
      apple: [{ url: "/logo.png", type: "image/png" }],
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteInfo.shortName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteInfo.shortName} project showcase`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}
