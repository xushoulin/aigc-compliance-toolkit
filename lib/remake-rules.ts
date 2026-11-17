export interface RiskRule {
  id: string;
  label: string;
  keywords: string[];
  hint: string;
}

/** 依据广电总局「AI 魔改」专项治理重点：四大名著、历史题材、革命题材、英模人物、邪典动画 */
export const RISK_RULES: RiskRule[] = [
  {
    id: "four-classics",
    label: "四大名著 / 经典文学改编",
    keywords: ["红楼梦", "西游记", "水浒传", "三国演义", "林黛玉", "薛宝钗", "孙悟空", "甄嬛", "大观园", "水浒"],
    hint: "总局重点清理基于四大名著的「AI 魔改」违规视频。改编需确认原著与人物形象使用权，避免颠覆性解构经典",
  },
  {
    id: "revolution",
    label: "革命题材 / 英模人物",
    keywords: ["革命", "红军", "抗战", "英模", "英雄", "烈士", "党史", "长征"],
    hint: "革命题材与英模人物属特殊题材，且为 AI 魔改整治重点。不得歪曲、戏说、亵渎，且触发一类备案",
  },
  {
    id: "history",
    label: "历史题材",
    keywords: ["历史", "皇帝", "王朝", "古代", "宫廷", "清朝", "明朝", "唐朝"],
    hint: "历史题材为专项排查对象，注意避免严重违背史实、低俗戏说；涉及具体历史人物肖像需授权",
  },
  {
    id: "subversion",
    label: "经典颠覆性改动词",
    keywords: ["复仇女主", "手撕", "掌嘴", "穿越火线", "特种兵", "魔改", "恶搞", "瘆人", "邪典"],
    hint: "此类强情节词常与「AI 魔改」「邪典动画」关联，是被下架的高频特征。建议弱化并做人工复核",
  },
  {
    id: "parody",
    label: "低俗 / 擦边风险词",
    keywords: ["擦边", "暧昧", "软色情", "拜金", "炫富", "极端对立"],
    hint: "新一轮专项治理（2026-11 至 12 月底）重点整治低俗化、同质化内容，此类词需重点自查",
  },
];

export interface RiskHit {
  rule: RiskRule;
  matches: string[];
}

export function scanRisk(text: string): RiskHit[] {
  if (!text.trim()) return [];
  return RISK_RULES.map((rule) => ({
    rule,
    matches: rule.keywords.filter((k) => text.includes(k)),
  })).filter((hit) => hit.matches.length > 0);
}
