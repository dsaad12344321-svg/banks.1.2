"use client";

import Image from "next/image";

import {
  PosterCertificate,
  PosterThemeConfig,
  getPeriodLabel,
  getReturnTypeLabel,
} from "@/lib/certificates-poster";

interface CertificateCardProps {
  certificate: PosterCertificate;

  theme: PosterThemeConfig;

  showDescription?: boolean;
}

export default function CertificateCard({
  certificate,
  theme,
  showDescription = false,
}: CertificateCardProps) {
  const isGraduated =
    certificate.returnType === "graduated" &&
    certificate.graduatedRates;

  return (
    <div
      className={`
        rounded-2xl
        border-2
        p-5
        transition-all
        ${theme.card}
        ${theme.border}
        ${theme.shadow}
      `}
    >
      {/* ===========================
          Bank
      =========================== */}

      <div className="mb-5 flex flex-col items-center text-center">

        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">

          <Image
            src={certificate.bankLogo}
            alt={certificate.bankName}
            width={44}
            height={44}
          />

        </div>

        <h3
          className={`text-lg font-bold ${theme.title}`}
        >
          {certificate.bankName}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {certificate.name}
        </p>

      </div>

      {/* ===========================
          Interest
      =========================== */}

      <div className="mb-5 text-center">

        <div
          className={`text-4xl font-extrabold ${theme.title}`}
        >
          {certificate.interestRate}%
        </div>

        <div className="mt-1 text-xs text-muted-foreground">
          سعر العائد
        </div>

      </div>

      <div className="my-5 border-t" />

      {/* ===========================
          Details
      =========================== */}

      <div className="space-y-3 text-sm">

        <div className="flex items-center justify-between">

          <span>
            ⏳ المدة
          </span>

          <strong>
            {certificate.duration / 12} سنوات
          </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            💳 دورية الصرف
          </span>

          <strong>
            {getPeriodLabel(certificate.type)}
          </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            📈 نوع العائد
          </span>

          <strong>
            {getReturnTypeLabel(
              certificate.returnType
            )}
          </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            💰 الحد الأدنى
          </span>

          <strong>
            {certificate.minAmount.toLocaleString(
              "ar-EG"
            )}{" "}
            جنيه
          </strong>

        </div>

      </div>
            {/* ===========================
          Graduated Rates
      =========================== */}

      {isGraduated && (
        <>
          <div className="my-5 border-t" />

          <div className="space-y-2">

            <h4
              className={`text-center text-sm font-bold ${theme.title}`}
            >
              جدول العائد المتدرج
            </h4>

            <div className="rounded-xl bg-muted/40 p-3">

              <div className="flex items-center justify-between py-1">

                <span>السنة الأولى</span>

                <strong>
                  {certificate.graduatedRates!.year1}%
                </strong>

              </div>

              <div className="border-t my-2" />

              <div className="flex items-center justify-between py-1">

                <span>السنة الثانية</span>

                <strong>
                  {certificate.graduatedRates!.year2}%
                </strong>

              </div>

              <div className="border-t my-2" />

              <div className="flex items-center justify-between py-1">

                <span>السنة الثالثة</span>

                <strong>
                  {certificate.graduatedRates!.year3}%
                </strong>

              </div>

            </div>

          </div>
        </>
      )}

      {/* ===========================
          Description
      =========================== */}

      {showDescription && (
        <>
          <div className="my-5 border-t" />

          <div>

            <h4
              className={`mb-2 text-sm font-bold ${theme.title}`}
            >
              نبذة
            </h4>

            <p className="text-xs leading-6 text-muted-foreground">
              {certificate.description}
            </p>

          </div>
        </>
      )}

    </div>
  );
}
