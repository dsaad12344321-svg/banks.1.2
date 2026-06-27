import type { Metadata } from "next";

import { readFile } from "fs/promises";
import path from "path";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CertificatesPosterClient from "@/components/certificates-poster-client";

import {
  Bank,
} from "@/lib/certificates-poster";

import {
  SITE_URL,
  generateSEOMetadata,
} from "@/lib/seo";

/* ===========================================
   SEO
=========================================== */

export const metadata: Metadata =
  generateSEOMetadata({

    title:
      "منشئ منشورات شهادات الادخار",

    description:
      "أنشئ صور احترافية لشهادات الادخار فى البنوك المصرية جاهزة للنشر على فيسبوك وإنستجرام وتيك توك ويوتيوب.",

    keywords: [

      "شهادات الادخار",

      "أفضل شهادات الادخار",

      "منشئ منشورات",

      "شهادات البنك الأهلى",

      "شهادات بنك مصر",

      "شهادات CIB",

      "Poster Generator",

      "Egypt Certificates",

    ],

    ogType: "website",

    canonical:
      `${SITE_URL}/certificates-poster`,
  });

/* ===========================================
   Load Data
=========================================== */

async function getBankData(): Promise<Bank[]> {

  try {

    const filePath = path.join(

      process.cwd(),

      "src",

      "data",

      "bank-certificates.json"

    );

    const fileContents =
      await readFile(
        filePath,
        "utf8"
      );

    const data =
      JSON.parse(fileContents);

    return data.banks ?? [];

  } catch (error) {

    console.error(
      "Failed to load bank certificates",
      error
    );

    return [];
  }
}

/* ===========================================
   Page
=========================================== */

export default async function CertificatesPosterPage() {

  const banks =
    await getBankData();

  return (

    <div className="min-h-screen bg-background">

      <div className="container mx-auto max-w-7xl px-4 py-10">

        {/* Header */}

        <header className="mb-10 text-center">

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">

            منشئ منشورات شهادات الادخار

          </h1>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">

            أنشئ منشورات احترافية تضم
            أى عدد من شهادات الادخار
            من مختلف البنوك المصرية
            بجودة عالية جاهزة للنشر
            على فيسبوك وإنستجرام
            وتيك توك ويوتيوب.

          </p>

        </header>

        {/* Studio */}

        <Card className="border-2">

          <CardHeader className="text-center">

            <CardTitle className="text-2xl">

              Certificates Poster Studio

            </CardTitle>

            <CardDescription>

              اختر الشهادات التى تريدها،
              ثم قم بتنزيل الصورة
              أو نسخ النص الجاهز للنشر.

            </CardDescription>

          </CardHeader>

          <CardContent>

            <CertificatesPosterClient

              banks={banks}

            />

          </CardContent>

        </Card>

        {/* Features */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                حرية اختيار الشهادات

              </h3>

              <p className="text-sm leading-7 text-muted-foreground">

                يمكنك اختيار أى عدد من
                شهادات الادخار من
                مختلف البنوك المصرية
                داخل منشور واحد.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                عرض تلقائى

              </h3>

              <p className="text-sm leading-7 text-muted-foreground">

                يتم ترتيب الشهادات
                تلقائياً داخل التصميم
                حسب عدد الشهادات
                المختارة.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                تصدير بجودة عالية

              </h3>

              <p className="text-sm leading-7 text-muted-foreground">

                تحميل الصورة
                بدقة عالية مناسبة
                لجميع منصات التواصل
                الاجتماعى.

              </p>

            </CardContent>

          </Card>

        </section>

      </div>

    </div>

  );

}
