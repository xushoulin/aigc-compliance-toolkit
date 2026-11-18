import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "备案分层判定";
const DESC =
  "备案分层判定依据《微短剧发展管理办法》（2026-09-01 施行）与总局分类分层标准，输入制作类型、投资额与题材即可判定归口层级。AI 微短剧门槛 80 万 / 30 万，低于真人剧的 300 万 / 100 万。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/tools/filing" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/filing`,
    title: `${TITLE} | 合规自检工具箱`,
    description: DESC,
  },
};

const FAQS = [
  {
    q: "AI 短剧备案门槛和真人剧一样吗？",
    a: "不一样，AI 微短剧门槛明显更低。按 2026 年 9 月 1 日施行的《微短剧发展管理办法》与总局分类分层标准：AI 剧一类（国家广电总局）投资额 80 万元以上，二类（省级广电部门）30 万至 80 万元，三类（平台自审报备）低于 30 万元；真人剧对应门槛为 300 万元与 100 万元。把真人剧标准套到 AI 剧会误判。",
  },
  {
    q: "哪些题材不论投资额都归为一类？",
    a: "涉及重大历史题材、英模题材、革命题材等特殊题材的微短剧，不论投资额高低，统一归为一类由国家广电总局把关。这是题材红线，会覆盖按投资额得出的层级。备案分层判定工具提供特殊题材勾选项，勾选后直接归一类。",
  },
  {
    q: "备案分层判定结果能作为申报依据吗？",
    a: "不能直接作为申报依据。判定结果是规则推演，用于立项阶段判断报审路径、提前准备材料，不构成法律意见，也不能替代广电主管部门与平台的认定。政策可能调整，正式申报请以主管部门最新规定与书面答复为准。",
  },
  {
    q: "一类、二类、三类分别归谁审核？",
    a: "一类归国家广播电视总局，二类归省级广电部门，三类由平台自审报备。层级不同，对应所需许可、成片审核机关与材料清单也不同。备案分层判定工具在输出层级的同时会一并列出归口机关、审核主体和下一步动作。",
  },
  {
    q: "投资额不到 30 万的 AI 短剧还需要备案吗？",
    a: "低于 30 万元的 AI 微短剧归三类，走平台自审报备路径，但仍需完成平台侧的报备与相应标识要求，并非完全免于管理。若涉及特殊题材则会直接归一类。具体执行口径以平台与主管部门要求为准。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "备案分层判定",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      description: DESC,
      url: `${SITE_URL}/tools/filing`,
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      featureList: [
        "AI 剧与真人剧采用不同金额门槛",
        "特殊题材强制归一类",
        "输出归口层级与材料清单",
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

export default function FilingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <section className="card mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            备案分层判定：AI 剧与真人剧门槛对照
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            结论：备案分层判定是根据制作类型、投资额与题材确定微短剧归口层级的自查步骤。按 2026 年 9 月 1
            日施行的《微短剧发展管理办法》，AI 生成微短剧的分类门槛为一类（国家广电总局）投资额 80
            万元以上、二类（省级广电部门）30 万至 80 万元、三类（平台自审报备）低于 30
            万元；真人剧对应门槛为 300 万元与 100 万元。涉及重大历史、英模、革命题材的作品不论投资额统一归一类。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4 font-medium">归口层级</th>
                  <th className="py-2 pr-4 font-medium">AI 微短剧</th>
                  <th className="py-2 pr-4 font-medium">真人微短剧</th>
                  <th className="py-2 font-medium">审核机关</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">一类</td><td className="py-2 pr-4">≥ 80 万元</td>
                  <td className="py-2 pr-4">≥ 300 万元</td><td className="py-2">国家广电总局</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">二类</td><td className="py-2 pr-4">30–80 万元</td>
                  <td className="py-2 pr-4">100–300 万元</td><td className="py-2">省级广电部门</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">三类</td><td className="py-2 pr-4">&lt; 30 万元</td>
                  <td className="py-2 pr-4">&lt; 100 万元</td><td className="py-2">平台自审报备</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            规则依据：
            <a
              href="https://www.nrta.gov.cn/art/2026/7/31/art_113_73785.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              《微短剧发展管理办法》（广电总局令第 16 号，2026-09-01 施行）↗
            </a>
            　·　
            <a
              href="https://gdj.shaanxi.gov.cn/bsfw/wlstczxmsb/glts/202609/t20260910_3683513.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              微短剧分类分层标准（陕西省广电局）↗
            </a>
            。结果为规则推演，仅供参考，以主管部门认定为准。
          </p>
        </section>

        <section className="card">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            备案分层判定常见问题
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
