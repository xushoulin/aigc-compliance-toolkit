export type AssetType = "肖像" | "声音" | "IP 形象" | "影视片段" | "音乐" | "其他";

export interface AuthRecord {
  id: string;
  assetName: string;
  assetType: AssetType;
  source: string;
  rightsHolder: string;
  licenseId: string;
  validUntil: string;
  note: string;
  createdAt: string;
}

export const ASSET_TYPES: AssetType[] = [
  "肖像", "声音", "IP 形象", "影视片段", "音乐", "其他",
];

const STORAGE_KEY = "aigc-auth-records-v1";

export function loadRecords(): AuthRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: AuthRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function exportRecordsCsv(records: AuthRecord[]): string {
  const header = ["素材名称", "类型", "来源", "权利方", "授权凭证编号", "有效期至", "备注", "登记时间"];
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rows = records.map((r) =>
    [r.assetName, r.assetType, r.source, r.rightsHolder, r.licenseId, r.validUntil, r.note, r.createdAt]
      .map(esc)
      .join(",")
  );
  return "\uFEFF" + [header.map(esc).join(","), ...rows].join("\r\n");
}
