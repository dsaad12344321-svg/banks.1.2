export type PosterTheme =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red";

export type PosterSize =
  | "post"
  | "story";

export interface Deposit {
  id: string;
  name: string;
  duration: number;
  interestRate: number;

returnType:
  | "fixed";



type:
  | "monthly"
  | "maturity"
  | "upfront";

  minAmount: number;

  description: string;

  features: string[];
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  deposits: Deposit[];
}

/* ===========================================
   Poster Models
=========================================== */

export interface PosterDeposit
  extends Deposit{

  bankId: string;

  bankName: string;

  bankLogo: string;

  enabled: boolean;
}

export interface PosterBank {

  id: string;

  name: string;

  logo: string;

  deposits: PosterDeposit[];
}

export interface PosterSettings {

  issueDate: string;

  theme: PosterTheme;

  size: PosterSize;

  banks: PosterBank[];
}

/* ===========================================
   Themes
=========================================== */

export const POSTER_THEMES = {

  green: {

    name: "أخضر",

    background:
      "bg-gradient-to-br from-emerald-50 to-green-100",

    header:
      "bg-gradient-to-r from-emerald-700 to-green-600",

    title:
      "text-emerald-700",

    card:
      "bg-white",

    border:
      "border-emerald-200",

    shadow:
      "shadow-emerald-100",
  },

  blue: {

    name: "أزرق",

    background:
      "bg-gradient-to-br from-sky-50 to-blue-100",

    header:
      "bg-gradient-to-r from-sky-700 to-blue-600",

    title:
      "text-sky-700",

    card:
      "bg-white",

    border:
      "border-sky-200",

    shadow:
      "shadow-sky-100",
  },

  purple: {

    name: "بنفسجى",

    background:
      "bg-gradient-to-br from-violet-50 to-purple-100",

    header:
      "bg-gradient-to-r from-violet-700 to-purple-600",

    title:
      "text-violet-700",

    card:
      "bg-white",

    border:
      "border-violet-200",

    shadow:
      "shadow-violet-100",
  },

  orange: {

    name: "برتقالى",

    background:
      "bg-gradient-to-br from-orange-50 to-amber-100",

    header:
      "bg-gradient-to-r from-orange-700 to-amber-600",

    title:
      "text-orange-700",

    card:
      "bg-white",

    border:
      "border-orange-200",

    shadow:
      "shadow-orange-100",
  },

  red: {

    name: "أحمر",

    background:
      "bg-gradient-to-br from-red-50 to-rose-100",

    header:
      "bg-gradient-to-r from-red-700 to-rose-600",

    title:
      "text-red-700",

    card:
      "bg-white",

    border:
      "border-red-200",

    shadow:
      "shadow-red-100",
  },

} as const;

/* ===========================================
   Poster Sizes
=========================================== */

export const POSTER_SIZES = {

  post: {

    label: "منشور",

    width: 420,

    minHeight: 560,
  },

  story: {

    label: "ستورى",

    width: 420,

    minHeight: 760,
  },

} as const;

/* ===========================================
   Data Helpers
=========================================== */

export function createPosterBanks(
  banks: Bank[]
): PosterBank[] {

  return banks.map((bank) => ({

    id: bank.id,

    name: bank.name,

    logo: bank.logo,

    deposits: bank.deposits.map((deposit) => ({

      ...deposit,

      bankId: bank.id,

      bankName: bank.name,

      bankLogo: bank.logo,

      enabled: false,

    })),

  }));

}

export function getEnabledDeposits(
  banks: PosterBank[]
): PosterDeposit[] {

  return banks.flatMap((bank) =>
    bank.deposits.filter(
      (deposit) => deposit.enabled
    )
  );

}
/* ===========================================
   Labels
=========================================== */

export function getReturnTypeLabel(
  type: Deposit["returnType"]
): string {
  switch (type) {
    case "fixed":
      return "ثابت";

    default:
      return "";
  }
}

export function getPeriodLabel(
  type: Deposit["type"]
): string {

  switch (type) {

    case "monthly":
      return "شهرى";

    case "maturity":
      return "آخر المدة";

    case "upfront":
      return "مقدم";

    default:
      return "";
  }

}

/* ===========================================
   Caption Generator
=========================================== */

export function generateCaption(
  date: string,
  deposits: PosterDeposit[]
): string {
  const lines: string[] = [];

  lines.push("🏦 🏦 أفضل الودائع فى البنوك المصرية");
  lines.push("");
  lines.push(`📅 تاريخ التحديث: ${date}`);
  lines.push("");

  deposits.forEach((item) => {
    lines.push(`🏦 ${item.bankName}`);
    lines.push(`📌 ${item.name}`);
    lines.push(`💰 العائد: ${item.interestRate}%`);
    lines.push(`⏳ المدة: ${item.duration / 12} سنوات`);
    lines.push(`💳 دورية الصرف: ${getPeriodLabel(item.type)}`);
    lines.push(`📊 نوع العائد: ${getReturnTypeLabel(item.returnType)}`);

    
    lines.push(
      `💵 الحد الأدنى: ${item.minAmount.toLocaleString(
        "ar-EG"
      )} جنيه`
    );

    lines.push("");
  });

  lines.push("احسب أرباح جميع الودائع مجانًا");
  lines.push("https://daleelakelbanky.vercel.app");

  return lines.join("\n");
}
export type PosterThemeConfig =
  (typeof POSTER_THEMES)[PosterTheme];
