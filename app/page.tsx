import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/ai-label",
    icon: "标",
    color: "bg-blue-50 text-blue-600",
    title: "AI 标识核查",
    status: "建议做",
    statusColor: "bg-green-50 text-green-700",
    lead: "AI 标识核查是依据《人工智能生成合成内容标识办法》对生成合成内容做的发布前检查，该办法自 2025 年 9 月 1 日起施行，要求显式标识（用户可见的水印或提示）与隐式标识（文件元数据中的 AIGC 字段、服务提供者编码、内容编号）同时具备。本工具在浏览器本地读取文件字节，逐项输出「已检出 / 未检出 / 需人工」三种状态，适用于成片投放短视频或微短剧平台前的自查。需要注意，AI 标识核查只做补合规——本工具不提供删除、篡改、伪造或隐匿标识的能力，办法对这类行为有明确禁止性规定。检测结果仅供参考，最终以主管部门与平台的认定为准。",
    points: ["扫描文件字节中的 AIGC 元数据字段", "检查显式水印文字线索", "文本模式核对声明与展示位置"],
  },
  {
    href: "/tools/filing",
    icon: "案",
    color: "bg-blue-50 text-blue-600",
    title: "备案分层判定",
    status: "建议做",
    statusColor: "bg-green-50 text-green-700",
    lead: "备案分层判定是根据制作类型、投资额与题材确定微短剧归口层级的自查步骤。按 2026 年 9 月 1 日施行的《微短剧发展管理办法》，AI 生成微短剧的分类门槛为：一类（国家广电总局）投资额 80 万元以上，二类（省级广电部门）30 万至 80 万元，三类（平台自审报备）低于 30 万元；真人剧的对应门槛为 300 万元与 100 万元。涉及重大历史、英模、革命题材的作品不论投资额统一归一类。本工具输入上述三项后输出归口层级、所需许可与材料清单，适用于立项阶段判断报审路径。结果为规则推演，仅供参考，以主管部门认定为准。",
    points: ["AI 剧与真人剧采用不同金额门槛", "特殊题材强制归一类", "输出归口层级与材料清单"],
  },
  {
    href: "/tools/authorization",
    icon: "权",
    color: "bg-violet-50 text-violet-600",
    title: "授权凭证管理",
    status: "替代相似度检测",
    statusColor: "bg-violet-50 text-violet-700",
    lead: "授权凭证管理是把肖像、声音、IP 与影视图像素材的授权来源系统化登记并导出证明链的流程。平台因盗脸问题下架过作品，制作方需要能自证素材来源合法；本工具不做人脸相似度比对——采集他人面部图像用于比对本身就可能构成侵权，正是要规避的风险。替代做法是让制作方登记授权人、授权范围、授权期限与凭证文件，把「检测别人」换成「证明自己」。所有数据仅存在浏览器本地，可导出为 CSV 授权链证明，平台维权或复核时可直接提交。适用于使用真人出镜、配音、音乐或经典 IP 二创的制作团队。",
    points: ["肖像、声音、IP、影视图素四类登记", "数据仅存浏览器本地", "导出 CSV 授权链证明"],
  },
  {
    href: "/tools/remake",
    icon: "改",
    color: "bg-amber-50 text-amber-600",
    title: "AI 魔改风险提示",
    status: "仅做提示",
    statusColor: "bg-amber-50 text-amber-700",
    lead: "AI 魔改风险提示是在发布前对标题与剧情关键词做的一次性预警扫描。2026 年公开通报显示，单月清理的「AI 魔改」违规视频超过 11000 条，四大名著改编、英模与革命题材是高频下架区间。本工具内置五类关键词规则，命中后给出「疑似风险点 + 建议人工复核」提示，只提示不定性——关键词规则的准确率不足以支撑「此作品违规」这类结论，最终判断权在平台与主管部门。适用于成片发布前的最后一道风险筛查，也可用于在立项阶段避开高风险题材。",
    points: ["五类高频风险关键词规则", "命中仅提示疑似风险点", "不输出违规定性结论"],
  },
];

const FAQS = [
  {
    q: "AI 微短剧发布前必须做哪些合规自查？",
    a: "核心是四项：AI 生成合成内容的显式与隐式标识是否完整、投资额与题材对应的备案层级、肖像与 IP 素材是否有可追溯授权、标题剧情是否触及「AI 魔改」高风险题材。本工具把四项拆成独立模块，逐项输出可复核结果。自查不能替代主管部门认定，结果仅供参考。",
  },
  {
    q: "AI 生成内容标识办法什么时候施行，要求是什么？",
    a: "《人工智能生成合成内容标识办法》自 2025 年 9 月 1 日起施行，要求生成合成内容同时具备显式标识与隐式标识。显式标识是用户可感知的水印或提示；隐式标识写在文件元数据中，包含 AIGC 符号、服务提供者编码与内容编号。办法明确禁止为他人恶意删除、篡改、伪造或隐匿标识提供工具或服务。",
  },
  {
    q: "AI 短剧备案分为哪几类，门槛是多少？",
    a: "按 2026 年 9 月 1 日施行的《微短剧发展管理办法》，AI 剧一类（国家广电总局）投资额 80 万元以上，二类（省级广电部门）30 万至 80 万元，三类（平台自审报备）低于 30 万元。真人剧门槛更高，分别为 300 万元与 100 万元。重大历史、英模、革命题材等不论投资额统一归一类。请以主管部门最新认定为准。",
  },
  {
    q: "为什么这个工具不做人脸相似度检测？",
    a: "为了比对明星脸而去采集他人面部图像，采集行为本身就可能侵犯肖像权，恰好是制作方要规避的风险。同时相似度阈值无法自证，误把一个素人判成盗脸会让工具方承担法律责任。本工具改为「授权凭证管理」，让制作方登记并导出自己持有的授权链证明，用「证明自己」替代「检测别人」。",
  },
  {
    q: "上传的文件会被传到服务器吗？",
    a: "不会。四个工具全部在浏览器本地运行：文件解析、关键词扫描、授权登记都只在你自己的设备上完成，不上传服务器、不留存。授权凭证数据只存在浏览器的本地存储中，可随时清除或导出为 CSV。这也是本工具与需要上传素材的在线检测服务的根本区别。",
  },
  {
    q: "可以删除或规避视频里的 AI 标识吗？",
    a: "不可以，本工具也不提供这类能力。《标识办法》明文禁止为他人恶意删除、篡改、伪造、隐匿标识提供工具或服务。本工具的定位是「补合规」而非「过审核」：帮你发现缺失的标识并提示如何补齐，而不是帮你绕过平台审核。任何试图规避标识的操作都可能带来法律与下架风险。",
  },
  {
    q: "什么情况会被认定为「AI 魔改」高风险？",
    a: "常见区间包括：对四大名著等经典作品做颠覆性改编、使用英模或革命历史人物做娱乐化演绎、篡改真实新闻事件等。2026 年公开通报显示单月清理的「AI 魔改」违规视频超过 11000 条。本工具只能基于关键词给出疑似风险提示，不能替代平台与主管部门对具体作品的定性。",
  },
  {
    q: "工具的检测结果能作为合规证明吗？",
    a: "不能。检测结果仅用于发布前自查和风险排查，不构成法律意见，也不能替代主管部门或平台的认定。真正能作为证明的是你持有的授权链文件、备案回执与平台审核结果——授权凭证管理模块导出的 CSV 授权链证明可用于这一用途，但同样以平台采信为准。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mb-14">
        <span className="badge mb-4 bg-brand-50 text-brand-600">发布前最后一道自查</span>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          AI 微短剧合规自检工具箱
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          <strong className="font-semibold text-slate-900">结论：</strong>
          <strong>AI 微短剧合规自检工具箱</strong>是面向制作方的发布前自查工具，把标识、备案、授权、魔改风险四个最容易导致下架的环节拆成可逐项核对的清单。依据《人工智能生成合成内容标识办法》（2025 年 9 月 1 日施行）与《微短剧发展管理办法》（2026 年 9 月 1 日施行），所有文件与数据仅在浏览器本地处理，不上传服务器、不留存。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/tools/ai-label" className="btn-primary">开始核查 →</Link>
          <Link href="/tools/filing" className="btn-ghost">备案分层判定</Link>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">四项发布前自检能力</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <article key={tool.href} className="card">
              <div className="mb-4 flex items-center justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-semibold ${tool.color}`}>
                  {tool.icon}
                </span>
                <span className={`badge ${tool.statusColor}`}>{tool.status}</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                <Link href={tool.href} className="hover:text-brand-600">{tool.title}</Link>
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{tool.lead}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                {tool.points.map((p) => <li key={p}>· {p}</li>)}
              </ul>
              <Link href={tool.href} className="mt-4 inline-flex text-sm font-medium text-brand-600 hover:underline">
                打开{tool.title} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="card mb-14 bg-slate-50">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">为什么需要在发布前做合规自检</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          发布前自检的价值在于把可控风险挡在发布动作之前。据国家广播电视总局 2026 年 11 月 6 日通报，2026 年以来累计下架违规微短剧 7.5 万部、处置违规账号 1500 余个；据总局督导的重点平台 10 月治理公告，单月清理「AI 魔改」违规视频 11000 余条、处置账号 30 余个。这些数字说明「发出去就被下架」并非个别现象，而是常态化治理的结果。本工具把标识、备案、授权、魔改四个环节拆成可逐项核对的自查清单，帮助制作方在投流前发现遗漏。以上数据均为官方公开通报口径，非本工具实测；结果仅供参考，不构成法律意见。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4 font-medium">公开通报指标</th>
                <th className="py-2 pr-4 font-medium">规模</th>
                <th className="py-2 pr-4 font-medium">时间口径</th>
                <th className="py-2 font-medium">官方来源</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">累计下架违规微短剧</td><td className="py-2 pr-4">7.5 万部</td><td className="py-2 pr-4">2026 年以来</td>
                <td className="py-2"><a href="https://www.nrta.gov.cn/art/2026/11/6/art_114_74410.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">广电总局通报 ↗</a></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">处置违规账号</td><td className="py-2 pr-4">1500 余个</td><td className="py-2 pr-4">2026 年以来</td>
                <td className="py-2"><a href="https://www.nrta.gov.cn/art/2026/11/6/art_114_74410.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">广电总局通报 ↗</a></td>
              </tr>
              <tr>
                <td className="py-2 pr-4">单月清理「AI 魔改」视频</td><td className="py-2 pr-4">11000 余条</td><td className="py-2 pr-4">2026 年 10 月</td>
                <td className="py-2"><a href="https://news.cctv.com/2026/11/06/ARTIwgy3HgzO5ePOi4z3D2V6261106.shtml" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">央视网报道 ↗</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          规则依据：
          <a href="https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm" target="_blank" rel="noopener noreferrer" className="hover:underline">《人工智能生成合成内容标识办法》（国家网信办，2025-09-01 施行） ↗</a>
          　·　
          <a href="https://www.nrta.gov.cn/art/2026/7/31/art_113_73785.html" target="_blank" rel="noopener noreferrer" className="hover:underline">《微短剧发展管理办法》（广电总局令第 16 号，2026-09-01 施行） ↗</a>
          　·　
          <a href="https://gdj.shaanxi.gov.cn/bsfw/wlstczxmsb/glts/202609/t20260910_3683513.html" target="_blank" rel="noopener noreferrer" className="hover:underline">微短剧分类分层标准（陕西省广电局） ↗</a>
        </p>
      </section>

      <section className="card mb-14">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">常见问题（AI 微短剧合规自检 FAQ）</h2>
        <dl className="space-y-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt className="mb-1.5 text-sm font-semibold text-slate-900">{f.q}</dt>
              <dd className="text-sm leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </section>

      <section className="card mb-14">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">谁适合用这套工具</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          这套工具面向 AI 微短剧制作方、漫剧团队与内容平台的审核人员，适用于立项、成片、投放三个时间节点。费用为零：四个工具免费使用，本地处理不上传素材。与人工审核的区别在于，本工具只做规则层面的自查与证据留存，不能替你完成备案申报或取得平台审核结论——它降低的是「发出去才发现漏了标识、缺了授权」这类本可避免的风险，最终认定权仍在主管部门与平台。
        </p>
      </section>

      <section className="card border-amber-200 bg-amber-50/60">
        <h2 className="mb-2 text-lg font-semibold text-amber-900">重要边界说明</h2>
        <p className="text-sm leading-relaxed text-amber-800">
          本工具只做「补合规」，不做「过审核」：不提供删除、篡改、伪造、隐匿 AI 标识的能力（《标识办法》明文禁止），
          不采集任何人的面部图像做相似度比对（采集行为本身即可能侵权），也不对作品是否违规下定性结论。
          结果仅供参考，最终以主管部门与平台认定为准。
        </p>
      </section>
    </div>
  );
}
