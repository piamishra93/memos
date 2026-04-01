export interface Memo {
  slug: string;
  company: string;
  tagline: string;
  date: string; // e.g. "March 2026"
  sector: string;
  stage: string; // e.g. "Series A", "Seed"
  website?: string;

  thesis: {
    market: string;
    product: string;
    business: string;
    team: string;
  };

  // Simple single-period model (used for placeholder)
  returns?: {
    baseRevenue: number;
    entryValuation: number;
    checkSize: number;
    holdingPeriod: number;
    defaults: {
      growthRate: number;
      exitMargin: number;
      exitMultiple: number;
    };
    ranges: {
      growthRate: { min: number; max: number };
      exitMargin: { min: number; max: number };
      exitMultiple: { min: number; max: number };
    };
  };

  // Rich multi-year P&L model
  pnlModel?: PnLModel;

  // Structured memo content (replaces thesis strings when present)
  richContent?: RichMemoContent;
}

export interface RichMemoContent {
  thesis: {
    overview: string;
    growthPath: string;
    whyNow: string;
    keyStats: { label: string; value: string }[];
  };
  market: {
    samTopDown: string;
    samBottomUp: string;
    tamTopDown: string;
    tamBottomUp: string;
    tailwinds: string[];
    competition: { category: string; competitors: string; reasonToWin: string }[];
    gtm: string;
  };
  product: {
    overview: string;
    valueProps: { title: string; description: string }[];
    moats: string[];
  };
  team: {
    overview: string;
    members: { name: string; role: string; description: string; linkedin?: string }[];
    footnote: string;
  };
  risks: { category: string; risk: string; mitigant: string }[];
}

export interface PnLModel {
  entryYear: number;
  exitYear: number;
  entryValuationB: number; // entry valuation in $B

  // Base-year (2025) actuals
  base: {
    licensedPhysicians: number;
    otherMPs: number;
    consultsMM: number;      // consults in millions
    dollarPerConsult: number;
    cmePerPhysician: number; // annual CME revenue per licensed physician
    adsPerPhysician: number; // annual ad revenue per provider (licensed + other)
  };

  // Growth schedules from base year (one entry per projected year)
  // e.g. for years [2026, 2027, 2028]
  projectedYears: number[];
  physicianGrowthRates: number[];    // e.g. [0.40, 0.20, 0.10]
  otherMPGrowthRates: number[];      // e.g. [1.00, 0.50, 0.25]
  consultGrowthMultiples: number[];  // e.g. [8, 5, 2]   (× prior year)
  consultPricingGrowth: number[];    // e.g. [1.0, 0.5, 0.25] (% growth on $/consult)

  defaults: {
    physicianPenetration: number; // scalar on growth rates (1.0 = base)
    consultGrowth: number;        // scalar on consult multiples (1.0 = base)
    exitMultiple: number;         // ARR multiple at exit
  };
  ranges: {
    physicianPenetration: { min: number; max: number };
    consultGrowth: { min: number; max: number };
    exitMultiple: { min: number; max: number };
  };
}
