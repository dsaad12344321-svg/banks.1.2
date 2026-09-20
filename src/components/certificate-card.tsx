"use client";

import Image from "next/image";

import {
  PosterCertificate,
  PosterThemeConfig,
  getPeriodLabel,
  getReturnTypeLabel,
} from "@/lib/certificates-poster";

import {
  getPosterLayout,
  PosterLayoutSize,
} from "@/lib/poster-layout";

interface CertificateCardProps {
  certificate: PosterCertificate;
  theme: PosterThemeConfig;
  showDescription?: boolean;
  size?: PosterLayoutSize;
}

export default function CertificateCard({
  certificate,
  theme,
  showDescription = false,
  size = "story",
}: CertificateCardProps) {
  const layout = getPosterLayout(size);

  const isGraduated =
    certificate.returnType === "graduated" &&
    certificate.graduatedRates;

  return (
    <div
      className={`
        border-2
        transition-all
        ${theme.card}
        ${theme.border}
        ${theme.shadow}
      `}
      style={{
        padding: layout.cardPadding,
        borderRadius: layout.cardRadius,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{
          marginBottom: layout.cardBankBottom,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-white shadow"
          style={{
            width: layout.bankLogoBox,
            height: layout.bankLogoBox,
            marginBottom: layout.bankLogoBottom,
          }}
        >
          <Image
            src={certificate.bankLogo}
            alt={certificate.bankName}
            width={layout.bankLogo}
            height={layout.bankLogo}
          />
        </div>

        <h3
          className={`font-bold ${theme.title}`}
          style={{
            fontSize: layout.bankName,
            lineHeight: 1.25,
          }}
        >
          {certificate.bankName}
        </h3>

        <p
          className="text-muted-foreground"
          style={{
            marginTop: 3,
            fontSize: layout.cardName,
            lineHeight: 1.3,
          }}
        >
          {certificate.name}
        </p>
      </div>

      <div
        className="text-center"
        style={{
          marginBottom: layout.interestBottom,
        }}
      >
        <div
          className={`font-extrabold ${theme.title}`}
          style={{
            fontSize: layout.interest,
            lineHeight: 1,
          }}
        >
          {certificate.interestRate}%
        </div>

        <div
          className="text-muted-foreground"
          style={{
            marginTop: 3,
            fontSize: layout.interestLabel,
          }}
        >
          سعر العائد
        </div>
      </div>

      <div
        className="border-t"
        style={{
          marginTop: layout.dividerY,
          marginBottom: layout.dividerY,
        }}
      />

      <div
        className="space-y-0"
        style={{
          fontSize: layout.detailText,
        }}
      >
        <div
          className="flex items-center justify-between gap-2"
          style={{ marginBottom: layout.detailGap }}
        >
          <span>⏳ المدة</span>

          <strong>
            {certificate.duration >= 12
              ? `${certificate.duration / 12} سنة`
              : `${certificate.duration} شهر`}
          </strong>
        </div>

        <div
          className="flex items-center justify-between gap-2"
          style={{ marginBottom: layout.detailGap }}
        >
          <span>💳 دورية الصرف</span>

          <strong>
            {certificate.compound ? "في نهاية المدة" : getPeriodLabel(certificate.type)}
          </strong>
        </div>

        <div
          className="flex items-center justify-between gap-2"
          style={{ marginBottom: layout.detailGap }}
        >
          <span>📈 نوع العائد</span>

          <strong>
            {getReturnTypeLabel(
              certificate.returnType,
              certificate.compound
            )}
          </strong>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span>💰 الحد الأدنى</span>

          <strong>
            {certificate.minAmount.toLocaleString(
              "ar-EG"
            )}{" "}
            جنيه
          </strong>
        </div>
      </div>

      {isGraduated && (
        <>
          <div
            className="border-t"
            style={{
              marginTop: layout.dividerY,
              marginBottom: layout.dividerY,
            }}
          />

          <div>
            <h4
              className={`text-center font-bold ${theme.title}`}
              style={{
                fontSize: layout.detailText,
                marginBottom: layout.detailGap,
              }}
            >
              جدول العائد المتدرج
            </h4>

            <div
              className="rounded-xl bg-muted/40"
              style={{
                padding: layout.cardPadding / 2,
                fontSize: layout.detailText,
              }}
            >
              <div className="flex justify-between">
                <span>السنة الأولى</span>
                <strong>
                  {certificate.graduatedRates!.year1}%
                </strong>
              </div>

              <div className="my-1 border-t" />

              <div className="flex justify-between">
                <span>السنة الثانية</span>
                <strong>
                  {certificate.graduatedRates!.year2}%
                </strong>
              </div>

              <div className="my-1 border-t" />

              <div className="flex justify-between">
                <span>السنة الثالثة</span>
                <strong>
                  {certificate.graduatedRates!.year3}%
                </strong>
              </div>
            </div>
          </div>
        </>
      )}

      {showDescription && (
        <>
          <div
            className="border-t"
            style={{
              marginTop: layout.dividerY,
              marginBottom: layout.dividerY,
            }}
          />

          <h4
            className={`font-bold ${theme.title}`}
            style={{
              fontSize: layout.detailText,
              marginBottom: layout.detailGap,
            }}
          >
            نبذة
          </h4>

          <p
            className="text-muted-foreground"
            style={{
              fontSize: Math.max(
                8,
                layout.detailText - 2
              ),
              lineHeight: 1.7,
            }}
          >
            {certificate.description}
          </p>
        </>
      )}
    </div>
  );
}