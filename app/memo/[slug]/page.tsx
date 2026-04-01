import { notFound } from "next/navigation";
import Link from "next/link";
import memos from "@/data/index";
import ReturnsCalculator from "@/components/ReturnsCalculator";
import PnLCalculator from "@/components/PnLCalculator";
import {
  ThesisSection,
  MarketSection,
  ProductSection,
  TeamSection,
  RisksSection,
} from "@/components/RichMemoSections";

export function generateStaticParams() {
  return memos.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memo = memos.find((m) => m.slug === slug);
  if (!memo) return {};
  return { title: `${memo.company} — Investment Memo` };
}

const SIMPLE_SECTIONS = [
  { key: "market", label: "Market" },
  { key: "product", label: "Product" },
  { key: "business", label: "Business" },
  { key: "team", label: "Team" },
] as const;

export default async function MemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memo = memos.find((m) => m.slug === slug);
  if (!memo) notFound();

  const rc = memo.richContent;
  const returnsNumber = rc ? "05" : "05";

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      {/* Back */}
      <Link
        href="/"
        className="font-mono text-xs text-muted hover:text-ink transition-colors tracking-widest uppercase"
      >
        ← All memos
      </Link>

      {/* Header */}
      <div className="mt-10 mb-12">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
          {memo.sector} · {memo.stage} · {memo.date}
        </p>
        <h1
          className="font-serif text-5xl font-medium leading-tight mb-3 typewriter cursor"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {memo.company}
        </h1>
        <p className="font-serif text-lg italic text-muted">
          {memo.tagline}
        </p>
      </div>

      <div className="border-t border-ink/10 mb-12" />

      <div className="space-y-16">
        {rc ? (
          // ── Rich content path ──────────────────────────────────────────
          <>
            <ThesisSection data={rc.thesis} />
            <MarketSection data={rc.market} />
            <ProductSection data={rc.product} />
            <TeamSection data={rc.team} />
          </>
        ) : (
          // ── Simple string path (placeholder memos) ─────────────────────
          SIMPLE_SECTIONS.map(({ key, label }, i) => (
            <section key={key}>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h2 className="font-serif text-2xl font-medium">{label}</h2>
              </div>
              <p className="font-serif text-base leading-relaxed text-ink/80 pl-8">
                {memo.thesis[key]}
              </p>
            </section>
          ))
        )}

        {/* Returns — always present */}
        <section>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-xs text-muted">{returnsNumber}</span>
            <h2 className="font-serif text-2xl font-medium">Returns</h2>
          </div>
          <div className="pl-8">
            <p className="font-serif text-base leading-relaxed text-ink/80 mb-8">
              The returns here are illustrative, built on a set of assumptions you can flex below.
            </p>
            <div className="border border-ink/10 p-6">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
                Returns model — flex the assumptions
              </p>
              {memo.pnlModel ? (
                <PnLCalculator model={memo.pnlModel} />
              ) : memo.returns ? (
                <ReturnsCalculator data={memo.returns} />
              ) : null}
            </div>
          </div>
        </section>

        {/* Risks — only for rich content memos */}
        {rc && <RisksSection data={rc.risks} />}
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-ink/10">
        <p className="font-mono text-xs text-muted">
          Pia Mishra · {memo.date} · Not financial advice
        </p>
      </div>
    </main>
  );
}
