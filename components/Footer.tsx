import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-2 font-semibold text-slate-900">合规自检工具箱</div>
            <p className="text-sm leading-relaxed text-slate-500">
              帮助 AI 微短剧制作方在发布前完成标识、备案与侵权风险自查。所有文件仅在浏览器本地处理，不上传服务器。
            </p>
          </div>
          <div>
            <div className="mb-2 font-medium text-slate-800">工具</div>
            <ul className="space-y-1.5 text-sm text-slate-500">
              <li><Link href="/tools/ai-label" className="hover:text-brand-600">AI 标识核查</Link></li>
              <li><Link href="/tools/filing" className="hover:text-brand-600">备案分层判定</Link></li>
              <li><Link href="/tools/authorization" className="hover:text-brand-600">授权凭证管理</Link></li>
              <li><Link href="/tools/remake" className="hover:text-brand-600">AI 魔改风险提示</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-medium text-slate-800">依据与免责</div>
            <p className="text-sm leading-relaxed text-slate-500">
              依据《人工智能生成合成内容标识办法》（2025-09-01 施行）与《微短剧发展管理办法》（2026-09-01 施行）整理。结果仅供参考，不构成法律意见，不能替代主管部门与平台认定。
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-1.5 border-t border-slate-100 pt-5 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} 合规自检工具箱 · 隐私优先，本地运行 · 规则依据更新于 2026-11-17</p>
          <p>内容主体：合规自检工具箱 · 联系与反馈：通过 GitHub 仓库 xushoulin/aigc-compliance-toolkit 提交 Issue</p>
        </div>
      </div>
    </footer>
  );
}
