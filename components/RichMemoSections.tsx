import { RichMemoContent, ContentBlock, MarketCard } from "@/data/types";

export function ThesisSection({ data }: { data: RichMemoContent["thesis"] }) {
  return (
    <section id="thesis" className="scroll-mt-8">
      <SectionHeader number="01" label="Thesis" />
      <div className="pl-8 space-y-8">
        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.keyStats.map((s) => (
            <div key={s.label} className="border border-ink/10 p-4">
              <p className="font-serif text-2xl font-medium">{s.value}</p>
              <p className="font-mono text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        {/* Prose */}
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.overview}</p>
        <Subhead>Why now</Subhead>
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.whyNow}</p>
        <Subhead>Path to scale</Subhead>
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.growthPath}</p>
        <Subhead>Team</Subhead>
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.team}</p>
      </div>
    </section>
  );
}

export function MarketSection({ data }: { data: RichMemoContent["market"] }) {
  return (
    <section id="market" className="scroll-mt-8">
      <SectionHeader number="02" label="Market" />
      <div className="pl-8 space-y-10">
        {/* SAM / TAM top-down */}
        <div>
          <Subhead>Top-down sizing</Subhead>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <MarketColumn label="SAM" cards={data.samTopDown} />
            <MarketColumn label="TAM" cards={data.tamTopDown} />
          </div>
        </div>

        {/* SAM / TAM bottom-up */}
        <div>
          <Subhead>Bottom-up sizing</Subhead>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <MarketColumn label="SAM" cards={data.samBottomUp} />
            <MarketColumn label="TAM" cards={data.tamBottomUp} />
          </div>
        </div>

        {/* Tailwinds */}
        <div>
          <Subhead>Tailwinds</Subhead>
          <ul className="mt-4 space-y-3">
            {data.tailwinds.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-xs text-muted mt-1 shrink-0">—</span>
                <p className="font-serif text-base leading-relaxed text-ink/80">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Competition */}
        <div>
          <Subhead>Competitive landscape</Subhead>
          <div className="mt-4 border border-ink/10 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="font-mono text-xs text-muted tracking-widest uppercase p-3 w-1/4">Category</th>
                  <th className="font-mono text-xs text-muted tracking-widest uppercase p-3 w-1/3">Competitors</th>
                  <th className="font-mono text-xs text-muted tracking-widest uppercase p-3">OE&apos;s advantage</th>
                </tr>
              </thead>
              <tbody>
                {data.competition.map((row, i) => (
                  <tr key={i} className={i < data.competition.length - 1 ? "border-b border-ink/10" : ""}>
                    <td className="font-mono text-xs p-3 align-top text-ink/70">{row.category}</td>
                    <td className="font-serif text-sm p-3 align-top text-ink/70 italic">{row.competitors}</td>
                    <td className="font-serif text-sm p-3 align-top text-ink/80">{row.reasonToWin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GTM */}
        <div>
          <Subhead>GTM motion</Subhead>
          <p className="font-serif text-base leading-relaxed text-ink/80 mt-4">{data.gtm}</p>
        </div>
      </div>
    </section>
  );
}

export function ProductSection({ data }: { data: RichMemoContent["product"] }) {
  return (
    <section id="product" className="scroll-mt-8">
      <SectionHeader number="03" label="Product" />
      <div className="pl-8 space-y-8">
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.overview}</p>

        {/* Value props */}
        <div>
          <Subhead>Value proposition</Subhead>
          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
            {data.valueProps.map((vp) => (
              <div key={vp.title} className="border border-ink/10 p-4 space-y-2">
                <p className="font-mono text-xs text-muted tracking-widest uppercase">{vp.title}</p>
                <p className="font-serif text-sm leading-relaxed text-ink/80">{vp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Moats */}
        <div>
          <Subhead>Moats</Subhead>
          <ul className="mt-4 space-y-3">
            {data.moats.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-xs text-muted mt-1 shrink-0">—</span>
                <p className="font-serif text-base leading-relaxed text-ink/80">{m}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function TeamSection({ data }: { data: RichMemoContent["team"] }) {
  return (
    <section id="team" className="scroll-mt-8">
      <SectionHeader number="04" label="Team" />
      <div className="pl-8 space-y-6">
        <p className="font-serif text-base leading-relaxed text-ink/80">{data.overview}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.members.map((m) => (
            <div key={m.name} className="border border-ink/10 p-5 flex flex-col gap-3">
              <div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase">{m.role}</p>
                <p className="font-serif text-xl font-medium mt-1">{m.name}</p>
              </div>
              <p className="font-serif text-sm leading-relaxed text-ink/70 flex-1">{m.description}</p>
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-muted tracking-widest uppercase hover:text-ink transition-colors block mt-auto">
                  LinkedIn ↗
                </a>
              )}
            </div>
          ))}
        </div>
        <a href="https://www.linkedin.com/company/openevidence/people/" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-muted hover:text-ink transition-colors block">
          {data.footnote} ↗
        </a>
      </div>
    </section>
  );
}

export function RisksSection({ data }: { data: RichMemoContent["risks"] }) {
  return (
    <section id="risks" className="scroll-mt-8">
      <SectionHeader number="06" label="Risks" />
      <div className="pl-8 space-y-4">
        {data.map((r) => (
          <div key={r.category} className="border border-ink/10 p-5 space-y-4">
            <p className="font-mono text-xs text-muted tracking-widest uppercase">{r.category}</p>
            <div className="grid grid-cols-2 gap-6 border-t border-ink/10 pt-4">
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted">Risk</p>
                <p className="font-serif text-sm leading-relaxed text-ink/80">{r.risk}</p>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted">Mitigant</p>
                <p className="font-serif text-sm leading-relaxed text-ink/80">{r.mitigant}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-mono text-xs text-muted">{number}</span>
      <h2 className="font-serif text-2xl font-medium">{label}</h2>
    </div>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-muted tracking-widest uppercase">{children}</p>
  );
}

function MarketColumn({ label, cards }: { label: string; cards: MarketCard[] }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs text-muted tracking-widest uppercase">{label}</p>
      {cards.map((card) => (
        <SubCard key={card.label} label={card.label} blocks={card.blocks} />
      ))}
    </div>
  );
}

function SubCard({ label, blocks }: { label: string; blocks: ContentBlock[] }) {
  return (
    <div className="border border-ink/10 p-4 space-y-3">
      <p className="font-mono text-xs text-muted tracking-widest uppercase">{label}</p>
      {blocks.map((block, i) =>
        block.type === "text" ? (
          <p key={i} className="font-serif text-sm leading-relaxed text-ink/80">
            {block.text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
              part.startsWith("**") ? (
                <strong key={j} className="font-semibold text-ink/90">{part.slice(2, -2)}</strong>
              ) : part
            )}
          </p>
        ) : (
          <ul key={i} className="space-y-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-2">
                <span className="font-mono text-xs text-muted shrink-0 mt-0.5">—</span>
                <span className="font-serif text-sm leading-relaxed text-ink/80">{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
