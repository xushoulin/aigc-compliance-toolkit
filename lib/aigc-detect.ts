export type CheckStatus = "pass" | "warn" | "fail" | "info";

export interface CheckItem {
  id: string;
  title: string;
  status: CheckStatus;
  detail: string;
}

export interface LabelReport {
  fileName: string;
  fileType: string;
  checks: CheckItem[];
  score: number;
  summary: string;
}

/** 隐式标识：文件元数据中应含 AIGC 字段（办法要求字段名包含 AIGC 标识符号） */
const IMPLICIT_KEYS = [
  "AIGC",
  "aigc",
  "生成合成",
  "生成内容属性",
  "服务提供方",
  "serviceProvider",
  "contentId",
  "内容编号",
];

/** 常见显式标识文案 */
const EXPLICIT_PATTERNS = [/AI生成/, /人工智能生成/, /AI合成/, /AI原创/, /AIGC/];

function decodeBuffer(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let out = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return out;
}

export function analyzeText(text: string, fileName: string): LabelReport {
  const checks: CheckItem[] = [];
  const hasExplicit = EXPLICIT_PATTERNS.some((re) => re.test(text));
  const hasImplicit = IMPLICIT_KEYS.some((k) => text.includes(k));
  const hasLeadingOrTrailing =
    /^\s*(AI生成|人工智能生成|AIGC)/.test(text) ||
    /(AI生成|人工智能生成|AIGC)\s*$/.test(text);

  checks.push({
    id: "text-explicit",
    title: "文本显式标识",
    status: hasExplicit ? "pass" : "fail",
    detail: hasExplicit
      ? "检测到 AI 生成类声明文字"
      : "未在文本中发现「AI生成 / 人工智能生成 / AIGC」等声明。办法要求在开头、结尾或关键位置标注",
  });
  checks.push({
    id: "text-position",
    title: "标识位置规范",
    status: hasLeadingOrTrailing ? "pass" : "warn",
    detail: hasLeadingOrTrailing
      ? "标识位于开头或结尾，位置清晰"
      : "标识可能未在开头/结尾等显著位置，建议调整字体清晰可辨、不得刻意缩小或模糊",
  });
  checks.push({
    id: "text-implicit",
    title: "源文件隐式标识",
    status: hasImplicit ? "info" : "warn",
    detail: hasImplicit
      ? "文本内出现 AIGC 类字段痕迹，建议在文件元数据层固化"
      : "纯文本无法承载元数据隐式标识，须由生成服务在导出时嵌入；请保留原始生成文件",
  });

  return buildReport(fileName, "文本", checks);
}

export function analyzeFile(file: File): Promise<LabelReport> {
  return file.arrayBuffer().then((buf) => {
    const raw = decodeBuffer(buf);
    const checks: CheckItem[] = [];

    const foundImplicit = IMPLICIT_KEYS.filter((k) => raw.includes(k));
    checks.push({
      id: "file-implicit",
      title: "元数据隐式标识 (AIGC 字段)",
      status: foundImplicit.length ? "pass" : "fail",
      detail: foundImplicit.length
        ? `在文件字节流中检测到：${foundImplicit.slice(0, 5).join("、")}。仍需确认字段含生成属性、服务提供者编码、内容编号`
        : "未在文件数据中检出 AIGC 类标识字段。办法要求在文件元数据中添加隐式标识，请向生成服务索取带标识的原始导出文件",
    });

    const hasExplicitInBinary = EXPLICIT_PATTERNS.some((re) => re.test(raw));
    checks.push({
      id: "file-explicit-hint",
      title: "显式标识线索",
      status: hasExplicitInBinary ? "pass" : "warn",
      detail: hasExplicitInBinary
        ? "文件内检出 AI 生成类文字痕迹（可能为画面水印或内嵌字幕）"
        : "未在文件数据中检出显式标识文字。画面可见水印无法完全自动识别，请人工核对首帧与角标",
    });

    checks.push({
      id: "manual-watermark",
      title: "人工复核：画面显式水印",
      status: "info",
      detail: "请逐帧确认画面角落是否有「AI生成 / 人工智能生成」等清晰可辨的提示，且未被刻意缩小、模糊或遮挡",
    });
    checks.push({
      id: "manual-tamper",
      title: "人工复核：标识完整性",
      status: "info",
      detail: "确认未删除、篡改、伪造、隐匿平台或生成服务添加的标识；此类行为被办法明文禁止",
    });

    return buildReport(file.name, file.type || "未知类型", checks);
  });
}

function buildReport(
  fileName: string,
  fileType: string,
  checks: CheckItem[]
): LabelReport {
  const weight = { pass: 100, warn: 55, fail: 0, info: 70 };
  const scored = checks.filter((c) => c.status !== "info");
  const score = scored.length
    ? Math.round(scored.reduce((s, c) => s + weight[c.status], 0) / scored.length)
    : 70;
  const fails = checks.filter((c) => c.status === "fail").length;
  const warns = checks.filter((c) => c.status === "warn").length;
  const summary =
    fails > 0
      ? `检出 ${fails} 项缺失、${warns} 项待确认。建议补齐后再发布，避免被平台补标、限流或下架`
      : warns > 0
        ? `未发现硬性缺失，但有 ${warns} 项需人工确认。建议按下述提示复核`
        : "自动核查项均通过，仍请以主管部门与平台认定为准";

  return { fileName, fileType, checks, score, summary };
}
