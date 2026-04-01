import { Memo } from "@/data/types";

const memo: Memo = {
  slug: "open-evidence",
  company: "OpenEvidence",
  tagline: "The AI layer for clinical decision-making.",
  date: "April 2026",
  sector: "Healthcare AI",
  stage: "Growth",
  website: "https://openevidence.com",

  thesis: {
    market:
      "There are 1.1M licensed physicians in the US alone, each conducting thousands of consultations a year. Clinical decision support is a massive, underserved market — historically dominated by slow, expensive EHR modules. The shift to AI-native tools is happening now, and the penetration curve is steep: OE already has 755K licensed physicians on platform as of 2025.",

    product:
      "OpenEvidence is a real-time AI assistant for clinical consultations — essentially a co-pilot that synthesises the latest medical evidence at the point of care. The product has strong workflow integration, and the engagement signal is compelling: consults per physician are growing fast as OE becomes habitual rather than occasional. Pricing deepens with usage.",

    business:
      "Revenue has three legs: consult-based subscription (scales with volume × pricing), CME monetisation (flat per licensed physician), and pharmaceutical advertising (flat per provider, but growing with the network). The consult leg is the high-growth engine — it compounds as both physician count and consults/physician grow simultaneously. Gross margins should be high; the cost base is primarily model inference and a small clinical team.",

    team:
      "Placeholder — add team thesis here. Focus on founder-market fit, clinical credibility, and prior distribution experience.",
  },

  richContent: {
    thesis: {
      overview:
        "OpenEvidence is using PLG as a wedge in a historically slow moving market. Their free, high-trust, daily-use clinician Q&A product builds an organic flywheel that makes the enterprise motion a follow-on conversation, not a long sell. Ad-supported Q&A is the starting point; the ultimate goal and bet is deeper workflow penetration (Notion-like consumer-love → bring to work → workflow expansion dynamic).",
      growthPath:
        "Pair the Q&A product (external source of truth) with an AI scribe (internal source of truth) to create a complete clinical knowledge layer — a system of record physicians actually want to use — and capture part of the ~$20K / physician / year spent on legacy EHRs.",
      whyNow:
        "LLMs crossed a threshold where real-time, high accuracy, clinical reasoning is possible. Healthcare has been hard to disrupt because need for accurate data, and high trust, was paramount — this protected incumbents. OE's early traction and recent enterprise deployments suggest a credible break-out driven by product innovation and bottoms up distribution.",
      team:
        "CEO Daniel Nadler is a repeat founder. His prior company, Kensho, was an AI tool for financial services that sold to S&P. Daniel has intentionally built a technically rigorous, academically oriented execution culture — which has been crucial for OpenEvidence credibility.",
      keyStats: [
        { label: "Consults / day", value: "~1M" },
        { label: "US physician penetration", value: "~40%" },
        { label: "FTE on $50M+ ARR", value: "<50" },
        { label: "Base case MoM", value: "4.0x" },
      ],
    },

    market: {
      samTopDown: [
        {
          label: "Existing budget",
          blocks: [
            { type: "text", text: "OpenEvidence's current product suite draws from existing physician budgets for continuing education — courses, conferences, journal subscriptions, and clinical databases." },
            { type: "text", text: "This represents about **$6B** of spend, growing ~11% over next 5 years." },
          ],
        },
        {
          label: "Pharma advertising",
          blocks: [
            { type: "text", text: "OpenEvidence also monetizes off of ad spend from pharmaceutical companies. This budget — US only — is **$15B+**." },
          ],
        },
      ],
      samBottomUp: [
        {
          label: "US physician base",
          blocks: [
            { type: "text", text: "There are just over 1M licensed physicians in the US. As of mid-2025, ~40% were active on the OE Q&A platform." },
          ],
        },
      ],
      tamTopDown: [
        {
          label: "EHR displacement",
          blocks: [
            { type: "text", text: "As OE deepens workflow penetration via OpenEvidence Visits (notes) and Doctor Dialer (telemedicine), it will expand $ per physician toward the ~$20K/year currently captured by EHR vendors." },
          ],
        },
        {
          label: "Malpractice upside",
          blocks: [
            { type: "text", text: "Net-new spend could eventually be unlocked if OE demonstrably reduces misdiagnoses and associated malpractice liability." },
          ],
        },
      ],
      tamBottomUp: [
        {
          label: "Global & adjacent",
          blocks: [
            { type: "text", text: "Clear interest from UK and European physicians — ~12M physicians globally represents a 12x expansion on the current US addressable base." },
            { type: "text", text: "Adjacent user groups add further scale: nurses, PAs, medical students, pharmacists. There are ~5M nurses in the US alone." },
          ],
        },
      ],
      tailwinds: [
        "Physicians are in a capacity-constrained labor pool with acute time pressure — any tool that compresses the time-to-answer on a clinical question has immediate, compounding value.",
        "Medical knowledge is updating faster than ever: digitisation of health records, device-driven data collection, accelerated publishing cycles, and AI-led research are all compressing the half-life of clinical training.",
      ],
      competition: [
        {
          category: "Subscription databases",
          competitors: "UpToDate, Dynamed, Medscape, Amboss",
          reasonToWin: "More robust, continuously updated data source — legacy tools are slow to incorporate new evidence.",
        },
        {
          category: "CME ($5K / physician)",
          competitors: "Academic conferences, UCSF / institutional courses",
          reasonToWin: "OE offers productised, on-demand learning paths — no travel, no scheduling friction.",
        },
        {
          category: "Frontier labs",
          competitors: "Claude for Life Sciences, ChatGPT for Healthcare",
          reasonToWin: "Early research shows smaller, highly-specialised models trained on in-domain medical data outperform larger general models on clinical accuracy.",
        },
        {
          category: "AI-native tools",
          competitors: "Abridge",
          reasonToWin: "Positioned as the clinical co-pilot, not the transcriber — broader bottoms-up affinity and a more natural expansion motion into workflow ownership.",
        },
      ],
      gtm:
        "OE benefits from a rare PLG motion inside healthcare — it wins outside the 'office' context, bypassing the multi-year enterprise cycles that stall most health-tech companies. It also offers an unusually strong value proposition for smaller practices, providing high-leverage, low-cost end-to-end workflows that larger systems charge a premium for.",
    },

    product: {
      overview:
        "OpenEvidence is a knowledge base purpose-built for medical professionals — trained exclusively on highly verified, continuously updated clinical data. Beyond the flagship Q&A product, it has launched a patient visit transcription tool and a telemedicine facilitation product, extending its surface area across the core physician workflow.",
      valueProps: [
        {
          title: "Specialised repository",
          description:
            "The cost of being wrong for a physician is asymmetrically high. A specialised, trustworthy AI tool — with robust sourcing and accurate citations — is not a nice-to-have; it is the product.",
        },
        {
          title: "Breadth on demand",
          description:
            "Doctors encounter cases they may have seen once in a career, if ever. OE offers a single source of truth across all potential diagnoses, reducing reliance on prior exposure or memory.",
        },
        {
          title: "Dynamic knowledge base",
          description:
            "The body of medical knowledge is updating at an accelerating pace. OE's training set is continuously refreshed — the product gets more valuable as medical science advances.",
        },
        {
          title: "Expanding workflow surface",
          description:
            "The Q&A product is the wedge. Note-taking and telemedicine products extend OE into the full patient encounter — creating stickiness that subscription databases can never replicate.",
        },
      ],
      moats: [
        "OE primarily trains on guidelines and studies from institutions like the New England Journal of Medicine and the National Comprehensive Cancer Network — non-profits that optimise for trust and selectivity, not revenue.",
        "Other model companies have attempted to access the same data; these institutions have historically preferred OE's mission-aligned positioning.",
        "Word of mouth among physicians is a meaningful distribution advantage — a peer recommendation from a trusted colleague carries more weight in this community than any ad campaign.",
      ],
    },

    team: {
      overview:
        "A lean team with unusually relevant expertise — built for credibility in a trust-sensitive market.",
      members: [
        {
          name: "Daniel Nadler",
          role: "CEO",
          description:
            "PhD, Harvard (Political Economy). Second-time founder — his first company, Kensho, applied AI to financial services and was acquired by S&P Global. Has intentionally built a technically rigorous, academically oriented culture at OE, which is central to the product's credibility.",
          linkedin: "https://www.linkedin.com/in/danielnadler",
        },
        {
          name: "Zach Ziegler",
          role: "CTO",
          description:
            "PhD, Harvard (Machine Learning). Deep technical pedigree in the domain — brings the ML depth required to maintain OpenEvidence's edge in specialised model performance.",
          linkedin: "https://www.linkedin.com/in/zachary-ziegler-1328a6126/",
        },
      ],
      footnote: "<50 FTE on a $50M+ ARR base.",
    },

    risks: [
      {
        category: "Product",
        risk:
          "OE's value proposition is anchored in trust. Any meaningful degradation in data quality or sourcing — or perception thereof — creates a real risk of a zero outcome. The ad-based business model requires careful calibration to avoid conflicts that undermine clinical credibility.",
        mitigant:
          "The specialised medical dataset is the underpinning of every product they build and their primary differentiator. Maintaining data quality is not a feature priority — it is the company.",
      },
      {
        category: "Competition",
        risk:
          "If frontier labs invest heavily in medical training, they may not achieve 100% accuracy but could get close enough that general-purpose tools become acceptable substitutes — particularly if priced aggressively or bundled with existing enterprise contracts.",
        mitigant:
          "By the time lab datasets are competitive, OE will be embedded in physician workflows and hospital systems at a depth that makes switching costs prohibitive. Epic integration at Mount Sinai is the early proof point.",
      },
      {
        category: "GTM",
        risk:
          "A PLG-first motion could leave OE structurally stuck in the lower market. Winning enterprise health systems requires a different sales muscle — longer cycles, procurement processes, clinical IT stakeholders.",
        mitigant:
          "PLG + competitive dynamics position OE as the default for private practices and smaller hospitals — a segment that is growing as AI reduces overhead for independent operators. Mount Sinai is the wedge into larger institutions.",
      },
      {
        category: "Execution",
        risk:
          "The company is running several parallel growth bets (Q&A, notes, telemedicine) across different GTM motions. Highly regulated environments demand operational rigour that is hard to sustain under pressure from labs to move faster.",
        mitigant:
          "Nadler's prior experience building AI for financial services — another high-stakes, regulated vertical — is directly applicable. The team understands what it means to operate carefully in a domain where errors have consequences.",
      },
    ],
  },

  pnlModel: {
    entryYear: 2026,
    exitYear: 2028,
    entryValuationB: 12,

    // 2025 base actuals
    base: {
      licensedPhysicians: 755000,
      otherMPs: 100000,
      consultsMM: 25,          // 25M consults
      dollarPerConsult: 0.50,
      cmePerPhysician: 50,
      adsPerPhysician: 116.28,
    },

    projectedYears: [2026, 2027, 2028],

    // Base-case physician growth: +40%, +20%, +10%
    physicianGrowthRates: [0.40, 0.20, 0.10],
    // Other MP growth: +100%, +50%, +25%
    otherMPGrowthRates: [1.00, 0.50, 0.25],
    // Consult volume multiplier each year (× prior year): 8×, 5×, 2×
    consultGrowthMultiples: [8, 5, 2],
    // $/consult pricing growth: +100%, +50%, +25%
    consultPricingGrowth: [1.00, 0.50, 0.25],

    defaults: {
      physicianPenetration: 1.0, // 1.0 = base case
      consultGrowth: 1.0,        // 1.0 = base case
      exitMultiple: 12,
    },
    ranges: {
      physicianPenetration: { min: 0.5, max: 1.5 },
      consultGrowth: { min: 0.4, max: 2.0 },
      exitMultiple: { min: 6, max: 20 },
    },
  },
};

export default memo;
