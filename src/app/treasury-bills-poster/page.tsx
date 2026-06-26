import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TreasuryBillsPosterClient from "@/components/treasury-bills-poster-client";

import {
  SITE_URL,
  generateSEOMetadata,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "منشئ منشورات أذون الخزانة المصرية",

  description:
    "أنشئ صور احترافية لنتائج مزادات أذون الخزانة المصرية جاهزة للنشر على فيسبوك، تيك توك، وإنستجرام ويوتيوب.",

  keywords: [
    "أذون الخزانة المصرية",
    "نتائج مزاد أذون الخزانة",
    "العائد الأسبوعى",
    "البنك المركزى",
    "منشئ منشورات",
    "Treasury Bills",
    "Egypt Treasury Bills",
    "Poster Generator",
  ],

  ogType: "website",

  canonical: `${SITE_URL}/treasury-bills-poster`,
});

export default function TreasuryBillsPosterPage() {
  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto max-w-7xl px-4 py-10">

        {/* Header */}

        <header className="mb-10 text-center">

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">

            منشئ منشورات أذون الخزانة المصرية

          </h1>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">

            أنشئ صورة احترافية لنتائج مزادات أذون الخزانة المصرية
            بجودة عالية وجاهزة للنشر على فيسبوك، تيك توك،
            يوتيوب وإنستجرام.

          </p>

        </header>

        {/* Studio */}

        <Card className="border-2">

          <CardHeader className="text-center">

            <CardTitle className="text-2xl">

              Treasury Bills Poster Studio

            </CardTitle>

            <CardDescription>

              قم بإدخال بيانات المزاد ثم قم بتنزيل الصورة
              أو نسخ النص الجاهز للنشر.

            </CardDescription>

          </CardHeader>

          <CardContent>

            <TreasuryBillsPosterClient />

          </CardContent>

        </Card>

        {/* Information */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                عائد مستقل لكل أجل

              </h3>

              <p className="text-sm text-muted-foreground leading-7">

                يمكنك إدخال سعر العائد الخاص بكل أجل
                بشكل منفصل طبقًا لنتائج البنك المركزى.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                إظهار أو إخفاء الأجل

              </h3>

              <p className="text-sm text-muted-foreground leading-7">

                إذا لم يتم طرح أحد الآجال فى المزاد،
                يمكنك إخفاؤه بضغطة واحدة.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                تصدير بجودة عالية

              </h3>

              <p className="text-sm text-muted-foreground leading-7">

                يتم تصدير الصورة بدقة عالية
                مناسبة للنشر على جميع منصات التواصل
                الاجتماعى.

              </p>

            </CardContent>

          </Card>

        </section>

      </div>

    </div>
  );
}
