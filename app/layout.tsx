import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 部署到正式域名时可用 NEXT_PUBLIC_SITE_URL 覆盖；默认 Vercel 域名。
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aigc-compliance-toolkit.vercel.app";
const SITE_NAME = "合规自检工具箱";
const DESCRIPTION =
  "面向 AI 微短剧制作方的合规自检工具：AI 生成内容标识核查、备案分层判定、授权凭证管理、AI 魔改风险提示。所有文件仅在浏览器本地处理，不上传服务器。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "合规自检工具箱 · AI 微短剧合规与侵权风险自查",
    template: "%s | 合规自检工具箱",
  },
  description: DESCRIPTION,
  keywords: ["AI标识", "AIGC合规", "微短剧备案", "AI魔改", "肖像授权", "合规自检"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "合规自检工具箱 · AI 微短剧合规与侵权风险自查",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "zh-CN",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "zh-CN",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, webSiteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
