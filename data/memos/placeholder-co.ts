import { Memo } from "@/data/types";

const memo: Memo = {
  slug: "placeholder-co",
  company: "Placeholder Co.",
  tagline: "One line on what this company does.",
  date: "March 2026",
  sector: "B2B SaaS",
  stage: "Series A",
  website: "https://example.com",

  thesis: {
    market:
      "This market is large and underpenetrated. The incumbents are slow, the tailwinds are real, and the timing feels right. Placeholder text — replace with your actual market sizing and dynamics.",

    product:
      "The product solves a genuine pain point in a way that feels inevitable in hindsight. Key differentiators include [X, Y, Z]. Placeholder text — replace with your product thesis.",

    business:
      "Unit economics are compelling at early scale. NRR is strong, CAC payback is reasonable, and the gross margin profile supports a durable business. Placeholder text — replace with your business analysis.",

    team:
      "The founders have lived this problem. They bring domain depth, prior operator experience, and the kind of founder-market fit that makes the category hard to replicate. Placeholder text — replace with your team thesis.",
  },

  returns: {
    baseRevenue: 8,         // $8M ARR today
    entryValuation: 60,     // $60M entry valuation
    checkSize: 3,           // $3M check
    holdingPeriod: 5,       // 5-year hold

    defaults: {
      growthRate: 0.60,     // 60% YoY growth
      exitMargin: 0.20,     // 20% EBITDA margin at exit
      exitMultiple: 18,     // 18x EV/EBITDA
    },

    ranges: {
      growthRate: { min: 0.20, max: 1.00 },
      exitMargin: { min: 0.05, max: 0.40 },
      exitMultiple: { min: 8, max: 35 },
    },
  },
};

export default memo;
