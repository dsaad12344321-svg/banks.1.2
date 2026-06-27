"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { toPng } from "html-to-image";

import { toast } from "sonner";

import {
  Bank,
  PosterSettings,
  PosterBank,
  PosterTheme,
  PosterSize,
  POSTER_THEMES,
  POSTER_SIZES,
  createPosterBanks,
  getEnabledDeposits,
  generateCaption,
} from "@/lib/deposits-poster";

import DepositSelection from "@/components/deposit-selection";
import DepositPosterPreview from "@/components/deposit-poster-preview";

interface DepositsPosterClientProps {
  banks: Bank[];
}

const STORAGE_KEY = "deposits-poster-settings";

export default function DepositsPosterClient({
  banks,
}: DepositsPosterClientProps) {

  const posterRef =
    useRef<HTMLDivElement>(null);

  const [settings, setSettings] =
    useState<PosterSettings>({
      issueDate: new Date()
        .toISOString()
        .slice(0, 10),

      theme: "green",

      size: "post",

      banks: createPosterBanks(
        banks
      ),
    });

  /* ===========================
      Local Storage
  =========================== */

  useEffect(() => {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) return;

    try {

      const parsed =
        JSON.parse(saved);

      setSettings(parsed);

    } catch {}

  }, []);

  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );

  }, [settings]);

  /* ===========================
      Selected Certificates
  =========================== */

const selectedDeposits =
    useMemo(() => {

      return getEnabledDeposits(
        settings.banks
      );

    }, [settings.banks]);

  const currentTheme =
    POSTER_THEMES[
      settings.theme
    ];

  const currentSize =
    POSTER_SIZES[
      settings.size
    ];
  /* ===========================
      Update Helpers
  =========================== */

  function updateDeposit(
    depositId: string,
    enabled: boolean
  ) {

    setSettings((prev) => ({

      ...prev,

      banks: prev.banks.map((bank) => ({

        ...bank,

        deposits:
          bank.deposits.map(
            (deposit) =>

              deposit.id ===
              depositId

                ? {
                    ...deposit,
                    enabled,
                  }

                : deposit

          ),

      })),

    }));

  }

  function updateTheme(
    theme: PosterSettings["theme"]
  ) {

    setSettings((prev) => ({

      ...prev,

      theme,

    }));

  }

  function updateSize(
    size: PosterSettings["size"]
  ) {

    setSettings((prev) => ({

      ...prev,

      size,

    }));

  }

  function updateDate(
    issueDate: string
  ) {

    setSettings((prev) => ({

      ...prev,

      issueDate,

    }));

  }
  /* ===========================
      Download Poster
  =========================== */

  async function downloadPoster() {

    if (!posterRef.current) return;

    try {

      const node = posterRef.current;

      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        cacheBust: true,

        width: node.scrollWidth,
        height: node.scrollHeight,

        canvasWidth:
          node.scrollWidth * 4,

        canvasHeight:
          node.scrollHeight * 4,

        style: {
          margin: "0",
          transform: "none",
        },
      });

      const link =
        document.createElement("a");

      link.download = `deposits-${settings.issueDate}.png`;

      link.href = dataUrl;

      link.click();

      toast.success(
        "تم تحميل الصورة بنجاح"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "حدث خطأ أثناء إنشاء الصورة"
      );

    }

  }

  /* ===========================
      Copy Caption
  =========================== */

  async function copyCaption() {

    try {

      await navigator.clipboard.writeText(

        generateCaption(
            settings.issueDate,
            selectedDeposits
        )

      );

      toast.success(
        "تم نسخ النص"
      );

    } catch {

      toast.error(
        "تعذر نسخ النص"
      );

    }

  }

  /* ===========================
      Reset
  =========================== */

  function resetSettings() {

    setSettings({

      issueDate: new Date()
        .toISOString()
        .slice(0, 10),

      theme: "green",

      size: "post",

      banks: createPosterBanks(
        banks
      ),

    });

    toast.success(
      "تم إعادة ضبط الإعدادات"
    );

  }
  /* ===========================
      UI
  =========================== */

  return (

    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

      {/* =======================================
          Control Panel
      ======================================= */}

      <DepositSelection

        banks={settings.banks}

        settings={settings}

        updateDate={updateDate}

        updateDeposit={
          updateDeposit
        }

        updateTheme={updateTheme}

        updateSize={updateSize}

        downloadPoster={
          downloadPoster
        }

        copyCaption={copyCaption}

        resetSettings={
          resetSettings
        }

      />

      {/* =======================================
          Poster Preview
      ======================================= */}

      <div className="overflow-auto rounded-xl border bg-muted/20 p-6">

          <DepositPosterPreview
            posterRef={posterRef}
            settings={settings}
            deposits={selectedDeposits}
            theme={currentTheme}
          />

      </div>

    </div>

  );

}    
