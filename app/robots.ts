import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sakib-cp-2035/", "/api/"],
    },
    sitemap: "https://mdsakib-hossen.vercel.app/sitemap.xml",
  };
}
