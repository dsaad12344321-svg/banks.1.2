/* ==========================================================
   Treasury Bills Engine
   Shared between:
   - Treasury Bills Calculator
   - Treasury Bills Poster Studio
========================================================== */

export const TAX_RATE = 0.20;

export const DEFAULT_INVESTMENT_AMOUNT = 25000;

export type BillStatus =
  | "available"
  | "hidden"
  | "closed";

export interface TreasuryBillInput {
  days: number;
  rate: number;
  enabled: boolean;
  status: BillStatus;
}

export interface TreasuryBillResult {
  days: number;
  rate: number;
  amount: number;

  poundValue: number;

  actualDeduction: number;

  upfrontProfit: number;

  tax: number;

  netProfit: number;

  principalMinusTax: number;

  netProfitRate: number;

  actualNetProfitRate: number;
}

export interface PosterSettings {
  issueDate: string;

  theme: PosterTheme;

  size: PosterSize;

  bills: TreasuryBillInput[];
}

/* ==========================================================
   Default Bills
========================================================== */

export const DEFAULT_BILLS: TreasuryBillInput[] = [
  {
    days: 364,
    rate: 0,
    enabled: true,
    status: "available",
  },
  {
    days: 273,
    rate: 0,
    enabled: false,
    status: "hidden",
  },
  {
    days: 182,
    rate: 0,
    enabled: true,
    status: "available",
  },
  {
    days: 91,
    rate: 0,
    enabled: false,
    status: "hidden",
  },
];

/* ==========================================================
   Poster Themes
========================================================== */

export const POSTER_THEMES = {
  green: {
    name: "أخضر",

    background:
      "bg-gradient-to-br from-emerald-50 via-white to-emerald-100",

    header:
      "bg-emerald-600",

    title:
      "text-emerald-700",

    accent:
      "text-emerald-600",

    card:
      "bg-white",

    border:
      "border-emerald-500",

    shadow:
      "shadow-emerald-300/40",
  },

  blue: {
    name: "أزرق",

    background:
      "bg-gradient-to-br from-sky-50 via-white to-sky-100",

    header:
      "bg-sky-600",

    title:
      "text-sky-700",

    accent:
      "text-sky-600",

    card:
      "bg-white",

    border:
      "border-sky-500",

    shadow:
      "shadow-sky-300/40",
  },

  dark: {
    name: "داكن",

    background:
      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950",

    header:
      "bg-slate-950",

    title:
      "text-white",

    accent:
      "text-emerald-400",

    card:
      "bg-slate-800",

    border:
      "border-slate-600",

    shadow:
      "shadow-black/60",
  },
} as const;

export type PosterTheme = keyof typeof POSTER_THEMES;

/* ==========================================================
   Export Sizes
========================================================== */

export const POSTER_SIZES = {
  post: {
    label: "Facebook / Instagram",

    width: 1080,

    height: 1350,
  },

  story: {
    label: "TikTok / Shorts",

    width: 1080,

    height: 1920,
  },
} as const;

export type PosterSize = keyof typeof POSTER_SIZES;

/* ==========================================================
   Helpers
========================================================== */

export function sortBills(
  bills: TreasuryBillInput[]
) {
  return [...bills].sort(
    (a, b) => b.days - a.days
  );
}

export function getVisibleBills(
  bills: TreasuryBillInput[]
) {
  return sortBills(bills).filter(
    (bill) =>
      bill.enabled &&
      bill.status === "available"
  );
}

export function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(
  value: number
) {
  return `${value.toFixed(2)}%`;
}

export function formatDate(
  date: string
) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "ar-EG"
  );
}
/* ==========================================================
   Calculation Engine
========================================================== */

export function calculateTreasuryBill(
  amount: number,
  days: number,
  rate: number
): TreasuryBillResult {
  const interestRate = rate / 100;

  const poundValue =
    1 / (((days / 365) * interestRate) + 1);

  const actualDeduction = amount * poundValue;

  const upfrontProfit =
    amount - actualDeduction;

  const tax =
    upfrontProfit * TAX_RATE;

  const netProfit =
    upfrontProfit - tax;

  const principalMinusTax =
    amount - tax;

  const netProfitRate =
    (netProfit / amount) * 100;

  const actualNetProfitRate =
    (netProfit / actualDeduction) * 100;

  return {
    days,
    rate,
    amount,

    poundValue,

    actualDeduction,

    upfrontProfit,

    tax,

    netProfit,

    principalMinusTax,

    netProfitRate,

    actualNetProfitRate,
  };
}

/* ==========================================================
   Multiple Bills Calculator
========================================================== */

export function calculateBills(
  amount: number,
  bills: TreasuryBillInput[]
): TreasuryBillResult[] {
  return getVisibleBills(bills).map((bill) =>
    calculateTreasuryBill(
      amount,
      bill.days,
      bill.rate
    )
  );
}

/* ==========================================================
   Caption Generator
========================================================== */

export function generateCaption(
  issueDate: string,
  bills: TreasuryBillResult[]
) {
  const lines: string[] = [];

  lines.push("📢 نتائج أذون الخزانة المصرية");

  lines.push("");

  lines.push(
    `📅 تاريخ الإصدار : ${formatDate(issueDate)}`
  );

  lines.push("");

  bills.forEach((bill) => {
    lines.push(
      `▪ ${bill.days} يوم`
    );

    lines.push(
      `العائد : ${formatPercent(
        bill.rate
      )}`
    );

    lines.push(
      `صافى الربح : ${formatCurrency(
        bill.netProfit
      )} جنيه`
    );

    lines.push("");
  });

  lines.push(
    "💰 جميع الحسابات بعد خصم الضريبة."
  );

  lines.push("");

  lines.push(
    "🌐 https://daleelakelbanky.vercel.app"
  );

  return lines.join("\n");
}

/* ==========================================================
   Factory Helpers
========================================================== */

export function createDefaultBills(): TreasuryBillInput[] {
  return DEFAULT_BILLS.map((bill) => ({
    ...bill,
  }));
}

export function updateBillRate(
  bills: TreasuryBillInput[],
  days: number,
  rate: number
) {
  return bills.map((bill) =>
    bill.days === days
      ? {
          ...bill,
          rate,
        }
      : bill
  );
}

export function updateBillEnabled(
  bills: TreasuryBillInput[],
  days: number,
  enabled: boolean
) {
  return bills.map((bill) =>
    bill.days === days
      ? {
          ...bill,
          enabled,
          status: enabled
            ? "available"
            : "hidden",
        }
      : bill
  );
}

export function resetBills() {
  return createDefaultBills();
}
