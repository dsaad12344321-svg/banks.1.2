import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoanCalculatorClient from "@/components/loan-calculator-client";
import { SITE_URL, generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "حاسبة القروض",
  description:
    "احسب القسط الشهري للقروض وجدول السداد وإجمالي الفوائد بطريقة الرصيد المتناقص.",
  keywords: [
    "حاسبة القروض",
    "حساب القسط الشهري",
    "جدول سداد القرض",
    "القروض الشخصية",
    "القرض البنكي",
    "الرصيد المتناقص",
    "الفائدة المتناقصة",
    "EMI Calculator",
  ],
  ogType: "website",
  canonical: `${SITE_URL}/loans`,
});

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">

        <header className="text-center mb-10 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            حاسبة القروض
          </h1>

          <p className="text-muted-foreground text-lg">
            احسب القسط الشهري وإجمالي الفوائد وجدول السداد بالتفصيل
          </p>
        </header>

        <section className="mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                حاسبة القرض
              </CardTitle>

              <CardDescription>
                أدخل مبلغ القرض والفائدة والمدة لحساب جدول السداد
              </CardDescription>
            </CardHeader>

            <CardContent>
              <LoanCalculatorClient />
            </CardContent>
          </Card>
        </section>

        <section className="text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            <strong>طريقة الحساب:</strong> تعتمد الحاسبة على نظام
            الرصيد المتناقص (Reducing Balance).
          </p>

          <p>
            يتم احتساب الفائدة على الرصيد المتبقي كل شهر ثم توزيع
            القسط بين أصل القرض والفائدة.
          </p>

          <p>
            تعرض الحاسبة إجمالي الفوائد وإجمالي المدفوعات بالإضافة
            إلى جدول السداد الكامل.
          </p>
        </section>

      </div>
    </div>
  );
}
