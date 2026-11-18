import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "AI 魔改风险提示";
const DESC =
  "AI 魔改风险提示在发布前扫描标题与剧情关键词，识别四大名著、英模与革命题材、颠覆性改编等高频下架特征词。只提示疑似风险点并建议人工复核，不输出违规结论。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/tools/remake" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/remake`,
    title: `${TITLE} | 合规自检工具箱`,
    description: DESC,
  },
};

const FAQS = [
  {
    q: "什么是「AI 魔改」，为什么会被下架？",
    a: "「AI 魔改」指用生成式 AI 对经典作品或严肃题材做颠覆性、娱乐化改编，常见区间包括四大名著改编、英模与革命人物戏说、真实新闻事件篡改等。据公开通报，2026 年 10 月单月清理的「AI 魔改」违规视频超过 11000 条，是平台常态化治理的重点。",
  },
  {
    q: "命中风险词是不是就等于违规？",
    a: "不等于。本工具基于关键词规则，无法理解画面与语境，可能存在漏报或误报。命中的是疑似风险点，建议人工复核并结合画面、配音、素材来源与备案状态综合判断。是否违规由主管部门与平台认定，关键词扫描不输出违规定性结论。",
  },
  {
    q: "扫描覆盖哪几类风险？",
    a: "覆盖五类高频风险规则：四大名著改编、革命与英模题材、历史题材、颠覆性改动词、低俗擦边。每类命中后给出疑似风险点说明与复核建议，帮助制作方在成片发布前或立项阶段避开高风险题材。",
  },
  {
    q: "未命中风险词是不是就安全了？",
    a: "不是。未命中只说明未触发预设的高频风险词，不等于合规。画面内容、配音台词、素材来源与备案状态都可能在关键词之外构成风险。请把本工具当作最后一道筛查，而非合规通行证，最终以平台审核为准。",
  },
  {
    q: "这个工具的提示能作为合规证明吗？",
    a: "不能。结果仅供参考，不构成合规认定或法律意见，也不能替代主管部门与平台的判断。它降低的是发出去才发现触及高风险题材这类本可避免的风险，真正的合规仍需完成标识、备案与授权的全套自查。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AI 魔改风险提示",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      description: DESC,
      url: `${SITE_URL}/tools/remake`,
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      featureList: [
        "五类高频风险关键词规则",
        "命中仅提示疑似风险点",
        "不输出违规定性结论",
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

export default function RemakeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <section className="card mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            AI 魔改风险提示：扫描什么，如何解读结果
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            结论：AI 魔改风险提示是在发布前对标题与剧情关键词做的一次性预警扫描。据公开通报，2026 年 10
            月单月清理的「AI 魔改」违规视频超过 11000 条，四大名著改编、英模与革命题材是高频下架区间。本工具内置五类关键词规则，命中后给出疑似风险点加建议人工复核的提示，只提示不定性——关键词规则的准确率不足以支撑此作品违规这类结论，最终判断权在平台与主管部门。适用于成片发布前的最后一道风险筛查。
          </p>
          <p className="text-xs leading-relaxed text-slate-400">
            治理数据来源：
            <a
              href="https://news.cctv.com/2026/11/06/ARTIwgy3HgzO5ePOi4z3D2V6261106.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              央视网关于「AI 魔改」违规视频清理的报道（2026-11）↗
            </a>
            。数据为官方公开通报口径，非本工具实测；提示仅供参考，不构成法律意见。
          </p>
        </section>

        <section className="card">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            AI 魔改风险提示常见问题
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
