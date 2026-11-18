// 全站唯一站点地址来源：canonical / JSON-LD / robots / sitemap 都从这里读取。
// 迁移域名时只改这里，或用 NEXT_PUBLIC_SITE_URL 环境变量覆盖。
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aigc-compliance-toolkit.shoulin.shop";

export const SITE_NAME = "合规自检工具箱";

export const SITE_DESCRIPTION =
  "面向 AI 微短剧制作方的合规自检工具：AI 生成内容标识核查、备案分层判定、授权凭证管理、AI 魔改风险提示。所有文件仅在浏览器本地处理，不上传服务器。";
