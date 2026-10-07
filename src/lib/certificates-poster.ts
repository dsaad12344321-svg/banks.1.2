export type PosterTheme =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red";

export type PosterSize =
  | "story"
  | "square"
  | "portrait45"
  | "portrait34"
  | "landscape";

export interface Certificate {
  id: string;
  name: string;
  duration: number;
  interestRate: number;
  minimumRate?: number;
  compound?: boolean;

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
  showPracticalExample: boolean;
}

/* ===========================================
   Practical Example
=========================================== */

export const PRACTICAL_EXAMPLE_AMOUNT = 100000;

function formatMoney(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDuration(duration: number): string {
  if (duration % 12 === 0) {
    return `${duration / 12} ${duration / 12 === 1 ? "سنة" : "سنوات"}`;
  }

  return `${duration} شهر`;
}

function getPeriodicLabel(
  type: Certificate["type"]
): string {
  switch (type) {
    case "monthly":
      return "الشهري";

    case "quarterly":
      return "ربع السنوي";

    case "annual":
      return "السنوي";

    default:
      return "";
  }
}

export function generatePracticalExample(
  certificate: PosterCertificate
): string {
  const amount = PRACTICAL_EXAMPLE_AMOUNT;
  const durationYears = certificate.duration / 12;

  /* =========================================
     Compound Certificate
  ========================================= */

  if (certificate.compound) {
    const years = certificate.duration / 12;
    const rate = certificate.interestRate / 100;

    const finalAmount =
      amount * Math.pow(1 + rate, years);

    const totalProfit =
      finalAmount - amount;

    return [
      
      `لو عملت شهادة بـ${formatMoney(
        amount
      )} جنيه، وبافتراض استمرار العائد عند ${certificate.interestRate}% سنويًا مع احتساب العائد بشكل تراكمي، سيصبح إجمالي المبلغ في نهاية ${formatDuration(
        certificate.duration
      )} حوالي ${formatMoney(
        finalAmount
      )} جنيه، بإجمالي أرباح حوالي ${formatMoney(
        totalProfit
      )} جنيه.`,
    ].join("\n");
  }

  /* =========================================
     Graduated Certificate
  ========================================= */

  if (
    certificate.returnType === "graduated" &&
    certificate.graduatedRates
  ) {
    const rates = [
      certificate.graduatedRates.year1,
      certificate.graduatedRates.year2,
      certificate.graduatedRates.year3,
    ];

    const yearlyProfits = rates.map(
      (rate) => amount * (rate / 100)
    );

    const totalProfit =
      yearlyProfits.reduce(
        (sum, profit) => sum + profit,
        0
      );

    const lines = [
      "مثال عملي",
      `لو عملت شهادة بـ${formatMoney(
        amount
      )} جنيه لمدة ${durationYears} سنوات:`,
    ];

    rates.forEach((rate, index) => {
      const yearlyProfit =
        yearlyProfits[index];

      if (certificate.type === "monthly") {
        const monthlyProfit =
          yearlyProfit / 12;

        lines.push(
          `السنة ${index + 1}: عائد ${rate}% = ${formatMoney(
            monthlyProfit
          )} جنيه شهريًا.`
        );
      } else if (
        certificate.type === "quarterly"
      ) {
        const quarterlyProfit =
          yearlyProfit / 4;

        lines.push(
          `السنة ${index + 1}: عائد ${rate}% = ${formatMoney(
            quarterlyProfit
          )} جنيه كل 3 أشهر.`
        );
      } else {
        lines.push(
          `السنة ${index + 1}: عائد ${rate}% = ${formatMoney(
            yearlyProfit
          )} جنيه سنويًا.`
        );
      }
    });

    lines.push(
      `إجمالي الأرباح خلال مدة الشهادة: ${formatMoney(
        totalProfit
      )} جنيه.`
    );

    return lines.join("\n");
  }

  /* =========================================
     Fixed / Variable Certificate
  ========================================= */

  const annualProfit =
    amount * (certificate.interestRate / 100);

  const totalProfit =
    annualProfit * durationYears;

  let periodicProfit = annualProfit;

  if (certificate.type === "monthly") {
    periodicProfit = annualProfit / 12;
  }

  if (certificate.type === "quarterly") {
    periodicProfit = annualProfit / 4;
  }

  const rateNote =
    certificate.returnType === "variable"
      ? "، وبافتراض بقاء العائد الحالي ثابتًا طوال المدة"
      : "";

  return [
    "مثال عملي",
    `لو عملت شهادة بـ${formatMoney(
      amount
    )} جنيه، هيكون العائد ${getPeriodicLabel(
      certificate.type
    )} ${formatMoney(
      periodicProfit
    )} جنيه${rateNote} لمدة ${formatDuration(
      certificate.duration
    )}، وإجمالي الأرباح خلال مدة الشهادة حوالي ${formatMoney(
      totalProfit
    )} جنيه.`,
  ].join("\n");
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
    title: "text-emerald-700",
    card: "bg-white",
    border: "border-emerald-200",
    shadow: "shadow-emerald-100",
  },

  blue: {
    name: "أزرق",
    background:
      "bg-gradient-to-br from-sky-50 to-blue-100",
    header:
      "bg-gradient-to-r from-sky-700 to-blue-600",
    title: "text-sky-700",
    card: "bg-white",
    border: "border-sky-200",
    shadow: "shadow-sky-100",
  },

  purple: {
    name: "بنفسجى",
    background:
      "bg-gradient-to-br from-violet-50 to-purple-100",
    header:
      "bg-gradient-to-r from-violet-700 to-purple-600",
    title: "text-violet-700",
    card: "bg-white",
    border: "border-violet-200",
    shadow: "shadow-violet-100",
  },

  orange: {
    name: "برتقالى",
    background:
      "bg-gradient-to-br from-orange-50 to-amber-100",
    header:
      "bg-gradient-to-r from-orange-700 to-amber-600",
    title: "text-orange-700",
    card: "bg-white",
    border: "border-orange-200",
    shadow: "shadow-orange-100",
  },

  red: {
    name: "أحمر",
    background:
      "bg-gradient-to-br from-red-50 to-rose-100",
    header:
      "bg-gradient-to-r from-red-700 to-rose-600",
    title: "text-red-700",
    card: "bg-white",
    border: "border-red-200",
    shadow: "shadow-red-100",
  },
} as const;

/* ===========================================
   Poster Sizes
=========================================== */

export const POSTER_SIZES = {
  story: {
    label: "Story 9:16 (1080×1920)",
    width: 1080,
    height: 1920,
    previewWidth: 420,
    previewHeight: 746.6667,
  },

  square: {
    label: "Square 1:1 (1080×1080)",
    width: 1080,
    height: 1080,
    previewWidth: 420,
    previewHeight: 420,
  },

  portrait45: {
    label: "Portrait 4:5 (1080×1350)",
    width: 1080,
    height: 1350,
    previewWidth: 420,
    previewHeight: 525,
  },

  portrait34: {
    label: "Portrait 3:4 (1080×1440)",
    width: 1080,
    height: 1440,
    previewWidth: 420,
    previewHeight: 560,
  },

  landscape: {
    label: "Landscape 1.91:1 (1200×627)",
    width: 1200,
    height: 627,
    previewWidth: 420,
    previewHeight: 219.45,
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
  type: Certificate["returnType"],
  compound = false
): string {
  if (compound) return "تراكمي";

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
  certificates: PosterCertificate[],
  showPracticalExample = false
): string {
  const lines: string[] = [];

  lines.push(
    "🏦 أفضل شهادات الادخار فى البنوك المصرية"
  );

  lines.push("");

  lines.push(
    `📅 تاريخ التحديث: ${date}`
  );

  lines.push("");

  certificates.forEach((item) => {
    lines.push(`🏦 ${item.bankName}`);
    lines.push(`📌 ${item.name}`);
    lines.push(`💰 العائد: ${item.interestRate}%`);

    if (item.minimumRate !== undefined) {
      lines.push(
        `🔻 الحد الأدنى للعائد: ${item.minimumRate}%`
      );
    }

    lines.push(
      `⏳ المدة: ${item.duration / 12} سنوات`
    );

    lines.push(
      `💳 ${
        item.compound
          ? "صرف العائد"
          : "دورية الصرف"
      }: ${
        item.compound
          ? "في نهاية المدة"
          : getPeriodLabel(item.type)
      }`
    );

    lines.push(
      `📊 نوع العائد: ${getReturnTypeLabel(
        item.returnType,
        item.compound
      )}`
    );

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

    if (showPracticalExample) {
      lines.push("");
      lines.push(
        generatePracticalExample(item)
      );
    }

    lines.push("");
  });

  lines.push(
    "احسب أرباح جميع شهادات الادخار مجانًا"
  );

  lines.push(
    "https://daleelakelbanky.vercel.app"
  );

  lines.push("");

  lines.push(
    "#أذون_الخزانة #البنك_المركزى_المصرى"
  );

  return lines.join("\n");
}

export type PosterThemeConfig =
  (typeof POSTER_THEMES)[PosterTheme];