"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { RiskHit, scanRisk } from "@/lib/remake-rules";

export default function RemakePage() {
  const [text, setText] = useState("");
  const [hits, setHits] = useState<RiskHit[] | null>(null);

  function run() {
    setHits(scanRisk(text));
  }

  const level =
    hits === null ? null : hits.length >= 3 ? "high" : hits.length >= 1 ? "mid" : "low";
  const levelMeta = {
    high: { label: "多项风险提示", cls: "bg-red-50 text-red-700 border-red-200" },
    mid: { label: "部分风险提示", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    low: { label: "未命中规则词", cls: "bg-green-50 text-green-700 border-green-200" },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        title="AI 魔改风险提示"
        badge="只提示 · 不定性"
        description="广电总局重点清理基于四大名著、历史、革命题材、英模人物的「AI 魔改」违规视频及邪典动画。输入标题与剧情关键词，识别高频下架特征词。本工具只做风险提示，不输出「违规」结论，请务必人工复核。"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card lg:col-span-2">
          <label className="label" htmlFor="remake-text">作品标题 + 剧情关键词</label>
          <textarea
            id="remake-text"
            className="input min-h-[220px] resize-y leading-relaxed"
            placeholder="例如：林黛玉化身复仇女主，手撕薛宝钗；甄嬛穿越火线成为特种兵王……"
            value={text}
            onChange={(e) => { setText(e.target.value); setHits(null); }}
          />
          <button className="btn-primary mt-4 w-full" disabled={!text.trim()} onClick={run}>
            扫描风险词
          </button>
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
            提示：本工具基于关键词规则，无法理解画面与语境，可能存在漏报或误报。命中不代表违规，未命中也不代表合规。
          </p>
        </div>

        <div className="card lg:col-span-3">
          {hits === null ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">改</span>
              <p className="text-sm font-medium text-slate-700">风险提示将显示在这里</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                按四大名著、革命/英模、历史题材、颠覆性改动词、低俗擦边五类规则扫描。
              </p>
            </div>
          ) : (
            <div>
              <div className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${levelMeta[level!].cls}`}>
                {levelMeta[level!].label} · 命中 {hits.length} 类规则
              </div>
              {hits.length === 0 ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  未命中预设的高频风险词。这不等于合规——请结合画面、配音、素材来源与备案状态做完整自查。
                </p>
              ) : (
                <div className="space-y-3">
                  {hits.map((hit) => (
                    <div key={hit.rule.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{hit.rule.label}</span>
                        {hit.matches.map((m) => (
                          <span key={m} className="badge bg-red-50 text-red-600">{m}</span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">{hit.rule.hint}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-5 text-xs text-slate-400">
                结果仅供参考，不构成合规认定或法律意见。是否违规由主管部门与平台判定。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
