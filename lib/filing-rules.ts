export type ProductionType = "live" | "ai";

export type Tier = "class1" | "class2" | "class3";

export interface FilingInput {
  productionType: ProductionType;
  investmentWan: number;
  specialSubject: boolean;
}

export interface TierResult {
  tier: Tier;
  tierName: string;
  authority: string;
  reviewBody: string;
  permit: string;
  action: string;
  reason: string;
  thresholds: { class1: number; class2: number };
}

export const SPECIAL_SUBJECTS = [
  "政治",
  "军事",
  "外交",
  "国家安全",
  "统战",
  "民族",
  "宗教",
  "司法",
  "公安",
];

const TIER_META: Record<
  Tier,
  {
    tierName: string;
    authority: string;
    reviewBody: string;
    permit: string;
    action: string;
  }
> = {
  class1: {
    tierName: "一类微短剧",
    authority: "国家广电总局备案公示",
    reviewBody: "省级以上广电主管部门成片审核",
    permit: "《微短剧发行许可证》",
    action: "先备案公示 → 成片送省级以上广电审核 → 取得发行许可证后方可上线",
  },
  class2: {
    tierName: "二类微短剧",
    authority: "省级以上广电主管部门",
    reviewBody: "省级以上广电主管部门成片审核",
    permit: "审核批准文件",
    action: "成片送省级以上广电审核 → 取得批准文件后方可上线",
  },
  class3: {
    tierName: "三类微短剧",
    authority: "网络视听平台",
    reviewBody: "播出平台履行内容管理职责",
    permit: "平台节目编号",
    action: "由平台播前审核并标注节目编号后上线",
  },
};

/**
 * 依据《微短剧发展管理办法》（广电总局令第16号，2026-09-01 施行）
 * 及总局网络视听司 2026-08-17 分类分层提示。
 *
 * 特殊题材 → 一律一类，与投资额无关。
 * 真人：>=300万 一类；100万(含)-300万 二类；<100万 三类。
 * AI：  >=80万 一类；30万(含)-80万 二类；<30万 三类。
 */
export function evaluateFiling(input: FilingInput): TierResult {
  const thresholds =
    input.productionType === "ai"
      ? { class1: 80, class2: 30 }
      : { class1: 300, class2: 100 };

  let tier: Tier;
  let reason: string;

  if (input.specialSubject) {
    tier = "class1";
    reason = `剧情涉及特殊题材（${SPECIAL_SUBJECTS.join("、")}之一），按办法直接归为一类，与投资额无关`;
  } else if (input.investmentWan >= thresholds.class1) {
    tier = "class1";
    reason = `一般题材、投资 ${input.investmentWan} 万元 ≥ ${thresholds.class1} 万元门槛，归为一类`;
  } else if (input.investmentWan >= thresholds.class2) {
    tier = "class2";
    reason = `一般题材、投资 ${input.investmentWan} 万元落在 ${thresholds.class2}–${thresholds.class1} 万元区间，归为二类`;
  } else {
    tier = "class3";
    reason = `一般题材、投资 ${input.investmentWan} 万元 < ${thresholds.class2} 万元门槛，归为三类`;
  }

  const meta = TIER_META[tier];
  return {
    tier,
    tierName: meta.tierName,
    authority: meta.authority,
    reviewBody: meta.reviewBody,
    permit: meta.permit,
    action: meta.action,
    reason,
    thresholds,
  };
}
