"use client";

import Image from "next/image";

import {
  PosterDeposit,
  PosterThemeConfig,
  getPeriodLabel,
  getReturnTypeLabel,
} from "@/lib/deposits-poster";

interface DepositCardProps {
  deposit: PosterDeposit;

  theme: PosterThemeConfig;

  showDescription?: boolean;
}

export default function DepositCard({
    deposit,
    theme,
    showDescription = false,
}: DepositCardProps) {


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
            src={deposit.bankLogo}
            alt={deposit.bankName}
            width={44}
            height={44}
          />

        </div>

        <h3
          className={`text-lg font-bold ${theme.title}`}
        >
          {deposit.bankName}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {deposit.name}
        </p>

      </div>

      {/* ===========================
          Interest
      =========================== */}

      <div className="mb-5 text-center">

        <div
          className={`text-4xl font-extrabold ${theme.title}`}
        >
          {deposit.interestRate}%
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
            {deposit.duration >= 12
                ? `${deposit.duration / 12} سنة`
                : `${deposit.duration} شهر`}
            </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            💳 دورية الصرف
          </span>

          <strong>
            {getPeriodLabel(deposit.type)}
          </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            📈 نوع العائد
          </span>

          <strong>
            {getReturnTypeLabel(
              deposit.returnType
            )}
          </strong>

        </div>

        <div className="flex items-center justify-between">

          <span>
            💰 الحد الأدنى
          </span>

          <strong>
            {deposit.minAmount.toLocaleString(
              "ar-EG"
            )}{" "}
            جنيه
          </strong>

        </div>

      </div>


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
              {deposit.description}
            </p>

          </div>
        </>
      )}

    </div>
  );
}
