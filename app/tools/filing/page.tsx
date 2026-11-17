"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  evaluateFiling,
  ProductionType,
  SPECIAL_SUBJECTS,
  TierResult,
} from "@/lib/filing-rules";

const tierStyle: Record<string, { badge: string; ring: string }> = {
  class1: { badge: "bg-red-100 text-red-700", ring: "border-red-200 bg-red-50/50" },
  class2: { badge: "bg-amber-100 text-amber-700", ring: "border-amber-200 bg-amber-50/50" },
  class3: { badge: "bg-green-100 text-green-700", ring: "border-green-200 bg-green-50/50" },
};

export default function FilingPage() {
  const [productionType, setProductionType] = useState<ProductionType>("ai");
  const [investment, setInvestment] = useState("30");
  const [special, setSpecial] = useState(false);
  const [result, setResult] = useState<TierResult | null>(null);
  const [error, setError] = useState("");

  function run() {
    const value = Number(investment);
    if (!Number.isFinite(value) || value < 0) {
      setError("请输入有效的投资额（万元）");
      setResult(null);
      return;
    }
    setError("");
    setResult(evaluateFiling({ productionType, investmentWan: value, specialSubject: special }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        title="备案分层判定"
        badge="规则引擎"
        description="依《微短剧发展管理办法》（2026-09-01 施行）及总局分类分层标准，输入制作类型、投资额与题材，判定归口层级与所需许可。注意 AI 微短剧门槛低于真人剧。"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card space-y-5 lg:col-span-2">
          <div>
            <label className="label">制作类型</label>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              {(["ai", "live"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setProductionType(t); setResult(null); }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    productionType === t ? "bg-white text-brand-600 shadow-sm" : "text-slate-600"
                  }`}
                >
                  {t === "ai" ? "AI 微短剧" : "真人微短剧"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="investment">投资额（万元）</label>
            <input
              id="investment"
              type="number"
              min="0"
              className="input"
              value={investment}
              onChange={(e) => { setInvestment(e.target.value); setResult(null); }}
              placeholder="例如 30"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              门槛：{productionType === "ai" ? "一类 ≥80 万，二类 30–80 万，三类 <30 万" : "一类 ≥300 万，二类 100–300 万，三类 <100 万"}
            </p>
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={special}
                onChange={(e) => { setSpecial(e.target.checked); setResult(null); }}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500"
              />
              <span>
                <span className="font-medium text-slate-800">涉及特殊题材</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                  {SPECIAL_SUBJECTS.join("、")}。涉及任一即直接归为一类，与投资额无关。
                </span>
              </span>
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn-primary w-full" onClick={run}>判定层级</button>
        </div>

        <div className="card lg:col-span-3">
          {!result ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">案</span>
              <p className="text-sm font-medium text-slate-700">判定结果将显示在这里</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                输出归口层级、审核机关、所需许可与下一步动作。特殊题材将覆盖投资额判定。
              </p>
            </div>
          ) : (
            <div>
              <div className={`rounded-2xl border p-5 ${tierStyle[result.tier].ring}`}>
                <div className="mb-2 flex items-center gap-3">
                  <span className={`badge ${tierStyle[result.tier].badge}`}>{result.tierName}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{result.reason}</p>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { k: "备案 / 归口机关", v: result.authority },
                  { k: "成片审核", v: result.reviewBody },
                  { k: "所需许可 / 标识", v: result.permit },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-xs text-slate-500">{row.k}</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-800">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-xl bg-brand-50 p-4">
                <div className="mb-1 text-xs font-medium text-brand-700">下一步动作</div>
                <p className="text-sm leading-relaxed text-brand-800">{result.action}</p>
              </div>
              <p className="mt-5 text-xs text-slate-400">
                结果仅供参考，不构成法律意见。政策可能调整，最终以广电主管部门与平台认定为准。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
