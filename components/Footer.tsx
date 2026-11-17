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
            <div className="mb-2 font-medium text-slate-800">免责声明</div>
            <p className="text-sm leading-relaxed text-slate-500">
              本工具结果仅供参考，不构成法律意见，不能替代主管部门与平台的认定。请以官方最新规定为准。
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} 合规自检工具箱 · 隐私优先，本地运行
        </div>
      </div>
    </footer>
  );
}
