import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DepositsAccordion from "@/components/deposits-accordion";
import DepositsCalculatorClient from "@/components/deposits-calculator-client";

import { SITE_URL, generateSEOMetadata } from "@/lib/seo";
import type { Bank } from "@/types/deposits";

export const metadata: Metadata = generateSEOMetadata({
  title: "ودائع البنوك المصرية",
  description:
    "احسب أرباح الودائع البنكية في مصر وقارن بين أفضل البنوك وأسعار الفائدة.",
  keywords: [
    "ودائع البنوك",
    "الودائع البنكية",
    "حاسبة الودائع",
    "ودائع بنك مصر",
    "أفضل وديعة",
  ],
  ogType: "website",
  canonical: `${SITE_URL}/deposits`,
});

async function getDepositsData(): Promise<{
  banks: Bank[];
  loading: boolean;
  error: string;
}> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "bank-deposits.json"
    );

    const fileContents = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return {
      banks: data.banks ?? [],
      loading: false,
      error: "",
    };
  } catch (error) {
    console.error("Failed to load deposits data:", error);

    return {
      banks: [],
      loading: false,
      error: "فشل تحميل بيانات الودائع",
    };
  }
}

export default async function DepositsPage() {
  const { banks, loading, error } = await getDepositsData();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">

        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2">
            ودائع البنوك المصرية
          </h1>

          <p className="text-muted-foreground text-lg">
            قارن أفضل الودائع البنكية واحسب أرباحك بسهولة
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            قائمة الودائع
          </h2>

          {loading ? (
            <p className="text-center">جاري التحميل...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <DepositsAccordion banks={banks} />
          )}
        </section>

        <section className="mb-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                حاسبة أرباح الودائع
              </CardTitle>
            </CardHeader>

            <CardContent>
              <DepositsCalculatorClient
                banks={banks}
                loading={loading}
                error={error}
              />
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}