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

const RICH_NAV = [
  { id: "thesis", label: "Thesis" },
  { id: "market", label: "Market" },
  { id: "product", label: "Product" },
  { id: "team", label: "Team" },
  { id: "returns", label: "Returns" },
  { id: "risks", label: "Risks" },
];

export default async function MemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memo = memos.find((m) => m.slug === slug);
  if (!memo) notFound();

  const rc = memo.richContent;

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      {/* Back arrow — fixed top left */}
      <Link
        href="/"
        className="fixed top-5 left-6 font-mono text-2xl text-muted hover:text-ink transition-colors"
      >
        ←
      </Link>

      {/* Header */}
      <div className="mt-2 mb-8">
        <h1
          className="font-serif text-5xl font-medium leading-tight mb-4 typewriter cursor"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {memo.company}
        </h1>
        <p className="font-serif text-lg italic text-muted">
          {memo.tagline}
        </p>
      </div>

      {/* Section nav — rich memos only */}
      {rc ? (
        <>
          <div className="border-t border-ink/10 mb-4" />
          <nav className="flex flex-wrap justify-center items-center gap-x-6 font-mono text-xs tracking-widest uppercase text-muted mb-4">
            {RICH_NAV.map((s, i) => (
              <>
                {i > 0 && <span key={`dot-${i}`} className="text-ink/20">·</span>}
                <a key={s.id} href={`#${s.id}`} className="hover:text-ink transition-colors">
                  {s.label}
                </a>
              </>
            ))}
          </nav>
          <div className="border-t border-ink/10 mb-12" />
        </>
      ) : (
        <div className="border-t border-ink/10 mb-12" />
      )}

      <div className="space-y-16">
        {rc ? (
          <>
            <ThesisSection data={rc.thesis} />
            <MarketSection data={rc.market} />
            <ProductSection data={rc.product} />
            <TeamSection data={rc.team} />
          </>
        ) : (
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

        {/* Returns */}
        <section id="returns">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-xs text-muted">05</span>
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
