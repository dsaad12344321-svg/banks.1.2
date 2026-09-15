"use client";

import Image from "next/image";

import {
  PosterDeposit,
  PosterThemeConfig,
  getPeriodLabel,
  getReturnTypeLabel,
} from "@/lib/deposits-poster";

import {
  getPosterLayout,
  PosterLayoutSize,
} from "@/lib/poster-layout";

interface DepositCardProps {
  deposit: PosterDeposit;
  theme: PosterThemeConfig;
  showDescription?: boolean;
  size?: PosterLayoutSize;
}

export default function DepositCard({
  deposit,
  theme,
  showDescription = false,
  size = "story",
}: DepositCardProps) {
  const layout = getPosterLayout(size);

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
            src={deposit.bankLogo}
            alt={deposit.bankName}
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
          {deposit.bankName}
        </h3>

        <p
          className="text-muted-foreground"
          style={{
            marginTop: 3,
            fontSize: layout.cardName,
            lineHeight: 1.3,
          }}
        >
          {deposit.name}
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
          {deposit.interestRate}%
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
            {deposit.duration >= 12
              ? `${deposit.duration / 12} سنة`
              : `${deposit.duration} شهر`}
          </strong>
        </div>

        <div
          className="flex items-center justify-between gap-2"
          style={{ marginBottom: layout.detailGap }}
        >
          <span>💳 دورية الصرف</span>

          <strong>
            {getPeriodLabel(deposit.type)}
          </strong>
        </div>

        <div
          className="flex items-center justify-between gap-2"
          style={{ marginBottom: layout.detailGap }}
        >
          <span>📈 نوع العائد</span>

          <strong>
            {getReturnTypeLabel(
              deposit.returnType
            )}
          </strong>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span>💰 الحد الأدنى</span>

          <strong>
            {deposit.minAmount.toLocaleString(
              "ar-EG"
            )}{" "}
            جنيه
          </strong>
        </div>
      </div>

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
            {deposit.description}
          </p>
        </>
      )}
    </div>
  );
}