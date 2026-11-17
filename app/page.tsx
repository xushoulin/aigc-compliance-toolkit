import Link from "next/link";

const tools = [
  {
    href: "/tools/ai-label",
    icon: "标",
    color: "bg-blue-50 text-blue-600",
    title: "AI 标识核查",
    desc: "上传文件，本地扫描显式水印线索与元数据 AIGC 隐式标识字段，输出逐项核查报告。",
    status: "建议做",
    statusColor: "bg-green-50 text-green-700",
  },
  {
    href: "/tools/filing",
    icon: "案",
    color: "bg-blue-50 text-blue-600",
    title: "备案分层判定",
    desc: "输入制作类型、投资额、题材，依《微短剧发展管理办法》判定一/二/三类归口与所需许可。",
    status: "建议做",
    statusColor: "bg-green-50 text-green-700",
  },
  {
    href: "/tools/authorization",
    icon: "权",
    color: "bg-violet-50 text-violet-600",
    title: "授权凭证管理",
    desc: "登记肖像、声音、IP、影视图素的授权来源与凭证，本地留存可导出的授权链证明。",
    status: "替代相似度检测",
    statusColor: "bg-violet-50 text-violet-700",
  },
  {
    href: "/tools/remake",
    icon: "改",
    color: "bg-amber-50 text-amber-600",
    title: "AI 魔改风险提示",
    desc: "输入标题与剧情关键词，识别四大名著、英模、革命题材等高频下架风险点，只提示不定性。",
    status: "仅做提示",
    statusColor: "bg-amber-50 text-amber-700",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mb-14">
        <span className="badge mb-4 bg-brand-50 text-brand-600">发布前最后一道自查</span>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          AI 微短剧合规自检工具箱
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          标识、备案、授权、魔改风险——四个发布前最容易踩坑的环节，一次自查清楚。
          所有文件与数据仅在浏览器本地处理，不上传服务器，不留存。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/tools/ai-label" className="btn-primary">开始核查 →</Link>
          <Link href="/tools/filing" className="btn-ghost">备案分层判定</Link>
        </div>
      </section>

      <section className="mb-14 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="card group transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-semibold ${tool.color}`}>
                {tool.icon}
              </span>
              <span className={`badge ${tool.statusColor}`}>{tool.status}</span>
            </div>
            <h2 className="mb-1.5 text-lg font-semibold text-slate-900 group-hover:text-brand-600">{tool.title}</h2>
            <p className="text-sm leading-relaxed text-slate-600">{tool.desc}</p>
          </Link>
        ))}
      </section>

      <section className="card mb-14 bg-slate-50">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">为什么需要发布前自检</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { n: "7.5 万部", t: "2026 年累计下架违规微短剧" },
            { n: "11000+ 条", t: "单月清理「AI 魔改」违规视频" },
            { n: "2025-09-01", t: "AI 生成内容标识办法施行" },
          ].map((s) => (
            <div key={s.n}>
              <div className="text-2xl font-semibold text-brand-600">{s.n}</div>
              <div className="mt-1 text-sm text-slate-600">{s.t}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-slate-400">
          数据来源：国家广电总局公开通报。制作方「发出去就被下架」的担忧真实存在——本工具帮助你把可控的风险挡在发布之前。
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
