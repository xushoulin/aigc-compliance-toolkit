"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  ASSET_TYPES,
  AssetType,
  AuthRecord,
  exportRecordsCsv,
  loadRecords,
  makeId,
  saveRecords,
} from "@/lib/authorization";

const emptyForm = {
  assetName: "",
  assetType: "肖像" as AssetType,
  source: "",
  rightsHolder: "",
  licenseId: "",
  validUntil: "",
  note: "",
};

export default function AuthorizationPage() {
  const [records, setRecords] = useState<AuthRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRecords(loadRecords());
    setReady(true);
  }, []);

  function persist(next: AuthRecord[]) {
    setRecords(next);
    saveRecords(next);
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.assetName.trim()) return;
    const rec: AuthRecord = {
      ...form,
      id: makeId(),
      createdAt: new Date().toLocaleString("zh-CN"),
    };
    persist([rec, ...records]);
    setForm(emptyForm);
  }

  function remove(id: string) {
    persist(records.filter((r) => r.id !== id));
  }

  function downloadCsv() {
    const blob = new Blob([exportRecordsCsv(records)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `授权链证明-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const fields: { key: keyof typeof emptyForm; label: string; placeholder: string }[] = [
    { key: "assetName", label: "素材名称", placeholder: "如：某角色面部形象 / 某段配乐" },
    { key: "source", label: "素材来源", placeholder: "如：自有拍摄 / 已授权素材库" },
    { key: "rightsHolder", label: "权利方", placeholder: "如：演员本人 / 版权公司" },
    { key: "licenseId", label: "授权凭证编号", placeholder: "如：合同号 / 授权书编号" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        title="授权凭证管理"
        badge="替代相似度检测"
        description="不采集任何人的面部图像做比对——采集行为本身即可能侵权。改为登记你已获得的肖像、声音、IP 与影视图素授权，形成可导出的授权链证明，在平台维权时自证清白。数据仅存于本机浏览器。"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-slate-900">新增授权记录</h2>
          <form onSubmit={add} className="space-y-4">
            <div>
              <label className="label" htmlFor="assetName">素材名称 *</label>
              <input id="assetName" className="input" value={form.assetName} placeholder={fields[0].placeholder}
                onChange={(e) => setForm({ ...form, assetName: e.target.value })} required />
            </div>
            <div>
              <label className="label" htmlFor="assetType">素材类型</label>
              <select id="assetType" className="input" value={form.assetType}
                onChange={(e) => setForm({ ...form, assetType: e.target.value as AssetType })}>
                {ASSET_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {fields.slice(1).map((f) => (
              <div key={f.key}>
                <label className="label" htmlFor={f.key}>{f.label}</label>
                <input id={f.key} className="input" value={form[f.key]} placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label className="label" htmlFor="validUntil">授权有效期至</label>
              <input id="validUntil" type="date" className="input" value={form.validUntil}
                onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="note">备注</label>
              <textarea id="note" className="input min-h-[80px] resize-y" value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="授权范围、使用限制等" />
            </div>
            <button type="submit" className="btn-primary w-full">添加记录</button>
          </form>
        </div>

        <div className="card lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">授权链清单 ({records.length})</h2>
            <button onClick={downloadCsv} disabled={!records.length} className="btn-ghost px-3 py-1.5 text-xs">
              导出 CSV
            </button>
          </div>
          {!ready ? (
            <p className="py-12 text-center text-sm text-slate-400">加载中…</p>
          ) : records.length === 0 ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">权</span>
              <p className="text-sm font-medium text-slate-700">还没有授权记录</p>
              <p className="mt-1 text-xs text-slate-500">从左侧登记第一项素材授权的来源与凭证</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="mr-2 font-medium text-slate-900">{r.assetName}</span>
                      <span className="badge bg-violet-50 text-violet-700">{r.assetType}</span>
                    </div>
                    <button onClick={() => remove(r.id)} className="shrink-0 text-xs text-slate-400 hover:text-red-600">删除</button>
                  </div>
                  <div className="grid gap-1 text-xs text-slate-600 sm:grid-cols-2">
                    <span>来源：{r.source || "—"}</span>
                    <span>权利方：{r.rightsHolder || "—"}</span>
                    <span>凭证编号：{r.licenseId || "—"}</span>
                    <span>有效期至：{r.validUntil || "—"}</span>
                  </div>
                  {r.note && <p className="mt-2 text-xs text-slate-500">备注：{r.note}</p>}
                  <p className="mt-2 text-[11px] text-slate-400">登记于 {r.createdAt}</p>
                </div>
              ))}
            </div>
          )}
          <p className="mt-5 text-xs text-slate-400">
            记录保存在本机浏览器 localStorage，清除浏览器数据将丢失，请及时导出 CSV 备份。
          </p>
        </div>
      </div>
    </div>
  );
}
