"use client";

import React, { useRef } from "react";
import Image from "next/image";

import DepositCard from "@/components/deposit-card";

import {
  PosterDeposit,
  PosterSettings,
  PosterThemeConfig,
  POSTER_SIZES,
} from "@/lib/deposits-poster";

import { getPosterLayout } from "@/lib/poster-layout";
import { usePosterFit } from "@/hooks/use-poster-fit";

interface DepositPosterPreviewProps {
  posterRef: React.RefObject<HTMLDivElement | null>;
  settings: PosterSettings;
  deposits: PosterDeposit[];
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

  const currentSize = POSTER_SIZES[settings.size];

  const layout = getPosterLayout(settings.size);

  const contentRef = useRef<HTMLDivElement>(null);

  const fitScale = usePosterFit(
    contentRef,
    currentSize.previewWidth,
    currentSize.previewHeight
  );

  return (
    <div className="overflow-auto rounded-xl border bg-muted/20 p-6">
      <div
        ref={posterRef}
        className={`
          relative
          mx-auto
          overflow-hidden
          rounded-3xl
          shadow-2xl
          ${theme.background}
        `}
        style={{
          width: `${currentSize.previewWidth}px`,
          height: `${currentSize.previewHeight}px`,
        }}
      >
        <div
          ref={contentRef}
          className={`
            absolute
            left-1/2
            top-0
            ${theme.background}
          `}
          style={{
            width: `${currentSize.previewWidth}px`,
            transform: `translateX(-50%) scale(${fitScale})`,
            transformOrigin: "top center",
          }}
        >
          {/* Header */}
          <div
            className={`${theme.header} text-center text-white`}
            style={{
              padding: `${layout.headerY}px ${layout.headerX}px`,
            }}
          >
            <div
              className="flex justify-center"
              style={{
                marginBottom: layout.logoBottom,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full bg-white shadow-lg"
                style={{
                  width: layout.logoBox,
                  height: layout.logoBox,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="دليلك البنكى"
                  width={layout.logo}
                  height={layout.logo}
                />
              </div>
            </div>

            <h1
              className="font-extrabold"
              style={{
                fontSize: layout.title,
                lineHeight: 1.2,
              }}
            >
              أفضل الودائع البنكية
            </h1>

            <p
              className="opacity-90"
              style={{
                marginTop: layout.subtitleTop,
                fontSize: layout.subtitle,
              }}
            >
              تحديث أسعار عوائد الودائع
            </p>
          </div>

          {/* Date */}
          <div
            className="text-center"
            style={{
              padding: `${layout.dateY}px ${layout.dateX}px`,
            }}
          >
            <p
              className="text-muted-foreground"
              style={{
                fontSize: layout.dateLabel,
              }}
            >
              آخر تحديث
            </p>

            <h2
              className={`font-bold ${theme.title}`}
              style={{
                marginTop: layout.dateTop,
                fontSize: layout.date,
                lineHeight: 1.2,
              }}
            >
              {settings.issueDate}
            </h2>
          </div>

          {/* Deposits Grid */}
          <div
            className={`grid ${columns}`}
            style={{
              gap: layout.gridGap,
              paddingLeft: layout.gridX,
              paddingRight: layout.gridX,
              paddingBottom: layout.gridBottom,
            }}
          >
            {deposits.map((deposit) => (
              <DepositCard
                key={deposit.id}
                deposit={deposit}
                theme={theme}
                size={settings.size}
              />
            ))}
          </div>

          {/* Footer */}
          <div
            className="border-t bg-white text-center"
            style={{
              padding: `${layout.footerY}px ${layout.footerX}px`,
            }}
          >
            <div
              className="font-bold"
              style={{
                fontSize: layout.footerTitle,
              }}
            >
              تطبيق دليلك البنكى
            </div>

            <div
              className="text-muted-foreground"
              style={{
                marginTop: layout.footerTextTop,
                fontSize: layout.footerText,
              }}
            >
              daleelakelbanky.vercel.app
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}