"use client";

import { useState } from "react";
import { Memo } from "@/data/types";

type ReturnsData = NonNullable<Memo["returns"]>;

type ReturnsProps = {
  data: ReturnsData;
};

function computeReturns(
  baseRevenue: number,
  entryValuation: number,
  checkSize: number,
  holdingPeriod: number,
  growthRate: number,
  exitMargin: number,
  exitMultiple: number
) {
  const revenueAtExit = baseRevenue * Math.pow(1 + growthRate, holdingPeriod);
  const ebitdaAtExit = revenueAtExit * exitMargin;
  const exitValuation = ebitdaAtExit * exitMultiple;
  const ownership = checkSize / entryValuation;
  const exitProceeds = ownership * exitValuation;
  const moic = exitProceeds / checkSize;
  const irr = Math.pow(moic, 1 / holdingPeriod) - 1;

  return {
    revenueAtExit,
    exitValuation,
    moic,
    irr,
  };
}

function fmt(n: number, decimals = 1) {
  if (n >= 1000) return `$${(n / 1000).toFixed(decimals)}B`;
  return `$${n.toFixed(decimals)}M`;
}

function pct(n: number) {
  return `${(n * 100).toFixed(0)}%`;
}

export default function ReturnsCalculator({ data }: ReturnsProps) {
  const [growth, setGrowth] = useState(data.defaults.growthRate);
  const [margin, setMargin] = useState(data.defaults.exitMargin);
  const [multiple, setMultiple] = useState(data.defaults.exitMultiple);

  const result = computeReturns(
    data.baseRevenue,
    data.entryValuation,
    data.checkSize,
    data.holdingPeriod,
    growth,
    margin,
    multiple
  );

  const moicLabel =
    result.moic < 1 ? "< 1x" : `${result.moic.toFixed(1)}x`;

  const irrLabel =
    result.irr < 0
      ? `(${pct(Math.abs(result.irr))})`
      : pct(result.irr);

  return (
    <div className="mt-8 space-y-10">
      {/* Assumptions */}
      <div className="space-y-7">
        <SliderRow
          label="Revenue growth"
          value={growth}
          display={pct(growth)}
          min={data.ranges.growthRate.min}
          max={data.ranges.growthRate.max}
          step={0.01}
          onChange={setGrowth}
        />
        <SliderRow
          label="Exit EBITDA margin"
          value={margin}
          display={pct(margin)}
          min={data.ranges.exitMargin.min}
          max={data.ranges.exitMargin.max}
          step={0.01}
          onChange={setMargin}
        />
        <SliderRow
          label="Exit multiple"
          value={multiple}
          display={`${multiple}x`}
          min={data.ranges.exitMultiple.min}
          max={data.ranges.exitMultiple.max}
          step={0.5}
          onChange={setMultiple}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-ink/10" />

      {/* Outputs */}
      <div className="grid grid-cols-3 gap-6">
        <OutputCard
          label="Revenue at exit"
          value={fmt(result.revenueAtExit)}
          sub={`in ${data.holdingPeriod} years`}
        />
        <OutputCard
          label="Implied valuation"
          value={fmt(result.exitValuation)}
          sub={`${multiple}x · ${pct(margin)} margin`}
        />
        <OutputCard
          label="IRR"
          value={irrLabel}
          sub={`${moicLabel} MoM`}
        />
      </div>

      {/* Context */}
      <p className="font-mono text-xs text-muted">
        Based on {fmt(data.baseRevenue)} base revenue · {fmt(data.checkSize)} check ·{" "}
        {fmt(data.entryValuation)} entry · {(data.checkSize / data.entryValuation * 100).toFixed(1)}% ownership
      </p>
    </div>
  );
}

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-muted tracking-wide uppercase">
          {label}
        </span>
        <span className="font-mono text-sm font-medium text-ink">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function OutputCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs text-muted tracking-wide uppercase mb-2">
        {label}
      </p>
      <p className="font-serif text-2xl font-medium text-ink">{value}</p>
      <p className="font-mono text-xs text-muted mt-1">{sub}</p>
    </div>
  );
}
