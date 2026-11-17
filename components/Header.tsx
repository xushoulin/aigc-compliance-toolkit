"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "首页" },
  { href: "/tools/ai-label", label: "AI 标识核查" },
  { href: "/tools/filing", label: "备案分层判定" },
  { href: "/tools/authorization", label: "授权凭证管理" },
  { href: "/tools/remake", label: "AI 魔改提示" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
            合
          </span>
          <span className="text-base">合规自检工具箱</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-brand-50 font-medium text-brand-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <select
          aria-label="导航菜单"
          value={nav.some((n) => n.href === pathname) ? pathname : "/"}
          onChange={(e) => {
            if (e.target.value) window.location.href = e.target.value;
          }}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm md:hidden"
        >
          {nav.map((item) => (
            <option key={item.href} value={item.href}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
