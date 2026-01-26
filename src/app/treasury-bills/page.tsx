import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TreasuryBillsCalculatorClient from "@/components/treasury-bills-calculator-client";
import { SITE_URL, generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "حاسبة أذون الخزانة المصرية",
  description:
    "احسب أرباح أذون الخزانة المصرية بدقة. تعرّف على صافي الربح بعد الضرائب للأذون لمدة 3، 6، 9 شهور أو سنة.",
  keywords: [
    "حاسبة أذون الخزانة",
    "أذون الخزانة المصرية",
    "حساب أرباح أذون الخزانة",
    "العائد على أذون الخزانة",
    "الاستثمار في أذون الخزانة",
    "سعر العائد",
    "الضرائب على أذون الخزانة",
  ],
  ogType: "website",
  canonical: `${SITE_URL}/treasury-bills`,
});

export default function TreasuryBillsPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            حاسبة أذون الخزانة المصرية
          </h1>
          <p className="text-muted-foreground text-lg">
            احسب صافي أرباحك من أذون الخزانة مع خصم الضريبة بسهولة ووضوح
          </p>
        </header>

        {/* Calculator */}
        <section className="mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                حاسبة أرباح أذون الخزانة
              </CardTitle>
              <CardDescription>
                الأرباح تُصرف مقدّمًا، والضرائب تُخصم في نهاية المدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreasuryBillsCalculatorClient />
            </CardContent>
          </Card>
        </section>

        {/* Explanation */}
        <section className="text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            <strong>معلومة مهمة:</strong> أذون الخزانة لا تصرف فائدة دورية،
            ولكن يتم شراؤها بقيمة أقل من قيمتها الاسمية، ويتم صرف كامل
            المبلغ في نهاية المدة.
          </p>
          <p>
            يتم احتساب ضريبة قدرها <strong>20%</strong> على الأرباح
            المصروفة مقدّمًا، ويتم خصمها عند الاستحقاق.
          </p>
        </section>

      </div>
    </div>
  );
}
