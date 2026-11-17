import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "合规自检工具箱 · AI 微短剧合规与侵权风险自查",
    template: "%s | 合规自检工具箱",
  },
  description:
    "面向 AI 微短剧制作方的合规自检工具：AI 生成内容标识核查、备案分层判定、授权凭证管理、AI 魔改风险提示。所有文件仅在浏览器本地处理，不上传服务器。",
  keywords: ["AI标识", "AIGC合规", "微短剧备案", "AI魔改", "肖像授权", "合规自检"],
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
      </body>
    </html>
  );
}
