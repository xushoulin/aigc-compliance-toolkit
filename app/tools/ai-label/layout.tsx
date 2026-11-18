import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "AI 标识核查";
const DESC =
  "AI 标识核查依据《人工智能生成合成内容标识办法》（2025 年 9 月 1 日施行），在浏览器本地检查显式水印与隐式 AIGC 元数据字段是否完整。上传文件或粘贴文本即可逐项核对，文件不上传服务器。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/tools/ai-label" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/ai-label`,
    title: `${TITLE} | 合规自检工具箱`,
    description: DESC,
  },
};

const FAQS = [
  {
    q: "AI 生成内容标识办法什么时候施行，要求是什么？",
    a: "《人工智能生成合成内容标识办法》自 2025 年 9 月 1 日起施行，要求 AI 生成合成内容同时具备显式标识与隐式标识。显式标识是用户可感知的水印或提示；隐式标识写在文件元数据中，包含 AIGC 符号、服务提供者编码与内容编号。两类标识缺一，都属于发布前需要补齐的问题。",
  },
  {
    q: "显式标识和隐式标识有什么区别？",
    a: "显式标识面向观看者，通常是在画面或音频中可见可听的水印、提示语；隐式标识面向机器，写在文件的元数据字段里，供平台与监管部门读取核验。AI 标识核查工具同时扫描这两类线索：字节流中的 AIGC 字段属于隐式标识，画面水印文字属于显式标识线索，后者仍需人工目视确认。",
  },
  {
    q: "可以删除或伪造视频里的 AI 标识吗？",
    a: "不可以。《标识办法》明文禁止为他人恶意删除、篡改、伪造、隐匿标识提供工具或服务。本工具的定位是补合规而非过审核：帮你发现缺失的标识并提示如何补齐，不提供任何规避能力。试图规避标识的操作可能带来法律与下架风险。",
  },
  {
    q: "上传的文件会离开我的设备吗？",
    a: "不会。AI 标识核查完全在浏览器本地运行：文件解析、元数据读取、文字线索扫描都在你自己的设备上完成，不上传服务器、不留存。这也是它与需要上传素材的在线检测服务的根本区别。",
  },
  {
    q: "自动检测的结果能作为合规证明吗？",
    a: "不能。检测结果仅用于发布前自查，不构成法律意见，也不能替代主管部门与平台的认定。自动扫描覆盖的是文件字节中可识别的标识线索，无法代替对画面水印的人工目视判断。请结合「需人工」项复核，最终以平台审核为准。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AI 标识核查",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      description: DESC,
      url: `${SITE_URL}/tools/ai-label`,
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      featureList: [
        "扫描文件字节中的 AIGC 元数据字段",
        "检查显式水印文字线索",
        "文本模式核对声明与展示位置",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function AiLabelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <section className="card mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            AI 标识核查是什么，怎么判断合规
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            结论：AI 标识核查是依据《人工智能生成合成内容标识办法》对生成合成内容做的发布前检查，该办法自
            2025 年 9 月 1 日起施行。合规的 AI 生成内容必须同时具备显式标识（用户可见的水印或提示）与隐式标识（文件元数据中的
            AIGC 符号、服务提供者编码、内容编号）。缺少任一标识都属于发布前需要补齐的问题。本工具在浏览器本地读取文件字节，逐项输出「已检出 /
            未检出 / 需人工」三种状态，适用于成片投放短视频或微短剧平台前的自查。
          </p>
          <p className="text-xs leading-relaxed text-slate-400">
            规则依据：
            <a
              href="https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              《人工智能生成合成内容标识办法》（国家网信办，2025-09-01 施行）↗
            </a>
            。以上为公开政策口径，非本工具实测；结果仅供参考，不构成法律意见。
          </p>
        </section>

        <section className="card">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            AI 标识核查常见问题
          </h2>
          <dl className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="mb-1.5 text-sm font-semibold text-slate-900">{f.q}</dt>
                <dd className="text-sm leading-relaxed text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </>
  );
}
