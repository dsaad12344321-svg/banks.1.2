"use client";

import React, { useRef } from "react";
import Image from "next/image";

import CertificateCard from "@/components/certificate-card";

import {
  getPosterLayout,
} from "@/lib/poster-layout";

import {
  PosterCertificate,
  PosterSettings,
  PosterThemeConfig,
  POSTER_SIZES,
} from "@/lib/certificates-poster";

import { usePosterFit } from "@/hooks/use-poster-fit";

interface CertificatePosterPreviewProps {
  posterRef: React.RefObject<HTMLDivElement | null>;

  settings: PosterSettings;

  certificates: PosterCertificate[];

  theme: PosterThemeConfig;
}

export default function CertificatePosterPreview({
  posterRef,
  settings,
  certificates,
  theme,
}: CertificatePosterPreviewProps) {
  const columns =
    certificates.length <= 1
      ? "grid-cols-1"
      : certificates.length <= 6
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
        {/* =====================================================
            Smart Fit Container
            يقوم بتصغير المحتوى تلقائياً إذا كان أكبر من المقاس
            المختار، بدون قص أي جزء من البوستر.
        ===================================================== */}
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
          {/* ===========================
              Header
          =========================== */}

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
              أفضل شهادات الادخار
            </h1>

            <p
              className="opacity-90"
              style={{
                marginTop: layout.subtitleTop,
                fontSize: layout.subtitle,
              }}
            >
              تحديث أسعار العائد
            </p>
          </div>

          {/* ===========================
              Date
          =========================== */}

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

          {/* ===========================
              Grid
          =========================== */}

          <div
            className={`grid ${columns}`}
            style={{
              gap: layout.gridGap,
              paddingLeft: layout.gridX,
              paddingRight: layout.gridX,
              paddingBottom: layout.gridBottom,
            }}
          >
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                theme={theme}
                size={settings.size}
              />
            ))}
          </div>

          {/* ===========================
              Footer
          =========================== */}

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