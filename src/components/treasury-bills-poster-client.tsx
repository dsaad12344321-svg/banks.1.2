"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { toPng } from "html-to-image";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  DEFAULT_INVESTMENT_AMOUNT,
  POSTER_SIZES,
  POSTER_THEMES,
  PosterSettings,
  PosterSize,
  PosterTheme,
  TreasuryBillInput,
  calculateBills,
  createDefaultBills,
  generateCaption,
} from "@/lib/treasury-bills";
import Image from "next/image";

const STORAGE_KEY = "treasury-poster-settings";

export default function TreasuryBillsPosterClient() {
  const posterRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] =
    useState<PosterSettings>({
      issueDate: new Date()
        .toISOString()
        .slice(0, 10),

      theme: "green",

      size: "post",

      bills: createDefaultBills(),
    });

  /* ===========================
      Local Storage
  =========================== */

  useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      setSettings(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  /* ===========================
      Calculations
  =========================== */

  const results = useMemo(() => {
    return calculateBills(
      DEFAULT_INVESTMENT_AMOUNT,
      settings.bills
    );
  }, [settings]);

  const currentTheme =
    POSTER_THEMES[settings.theme];

  const currentSize =
    POSTER_SIZES[settings.size];

  /* ===========================
      Update Helpers
  =========================== */

  function updateBill(
    days: number,
    changes: Partial<TreasuryBillInput>
  ) {
    setSettings((prev) => ({
      ...prev,

      bills: prev.bills.map((bill) =>
        bill.days === days
          ? {
              ...bill,
              ...changes,
            }
          : bill
      ),
    }));
  }

  function updateTheme(
    theme: PosterTheme
  ) {
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  }

  function updateSize(
    size: PosterSize
  ) {
    setSettings((prev) => ({
      ...prev,
      size,
    }));
  }

  function updateDate(
    date: string
  ) {
    setSettings((prev) => ({
      ...prev,
      issueDate: date,
    }));
  }

  /* ===========================
      Download Poster
  =========================== */

  async function downloadPoster() {
    if (!posterRef.current) return;

const node = posterRef.current;

const dataUrl = await toPng(node, {
  pixelRatio: 4,
  cacheBust: true,

  width: node.scrollWidth,
  height: node.scrollHeight,

  canvasWidth: node.scrollWidth * 4,
  canvasHeight: node.scrollHeight * 4,

  style: {
    margin: "0",
    transform: "none",
  },
});

    const link =
      document.createElement("a");

    link.download = `treasury-${settings.issueDate}.png`;

    link.href = dataUrl;

    link.click();

    toast.success(
      "تم تحميل الصورة بنجاح"
    );
  }

  /* ===========================
      Copy Caption
  =========================== */

  async function copyCaption() {
    await navigator.clipboard.writeText(
      generateCaption(
        settings.issueDate,
        results
      )
    );

    toast.success(
      "تم نسخ النص"
    );
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

      bills: createDefaultBills(),
    });

    toast.success("تم إعادة ضبط الإعدادات");
  }

  /* ===========================
      UI
  =========================== */

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

      {/* =======================================
          Control Panel
      ======================================== */}

      <Card className="p-6">

        <div className="space-y-6">

          {/* Date */}

          <div>

            <Label className="mb-2 block">

              تاريخ الإصدار

            </Label>

            <Input
              type="date"
              value={settings.issueDate}
              onChange={(e) =>
                updateDate(e.target.value)
              }
            />

          </div>

          {/* Bills */}

          <div>

            <Label className="mb-4 block">

              بيانات الأذون

            </Label>

            <div className="space-y-4">

              {settings.bills.map((bill) => (

                <Card
                  key={bill.days}
                  className="p-4"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h4 className="font-bold">

                        {bill.days} يوم

                      </h4>

                      <p className="text-xs text-muted-foreground">

                        سعر العائد

                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={bill.enabled}
                      onChange={(e) =>
                        updateBill(bill.days, {
                          enabled: e.target.checked,
                          status: e.target.checked
                            ? "available"
                            : "hidden",
                        })
                      }
                    />

                  </div>

                  <Input
                    className="mt-4"
                    type="number"
                    step="0.01"
                    value={bill.rate}
                    disabled={!bill.enabled}
                    onChange={(e) =>
                      updateBill(bill.days, {
                        rate: Number(
                          e.target.value
                        ),
                      })
                    }
                  />

                </Card>

              ))}

            </div>

          </div>

          {/* Theme */}

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

          {/* Size */}

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

          {/* Actions */}

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
            {/* =======================================
          Poster Preview
      ======================================== */}

      <div className="overflow-auto rounded-xl border bg-muted/20 p-6">

        <div
          ref={posterRef}
          className={`
            mx-auto overflow-hidden rounded-3xl
            ${currentTheme.background}
            shadow-2xl
          `}
          style={{
            width: "420px",
            minHeight:
              settings.size === "post"
                ? "525px"
                : "740px",
          }}
        >

          {/* Header */}

          <div
            className={`${currentTheme.header} px-8 py-8 text-center text-white`}
          >

            <div className="mb-4 flex justify-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl">

                          <Image
                            src="/logo.png"
                            alt="دليلك البنكي"
                            width={40}
                            height={40}
                          />

              </div>

            </div>

            <h1 className="text-3xl font-extrabold">

              أذون الخزانة المصرية

            </h1>

            <p className="mt-2 text-lg opacity-90">

             العروض المقبولة

            </p>

          </div>

          {/* Date */}

          <div className="px-8 py-6 text-center">

            <p className="text-sm text-gray-500">

              تاريخ الإصدار

            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${currentTheme.title}`}
            >
              {settings.issueDate}
            </h2>

          </div>

          {/* Bills Grid */}

          <div
            className={`
              grid gap-4 px-6 pb-6
              ${
                results.length <= 1
                  ? "grid-cols-1"
                  : "grid-cols-2"
              }
            `}
          >

            {results.map((bill) => (

              <div
                key={bill.days}
                className={`
                  rounded-2xl
                  border-2
                  p-5
                  ${currentTheme.card}
                  ${currentTheme.border}
                  ${currentTheme.shadow}
                `}
              >

                <div
                  className={`mb-4 text-center text-2xl font-bold ${currentTheme.title}`}
                >

                  {bill.days} يوم

                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span>العائد</span>

                    <strong>

                      {bill.rate.toFixed(2)}%

                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span>صافى الربح</span>

                    <strong className="text-green-600">

                      {bill.netProfit.toLocaleString("ar-EG", {
                        minimumFractionDigits: 2,
                      })}

                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span>الضريبة</span>

                    <strong>

                      {bill.tax.toLocaleString("ar-EG", {
                        minimumFractionDigits: 2,
                      })}

                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span>المبلغ المستثمر</span>

                    <strong>

                      {DEFAULT_INVESTMENT_AMOUNT.toLocaleString("ar-EG")}

                    </strong>

                  </div>

                </div>

              </div>

            ))}
                      </div>

          {/* Footer */}

          <div className="border-t bg-white px-6 py-5">

            <div className="text-center">

              <div className="text-lg font-bold">

                تطبيق دليلك البنكى

              </div>

              <div className="mt-1 text-sm text-muted-foreground">

                https://daleelakelbanky.vercel.app

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
