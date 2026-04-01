"use client";

import { useState, useMemo } from "react";
import { PnLModel } from "@/data/types";

// ─── Compute the full P&L for all years ────────────────────────────────────

function buildModel(
  model: PnLModel,
  physicianScalar: number,
  consultScalar: number
) {
  const { base, projectedYears, physicianGrowthRates, otherMPGrowthRates,
    consultGrowthMultiples, consultPricingGrowth } = model;

  type YearRow = {
    year: number;
    licensed: number;
    otherMPs: number;
    consultsMM: number;
    dollarPerConsult: number;
    consultsPerPhysician: number;
    subPerPhysician: number; // $/licensed physician/year
    consultRev: number;  // $M
    cmeRev: number;      // $M
    adRev: number;       // $M
    totalARR: number;    // $M
  };

  const rows: YearRow[] = [];

  // Base year (fixed — no sliders affect 2025)
  const baseConsultRev = base.consultsMM * base.dollarPerConsult;
  const baseCmeRev = (base.licensedPhysicians * base.cmePerPhysician) / 1e6;
  const baseAdRev = ((base.licensedPhysicians + base.otherMPs) * base.adsPerPhysician) / 1e6;
  const baseTotalARR = baseConsultRev + baseCmeRev + baseAdRev;
  rows.push({
    year: 2025,
    licensed: base.licensedPhysicians,
    otherMPs: base.otherMPs,
    consultsMM: base.consultsMM,
    dollarPerConsult: base.dollarPerConsult,
    consultsPerPhysician: (base.consultsMM * 1e6) / base.licensedPhysicians,
    subPerPhysician: (baseTotalARR * 1e6) / base.licensedPhysicians,
    consultRev: baseConsultRev,
    cmeRev: baseCmeRev,
    adRev: baseAdRev,
    totalARR: baseTotalARR,
  });

  // Projected years
  for (let i = 0; i < projectedYears.length; i++) {
    const prev = rows[i];

    const adjPhysGrowth = physicianGrowthRates[i] * physicianScalar;
    const adjOtherGrowth = otherMPGrowthRates[i] * physicianScalar;
    const adjConsultMultiple =
      1 + (consultGrowthMultiples[i] - 1) * consultScalar;
    const adjPricingGrowth = consultPricingGrowth[i];

    const licensed = prev.licensed * (1 + adjPhysGrowth);
    const otherMPs = prev.otherMPs * (1 + adjOtherGrowth);
    const consultsMM = prev.consultsMM * Math.max(adjConsultMultiple, 1);
    const dollarPerConsult = prev.dollarPerConsult * (1 + adjPricingGrowth);

    const consultRev = consultsMM * dollarPerConsult; // in $M
    const cmeRev = (licensed * base.cmePerPhysician) / 1e6;
    const adRev = ((licensed + otherMPs) * base.adsPerPhysician) / 1e6;
    const totalARR = consultRev + cmeRev + adRev;
    const consultsPerPhysician = (consultsMM * 1e6) / licensed;
    const subPerPhysician = (totalARR * 1e6) / licensed;

    rows.push({
      year: projectedYears[i],
      licensed,
      otherMPs,
      consultsMM,
      dollarPerConsult,
      consultsPerPhysician,
      subPerPhysician,
      consultRev,
      cmeRev,
      adRev,
      totalARR,
    });
  }

  return rows;
}

// ─── Formatting helpers ─────────────────────────────────────────────────────

function fmtK(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return `${Math.round(n / 1000).toLocaleString()}K`;
}

function fmtConsults(mm: number) {
  if (mm >= 1000) return `${(mm / 1000).toFixed(1)}B`;
  return `${Math.round(mm)}M`;
}

function fmtRevM(m: number) {
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}B`;
  return `$${Math.round(m)}M`;
}

function fmtDPC(v: number) {
  return `$${v.toFixed(2)}`;
}

function fmtSub(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  return `$${Math.round(v)}`;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function PnLCalculator({ model }: { model: PnLModel }) {
  const [physicianScalar, setPhysicianScalar] = useState(
    model.defaults.physicianPenetration
  );
  const [consultScalar, setConsultScalar] = useState(
    model.defaults.consultGrowth
  );
  const [exitMultiple, setExitMultiple] = useState(model.defaults.exitMultiple);

  const rows = useMemo(
    () => buildModel(model, physicianScalar, consultScalar),
    [model, physicianScalar, consultScalar]
  );

  const entryRow = rows.find((r) => r.year === model.entryYear)!;
  const exitRow = rows.find((r) => r.year === model.exitYear)!;
  const exitValuationB = (exitRow.totalARR * exitMultiple) / 1000;
  const entryValuationB = model.entryValuationB;
  const moic = exitValuationB / entryValuationB;
  const holdYears = model.exitYear - model.entryYear;
  const irr = Math.pow(moic, 1 / holdYears) - 1;

  const years = rows.map((r) => r.year);

  return (
    <div className="space-y-10">
      {/* ── Sliders ── */}
      <div className="space-y-7">
        <SliderRow
          label="Physician penetration rate"
          value={physicianScalar}
          display={`${physicianScalar.toFixed(2)}× — ${fmtK(exitRow.licensed)} physicians by ${model.exitYear}`}
          min={model.ranges.physicianPenetration.min}
          max={model.ranges.physicianPenetration.max}
          step={0.05}
          onChange={setPhysicianScalar}
        />
        <SliderRow
          label="Consult coverage growth rate"
          value={consultScalar}
          display={`${consultScalar.toFixed(2)}× — ${fmtConsults(exitRow.consultsMM)} consults by ${model.exitYear}`}
          min={model.ranges.consultGrowth.min}
          max={model.ranges.consultGrowth.max}
          step={0.05}
          onChange={setConsultScalar}
        />
        <SliderRow
          label="ARR multiple at exit"
          value={exitMultiple}
          display={`${exitMultiple}× ARR`}
          min={model.ranges.exitMultiple.min}
          max={model.ranges.exitMultiple.max}
          step={0.5}
          onChange={setExitMultiple}
        />
      </div>

      {/* ── P&L Table ── */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-right" style={{ minWidth: 480 }}>
          <thead>
            <tr>
              <th className="text-left font-mono text-xs text-muted tracking-widest uppercase pb-3 w-40">
              </th>
              {years.map((y) => (
                <th
                  key={y}
                  className={`font-mono text-xs tracking-widest uppercase pb-3 pl-4 ${
                    y === model.entryYear || y === model.exitYear
                      ? "text-ink"
                      : "text-muted"
                  }`}
                >
                  <span className="block">{y}</span>
                  {y === model.entryYear ? (
                    <span className="block normal-case font-normal text-muted">entry</span>
                  ) : y === model.exitYear ? (
                    <span className="block normal-case font-normal text-muted">exit</span>
                  ) : (
                    <span className="block invisible">—</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-sm">

            {/* Physicians */}
            <SectionLabel label="Physicians" />
            <Row
              label="Licensed physicians"
              values={rows.map((r) => fmtK(r.licensed))}
              highlight={physicianScalar !== 1.0}
            />
            <Row
              label="Other medical pros"
              values={rows.map((r) => fmtK(r.otherMPs))}
              highlight={physicianScalar !== 1.0}
            />
            <Row
              label="Total providers"
              values={rows.map((r) => fmtK(r.licensed + r.otherMPs))}
              bold
            />

            {/* Volume */}
            <SectionLabel label="Volume & pricing" />
            <Row
              label="Consults covered"
              values={rows.map((r) => fmtConsults(r.consultsMM))}
              highlight={consultScalar !== 1.0}
            />
            <Row
              label="Consults / physician"
              values={rows.map((r) => Math.round(r.consultsPerPhysician).toLocaleString())}
              highlight={consultScalar !== 1.0}
            />
            <Row
              label="$ subscription / physician"
              values={rows.map((r) => fmtSub(r.subPerPhysician))}
            />

            {/* Revenue */}
            <SectionLabel label="Revenue" />
            <Row
              label="Consult revenue"
              values={rows.map((r) => fmtRevM(r.consultRev))}
              highlight={consultScalar !== 1.0 || physicianScalar !== 1.0}
            />
            <Row
              label="CME revenue"
              values={rows.map((r) => fmtRevM(r.cmeRev))}
            />
            <Row
              label="Advertising revenue"
              values={rows.map((r) => fmtRevM(r.adRev))}
            />
            <Row
              label="Total ARR"
              values={rows.map((r) => fmtRevM(r.totalARR))}
              bold
              border
            />

            {/* Valuation */}
            <SectionLabel label="Valuation" />
            <Row
              label="ARR multiple"
              values={rows.map((r) => {
                if (r.year === model.entryYear) return `${(entryValuationB * 1000 / entryRow.totalARR).toFixed(0)}×`;
                if (r.year === model.exitYear) return `${exitMultiple}×`;
                return "—";
              })}
              highlight={exitMultiple !== model.defaults.exitMultiple}
            />
            <Row
              label="Implied valuation"
              values={rows.map((r) => {
                if (r.year === model.entryYear) return `$${entryValuationB.toFixed(1)}B`;
                if (r.year === model.exitYear) return `$${exitValuationB.toFixed(1)}B`;
                return "—";
              })}
              bold
              border
            />
          </tbody>
        </table>
      </div>

      {/* ── Returns ── */}
      <div className="border-t border-ink/10 pt-8">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Returns — {model.entryYear}→{model.exitYear} ({holdYears}yr hold)
        </p>
        <div className="grid grid-cols-3 gap-6">
          <OutputCard
            label="Revenue at exit"
            value={fmtRevM(exitRow.totalARR)}
            sub={`${exitMultiple}× exit multiple`}
          />
          <OutputCard
            label="Implied valuation"
            value={`$${exitValuationB.toFixed(1)}B`}
            sub={`vs. $${entryValuationB}B entry`}
          />
          <OutputCard
            label="MoM / IRR"
            value={`${moic.toFixed(1)}× / ${(irr * 100).toFixed(0)}%`}
            sub={`${holdYears}-year hold`}
          />
        </div>
        <p className="font-mono text-xs text-muted mt-6">
          Entry: ${entryValuationB}B valuation ·{" "}
          {(entryValuationB * 1000 / entryRow.totalARR).toFixed(0)}× {model.entryYear} ARR ·{" "}
          MoM based on portfolio-level entry/exit
        </p>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

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
      <div className="flex items-start justify-between mb-1">
        <span className="font-mono text-xs text-muted tracking-wide uppercase">
          {label}
        </span>
        <span className="font-mono text-xs font-medium text-ink text-right ml-4 shrink-0">
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
        className="w-full mt-2"
      />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={99}
        className="font-mono text-xs text-muted tracking-widest uppercase pt-6 pb-1 text-left"
      >
        {label}
      </td>
    </tr>
  );
}

function Row({
  label,
  values,
  bold,
  border,
  highlight,
}: {
  label: string;
  values: string[];
  bold?: boolean;
  border?: boolean;
  highlight?: boolean;
}) {
  return (
    <tr
      className={`${border ? "border-t border-ink/10" : ""} ${
        bold ? "text-ink" : "text-ink/70"
      }`}
    >
      <td
        className={`text-left py-1.5 pr-2 font-mono ${
          bold ? "text-xs font-medium text-ink" : "text-xs text-muted"
        }`}
      >
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`pl-4 py-1.5 ${
            bold ? "font-medium text-ink" : "text-ink/70"
          } ${highlight && i > 0 ? "text-ink" : ""}`}
        >
          {v}
        </td>
      ))}
    </tr>
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
