"use client";

import React from "react";
import Image from "next/image";

import DepositCard from "@/components/deposit-card";

import {
  PosterDeposit,
  PosterSettings,
  PosterThemeConfig,
} from "@/lib/deposits-poster";

interface DepositPosterPreviewProps {
  posterRef: React.RefObject<HTMLDivElement | null>;

  settings: PosterSettings;

  deposits : PosterDeposit[];

  theme: PosterThemeConfig;
}

export default function DepositPosterPreview({
  posterRef,
  settings,
  deposits,
  theme,
}: DepositPosterPreviewProps) {

  const columns =
    deposits.length <= 1
      ? "grid-cols-1"
      : deposits.length <= 6
      ? "grid-cols-2"
      : "grid-cols-3";

  return (

    <div className="overflow-auto rounded-xl border bg-muted/20 p-6">

      <div
        ref={posterRef}
        className={`
          mx-auto
          overflow-hidden
          rounded-3xl
          shadow-2xl
          ${theme.background}
        `}
        style={{
          width: "420px",

          minHeight:
            settings.size === "post"
              ? "600px"
              : "760px",
        }}
      >

        {/* ===========================
            Header
        =========================== */}

        <div
          className={`
            ${theme.header}
            px-8
            py-8
            text-center
            text-white
          `}
        >

          <div className="mb-4 flex justify-center">

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-lg
              "
            >

              <Image
                src="/logo.png"
                alt="دليلك البنكى"
                width={42}
                height={42}
              />

            </div>

          </div>

          <h1 className="text-3xl font-extrabold">

                أفضل الودائع البنكية    
          </h1>

          <p className="mt-2 text-lg opacity-90">

                تحديث أسعار عوائد الودائع
          </p>

        </div>

        {/* ===========================
            Date
        =========================== */}

        <div className="px-8 py-6 text-center">

          <p className="text-sm text-muted-foreground">

            آخر تحديث

          </p>

          <h2
            className={`
              mt-2
              text-3xl
              font-bold
              ${theme.title}
            `}
          >
            {settings.issueDate}
          </h2>

        </div>

        {/* ===========================
            Deposits 
        =========================== */}

        <div
          className={`
            grid
            gap-4
            px-6
            pb-6
            ${columns}
          `}
        >
            {deposits.map((deposit) => (

                <DepositCard
                    key={deposit.id}
                    deposit={deposit}
                    theme={theme}
                />

            ))}

        </div>

        {/* ===========================
            Footer
        =========================== */}

        <div className="border-t bg-white px-6 py-5">

          <div className="text-center">

            <div className="text-lg font-bold">

              تطبيق دليلك البنكى

            </div>

            <div className="mt-1 text-sm text-muted-foreground">

              daleelakelbanky.vercel.app

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
