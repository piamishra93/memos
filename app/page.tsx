import Link from "next/link";
import memos from "@/data/index";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-mono text-3xl font-normal tracking-widest uppercase">
          Investment Memos
        </h1>
      </div>

      {/* Divider */}
      <div className="border-t border-ink/10 mb-10" />

      {/* Memo list */}
      <ul className="space-y-0">
        {memos.map((memo, i) => (
          <li key={memo.slug}>
            <Link
              href={`/memo/${memo.slug}`}
              className="group flex items-center justify-between py-8 border-b border-ink/10 hover:border-ink/30 transition-colors"
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-xs text-muted mt-1 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-xl font-medium group-hover:underline underline-offset-2">
                    {memo.company}
                  </h2>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase mt-1">
                    {memo.sector} · {memo.stage} · {memo.date}
                  </p>
                  <p className="font-serif text-sm text-muted italic mt-2">
                    {memo.tagline}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-muted mt-1 shrink-0 group-hover:text-ink transition-colors">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-16">
        <p className="font-mono text-xs text-muted">
          Pia Mishra · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
