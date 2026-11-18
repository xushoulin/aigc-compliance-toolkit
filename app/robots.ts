import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// AI 搜索与生成式引擎爬虫放行清单：国内（字节/百度/搜狗/神马/360）+ 海外（Google/OpenAI/Anthropic 等）。
// 规则：默认 ALLOW，不对任何 AI 爬虫设置 Disallow；仅屏蔽无实际抓取价值的路径。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // 显式放行主流 AI 爬虫，避免未来上层默认策略误伤。
      ...[
        "Bytespider",
        "Baiduspider",
        "Baiduspider-news",
        "Baiduspider-image",
        "Sogou web spider",
        "Sogou inst spider",
        "YisouSpider",
        "360Spider",
        "ToutiaoSpider",
        "Googlebot",
        "Google-Extended",
        "Bingbot",
        "GPTBot",
        "OAI-SearchBot",
        "ClaudeBot",
        "anthropic-ai",
        "PerplexityBot",
        "Applebot-Extended",
      ].map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
