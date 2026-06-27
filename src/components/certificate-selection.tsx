"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  PosterBank,
  PosterSettings,
  PosterTheme,
  PosterSize,
  POSTER_THEMES,
  POSTER_SIZES,
  getReturnTypeLabel,
  getPeriodLabel,
} from "@/lib/certificates-poster";

interface CertificateSelectionProps {
  banks: PosterBank[];

  settings: PosterSettings;

  updateDate: (date: string) => void;

  updateCertificate: (
    certificateId: string,
    selected: boolean
  ) => void;

  updateTheme: (
    theme: PosterTheme
  ) => void;

  updateSize: (
    size: PosterSize
  ) => void;

  downloadPoster: () => void;

  copyCaption: () => void;

  resetSettings: () => void;
}

export default function CertificateSelection({
  banks,
  settings,
  updateDate,
  updateCertificate,
  updateTheme,
  updateSize,
  downloadPoster,
  copyCaption,
  resetSettings,
}: CertificateSelectionProps) {

  return (

    <Card className="p-6">

      <div className="space-y-6">

        {/* ===========================
            Date
        =========================== */}

        <div>

          <Label className="mb-2 block">

            تاريخ المنشور

          </Label>

          <Input
            type="date"
            value={settings.issueDate}
            onChange={(e) =>
              updateDate(
                e.target.value
              )
            }
          />

        </div>

        {/* ===========================
            Certificates
        =========================== */}

        <div>

          <Label className="mb-4 block">

            اختر الشهادات

          </Label>

          <div className="space-y-4">

            {banks.map((bank) => (

              <Card
                key={bank.id}
                className="p-4"
              >

                {/* Bank Header */}

                <div className="mb-4 flex items-center gap-3">

                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={42}
                    height={42}
                  />

                  <div>

                    <h3 className="font-bold">

                      {bank.name}

                    </h3>

                    <p className="text-xs text-muted-foreground">

                      {bank.certificates.length} شهادة

                    </p>

                  </div>

                </div>

                {/* Certificates */}

                <div className="space-y-3">
                          {bank.certificates.map((certificate) => (

                    <label
                      key={certificate.id}
                      className="
                        flex
                        cursor-pointer
                        items-start
                        gap-3
                        rounded-xl
                        border
                        p-3
                        transition-colors
                        hover:bg-muted/40
                      "
                    >

                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4"
                        checked={certificate.enabled}
                        onChange={(e) =>
                          updateCertificate(
                            certificate.id,
                            e.target.checked
                          )
                        }
                      />

                      <div className="flex-1">

                        <div className="font-semibold">

                          {certificate.name}

                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">

                          <span>

                            💰 {certificate.interestRate}%

                          </span>

                          <span>

                            📈 {certificate.returnType === "fixed"
                              ? "ثابت"
                              : certificate.returnType === "graduated"
                              ? "متدرج"
                              : "متغير"}

                          </span>

                          <span>

                            💳 {certificate.type === "monthly"
                              ? "شهرى"
                              : certificate.type === "quarterly"
                              ? "ربع سنوى"
                              : "سنوى"}

                          </span>

                          <span>

                            ⏳ {certificate.duration / 12} سنوات

                          </span>

                        </div>

                      </div>

                    </label>

                  ))}

                </div>

              </Card>

            ))}

          </div>

        </div>
        {/* ===========================
            Theme
        =========================== */}

        <div>

          <Label className="mb-3 block">

            لون التصميم

          </Label>

          <div className="grid grid-cols-3 gap-2">

            {(Object.keys(
              POSTER_THEMES
            ) as PosterTheme[]).map(
              (theme) => (

                <Button
                  key={theme}
                  type="button"
                  variant={
                    settings.theme === theme
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateTheme(theme)
                  }
                >
                  {POSTER_THEMES[theme].name}
                </Button>

              )
            )}

          </div>

        </div>

        {/* ===========================
            Size
        =========================== */}

        <div>

          <Label className="mb-3 block">

            مقاس الصورة

          </Label>

          <div className="grid grid-cols-2 gap-2">

            {(Object.keys(
              POSTER_SIZES
            ) as PosterSize[]).map(
              (size) => (

                <Button
                  key={size}
                  type="button"
                  variant={
                    settings.size === size
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateSize(size)
                  }
                >
                  {POSTER_SIZES[size].label}
                </Button>

              )
            )}

          </div>

        </div>

        {/* ===========================
            Actions
        =========================== */}

        <div className="space-y-2 pt-4">

          <Button
            className="w-full"
            onClick={downloadPoster}
          >
            تحميل الصورة
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={copyCaption}
          >
            نسخ النص
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={resetSettings}
          >
            إعادة ضبط
          </Button>

        </div>

      </div>

    </Card>

  );

}        
