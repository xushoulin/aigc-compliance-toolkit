import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

const TITLE = "授权凭证管理";
const DESC =
  "授权凭证管理把肖像、声音、IP 与影视图素的授权来源系统化登记并导出 CSV 授权链证明，用于平台维权时自证素材来源合法。不采集人脸做相似度比对，数据仅存本机浏览器。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/tools/authorization" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/authorization`,
    title: `${TITLE} | 合规自检工具箱`,
    description: DESC,
  },
};

const FAQS = [
  {
    q: "为什么授权凭证管理不做人脸相似度检测？",
    a: "为了比对明星脸而去采集他人面部图像，采集行为本身就可能侵犯肖像权，恰好是制作方要规避的风险。同时相似度阈值无法自证，误把一个素人判成盗脸会让工具方承担法律责任。因此改为登记你已获得的授权，用证明自己替代检测别人。",
  },
  {
    q: "授权凭证管理需要登记哪些信息？",
    a: "需要登记四类素材的授权：肖像、声音、IP 与影视图素。每条记录包含素材名称、素材来源、权利方、授权凭证编号、授权有效期至与备注。字段齐全的授权链记录，在平台复核或维权时可以直接作为自证材料。",
  },
  {
    q: "登记的授权数据会被上传吗？",
    a: "不会。所有授权记录保存在你自己浏览器的 localStorage 中，不上传服务器、不留存于任何云端。清除浏览器数据会导致记录丢失，因此工具提供一键导出 CSV，建议定期备份授权链证明。",
  },
  {
    q: "导出的 CSV 授权链证明有什么用？",
    a: "CSV 记录按素材名称、类型、来源、权利方、凭证编号与有效期逐条列出，可在平台要求说明素材来源时提交，帮助证明使用的是自有或已授权素材。它属于自制证据链，能否采信由平台与主管部门判断。",
  },
  {
    q: "什么制作团队最需要授权凭证管理？",
    a: "使用真人出镜、配音、音乐或经典 IP 二创的 AI 微短剧与漫剧团队最需要。平台因盗脸、盗声、盗 IP 问题下架过作品，制作方需要能自证素材来源合法。把授权信息在立项阶段就登记归档，比发布后被投诉时再补救成本低得多。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "授权凭证管理",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      description: DESC,
      url: `${SITE_URL}/tools/authorization`,
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      featureList: [
        "肖像、声音、IP、影视图素四类登记",
        "数据仅存浏览器本地",
        "导出 CSV 授权链证明",
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

export default function AuthorizationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <section className="card mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            授权凭证管理：用证明自己替代检测别人
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            结论：授权凭证管理是把肖像、声音、IP 与影视图像素材的授权来源系统化登记并导出证明链的流程。平台因盗脸问题下架过作品，制作方需要能自证素材来源合法。本工具不做人脸相似度比对——采集他人面部图像用于比对本身就可能构成侵权，正是要规避的风险。替代做法是让制作方登记授权人、授权范围、授权期限与凭证文件，把检测别人换成证明自己。所有数据仅存在浏览器本地，可导出为
            CSV 授权链证明，平台维权或复核时可直接使用。
          </p>
          <p className="text-xs leading-relaxed text-slate-400">
            依据《中华人民共和国民法典》人格权编肖像权相关规定与平台内容治理实践整理。授权链证明为自制证据链，能否采信由平台与主管部门判断；结果仅供参考，不构成法律意见。
          </p>
        </section>

        <section className="card">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            授权凭证管理常见问题
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
