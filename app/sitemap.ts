import type { MetadataRoute } from "next";

const BASE = "https://aigc-compliance-toolkit.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/tools/ai-label", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/tools/filing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/tools/authorization", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tools/remake", priority: 0.8, changeFrequency: "monthly" as const },
  ];
  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
