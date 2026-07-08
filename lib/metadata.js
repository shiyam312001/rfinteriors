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

  const url = `${siteInfo.siteUrl}${path}`;

  return {
    metadataBase: new URL(siteInfo.siteUrl),
    title: pageTitle,
    description,
    keywords: [
      "PVC interiors Chennai",
      "UPVC modular kitchen Chennai",
      "aluminium windows Chennai",
      "mosquito nets Chennai",
      "RF Interior Spot",
      "custom interior works",
    ],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
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
