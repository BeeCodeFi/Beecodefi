import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/bookmarks", "/quiz/history"],
      },
    ],
    sitemap: "https://beecodefi.com/sitemap.xml",
  };
}
