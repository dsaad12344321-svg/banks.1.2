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

import DepositsPosterClient from "@/components/deposits-poster-client";

import {
  Bank,
} from "@/lib/deposits-poster";

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
      "منشئ منشورات الودائع",

    description:
      "أنشئ صور احترافية الودائع  فى البنوك المصرية جاهزة للنشر على فيسبوك وإنستجرام وتيك توك ويوتيوب.",

keywords: [
  "الودائع البنكية",
  "أفضل الودائع",
  "منشئ منشورات",
  "وديعة بنك مصر",
  "وديعة البنك الأهلي",
  "وديعة CIB",
  "Poster Generator",
  "Egypt Bank Deposits",
],

    ogType: "website",

    canonical:
      `${SITE_URL}/deposits-poster`,
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

      "bank-deposits.json"

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
      "Failed to load bank deposits",
      error
    );

    return [];
  }
}

/* ===========================================
   Page
=========================================== */

export default async function DepositsPosterPage(){

  const banks =
    await getBankData();

  return (

    <div className="min-h-screen bg-background">

      <div className="container mx-auto max-w-7xl px-4 py-10">

        {/* Header */}

        <header className="mb-10 text-center">

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">

           منشئ منشورات الودائع البنكية

          </h1>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">

                أنشئ منشورات احترافية تضم
                أي عدد من الودائع البنكية
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

              Deposits Poster Studio

            </CardTitle>

            <CardDescription>
                اختر الودائع التي تريدها،
                ثم قم بتنزيل الصورة
                أو نسخ النص الجاهز للنشر.

            </CardDescription>

          </CardHeader>

          <CardContent>

            <DepositsPosterClient

              banks={banks}

            />

          </CardContent>

        </Card>

        {/* Features */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <Card>

            <CardContent className="pt-6">

              <h3 className="mb-3 font-bold">

                    حرية اختيار الودائع
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">

                يمكنك اختيار أي عدد من
                الودائع البنكية من
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

               يتم ترتيب الودائع
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
