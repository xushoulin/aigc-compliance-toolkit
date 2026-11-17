"use client";

import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  analyzeFile,
  analyzeText,
  CheckStatus,
  LabelReport,
} from "@/lib/aigc-detect";

const statusStyle: Record<CheckStatus, { badge: string; text: string; label: string }> = {
  pass: { badge: "bg-green-100 text-green-700", text: "text-green-600", label: "通过" },
  warn: { badge: "bg-amber-100 text-amber-700", text: "text-amber-600", label: "待确认" },
  fail: { badge: "bg-red-100 text-red-700", text: "text-red-600", label: "缺失" },
  info: { badge: "bg-slate-100 text-slate-600", text: "text-slate-500", label: "需人工" },
};

export default function AiLabelPage() {
  const [report, setReport] = useState<LabelReport | null>(null);
  const [mode, setMode] = useState<"file" | "text">("file");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      setReport(await analyzeFile(file));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        title="AI 标识核查"
        badge="本地运行"
        description="《人工智能生成合成内容标识办法》要求 AI 生成内容同时具备显式标识（用户可见）与隐式标识（文件元数据 AIGC 字段）。上传文件或粘贴文本，在浏览器本地完成核查，文件不会离开你的设备。"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card lg:col-span-2">
          <div className="mb-5 flex gap-2 rounded-xl bg-slate-100 p-1">
            {(["file", "text"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setReport(null); }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  mode === m ? "bg-white text-brand-600 shadow-sm" : "text-slate-600"
                }`}
              >
                {m === "file" ? "上传文件" : "粘贴文本"}
              </button>
            ))}
          </div>

          {mode === "file" ? (
            <div>
              <label className="label">选择导出文件</label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFile(e.dataTransfer.files[0]);
                }}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/40"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-brand-500 shadow-sm">↑</span>
                <p className="text-sm font-medium text-slate-700">点击选择或拖入文件</p>
                <p className="mt-1 text-xs text-slate-500">支持图片、视频、音频、文本；仅在本地读取字节</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*,audio/*,text/*,.srt,.json"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          ) : (
            <div>
              <label className="label" htmlFor="aigc-text">粘贴待发布的文本内容</label>
              <textarea
                id="aigc-text"
                className="input min-h-[220px] resize-y font-mono text-xs leading-relaxed"
                placeholder="在此粘贴文章、脚本或字幕文本……"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="btn-primary mt-4 w-full"
                disabled={!text.trim()}
                onClick={() => setReport(analyzeText(text, "粘贴文本"))}
              >
                开始核查
              </button>
            </div>
          )}
          {busy && <p className="mt-4 text-center text-sm text-slate-500">正在读取文件…</p>}
        </div>

        <div className="card lg:col-span-3">
          {!report ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">?</span>
              <p className="text-sm font-medium text-slate-700">核查结果将显示在这里</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                结果包含逐项状态与整改建议。自动检测无法覆盖画面水印的人工目视判断，请结合「需人工」项复核。文件不会离开你的设备。
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{report.fileName}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{report.fileType}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className={`text-2xl font-semibold ${report.score >= 80 ? "text-green-600" : report.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                    {report.score}
                  </div>
                  <div className="text-xs text-slate-500">自查分</div>
                </div>
              </div>
              <p className="mb-5 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">{report.summary}</p>
              <div className="space-y-3">
                {report.checks.map((c) => {
                  const s = statusStyle[c.status];
                  return (
                    <div key={c.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-800">{c.title}</span>
                        <span className={`badge ${s.badge}`}>{s.label}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">{c.detail}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-xs text-slate-400">
                本工具仅扫描文件字节中可识别的标识线索，不能替代专业检测与主管部门认定。请勿依据本结果删除或规避任何 AI 标识。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
