export type PosterTheme =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red";

export type PosterSize =
  | "post"
  | "story";

export interface Certificate {
  id: string;
  name: string;
  duration: number;
  interestRate: number;

  returnType:
    | "fixed"
    | "variable"
    | "graduated";

  graduatedRates?: {
    year1: number;
    year2: number;
    year3: number;
  };

  type:
    | "monthly"
    | "quarterly"
    | "annual";

  minAmount: number;

  description: string;

  features: string[];
}

export interface Bank {
  id: string;
  name: string;
  logo: string;

  certificates: Certificate[];
}

/* ===========================================
   Poster Models
=========================================== */

export interface PosterCertificate
  extends Certificate {

  bankId: string;

  bankName: string;

  bankLogo: string;

  enabled: boolean;
}

export interface PosterBank {

  id: string;

  name: string;

  logo: string;

  certificates: PosterCertificate[];
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

    certificates:
      bank.certificates.map(
        (certificate) => ({

          ...certificate,

          bankId: bank.id,

          bankName: bank.name,

          bankLogo: bank.logo,

          enabled: false,
        })
      ),
  }));
}

export function getEnabledCertificates(
  banks: PosterBank[]
): PosterCertificate[] {

  return banks.flatMap((bank) =>
    bank.certificates.filter(
      (certificate) =>
        certificate.enabled
    )
  );
}
/* ===========================================
   Labels
=========================================== */

export function getReturnTypeLabel(
  type: Certificate["returnType"]
): string {
  switch (type) {
    case "fixed":
      return "ثابت";

    case "graduated":
      return "متدرج";

    case "variable":
      return "متغير";

    default:
      return "";
  }
}

export function getPeriodLabel(
  type: Certificate["type"]
): string {
  switch (type) {
    case "monthly":
      return "شهرى";

    case "quarterly":
      return "ربع سنوى";

    case "annual":
      return "سنوى";

    default:
      return "";
  }
}

/* ===========================================
   Caption Generator
=========================================== */

export function generateCaption(
  date: string,
  certificates: PosterCertificate[]
): string {
  const lines: string[] = [];

  lines.push("🏦 أفضل شهادات الادخار فى البنوك المصرية");
  lines.push("");
  lines.push(`📅 تاريخ التحديث: ${date}`);
  lines.push("");

  certificates.forEach((item) => {
    lines.push(`🏦 ${item.bankName}`);
    lines.push(`📌 ${item.name}`);
    lines.push(`💰 العائد: ${item.interestRate}%`);
    lines.push(`⏳ المدة: ${item.duration / 12} سنوات`);
    lines.push(`💳 دورية الصرف: ${getPeriodLabel(item.type)}`);
    lines.push(`📊 نوع العائد: ${getReturnTypeLabel(item.returnType)}`);

    if (
      item.returnType === "graduated" &&
      item.graduatedRates
    ) {
      lines.push(
        `السنة الأولى: ${item.graduatedRates.year1}%`
      );

      lines.push(
        `السنة الثانية: ${item.graduatedRates.year2}%`
      );

      lines.push(
        `السنة الثالثة: ${item.graduatedRates.year3}%`
      );
    }

    lines.push(
      `💵 الحد الأدنى: ${item.minAmount.toLocaleString(
        "ar-EG"
      )} جنيه`
    );

    lines.push("");
  });

  lines.push("احسب أرباح جميع شهادات الادخار مجانًا");
  lines.push("https://daleelakelbanky.vercel.app");

  return lines.join("\n");
}
export type PosterThemeConfig =
  (typeof POSTER_THEMES)[PosterTheme];
