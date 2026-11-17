import Link from "next/link";

interface Props {
  title: string;
  description: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: Props) {
  return (
    <div className="mb-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
        <span aria-hidden>←</span> 返回首页
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
            {badge && <span className="badge bg-brand-50 text-brand-600">{badge}</span>}
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
