"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const DAYS_MAP: Record<string, number> = {
  "3": 91,
  "6": 182,
  "9": 273,
  "11": 336,
  "12": 364,
};

export default function TreasuryBillsCalculatorClient() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("3");
  const [remainingDays, setRemainingDays] = useState("");
  const [marketType, setMarketType] = useState<"primary" | "secondary">(
    "primary"
  );

  const [result, setResult] = useState<null | {
    poundValue: number;
    actualDeduction: number;
    upfrontProfit: number;
    tax: number;
    netProfit: number;
    netProfitRate: number;
    actualNetProfitRate: number;
    principalMinusTax: number;
  }>(null);

  function calculate() {
    const smartLink =
      "https://www.effectivegatecpm.com/zi4we4ije?key=04861c118556f3663575520723c26923";

    window.open(smartLink, "_blank", "noopener,noreferrer");

    const principal = Number(amount);
    const interestRate = Number(rate) / 100;

    const days =
      marketType === "primary"
        ? DAYS_MAP[duration]
        : Number(remainingDays);

    if (!principal || !interestRate || !days) return;

    const poundValue = 1 / ((days / 365) * interestRate + 1);
    const actualDeduction = poundValue * principal;
    const upfrontProfit = principal - actualDeduction;

    const tax = upfrontProfit * 0.2;
    const netProfit = upfrontProfit - tax;
    const netProfitRate = (netProfit / principal) * 100;
    const actualNetProfitRate = (netProfit / actualDeduction) * 100;
    const principalMinusTax = principal - tax;

    setResult({
      poundValue,
      actualDeduction,
      upfrontProfit,
      tax,
      netProfit,
      netProfitRate,
      actualNetProfitRate,
      principalMinusTax,
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Input
          type="number"
          placeholder="أدخل المبلغ (جنيه)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Input
          type="number"
          placeholder="سعر العائد (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <Link
          href="https://www.cbe.org.eg/ar/auctions/egp-t-bills"
          target="_blank"
          className="text-blue-500 hover:underline text-[10px]"
        >
          موقع البنك المركزى
        </Link>

        <div className="flex justify-start">
          <div className="flex rounded-full border overflow-hidden">
            <button
              type="button"
              onClick={() => setMarketType("primary")}
              className={`px-5 py-2 text-sm transition-colors ${
                marketType === "primary"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              السوق الأولية
            </button>

            <button
              type="button"
              onClick={() => setMarketType("secondary")}
              className={`px-5 py-2 text-sm border-r transition-colors ${
                marketType === "secondary"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              السوق الثانوية
            </button>
          </div>
        </div>

        {marketType === "primary" ? (
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المدة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">٣ شهور</SelectItem>
              <SelectItem value="6">٦ شهور</SelectItem>
              <SelectItem value="9">٩ شهور</SelectItem>
              <SelectItem value="11">١١ شهر</SelectItem>
              <SelectItem value="12">سنة</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            type="number"
            placeholder="عدد الأيام المتبقية للاستحقاق"
            value={remainingDays}
            onChange={(e) => setRemainingDays(e.target.value)}
          />
        )}
      </div>

      <Button className="w-full" onClick={calculate}>
        احسب الأرباح
      </Button>

      {result && (
        <Card className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>القيمة الاسمية (المبلغ المحجوز)</span>
            <strong>{Number(amount).toLocaleString()} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>متوسط سعر العائد</span>
            <strong>{Number(rate).toLocaleString()}%</strong>
          </div>

          <div className="flex justify-between">
            <span>مدة أذون الخزانة بالأيام</span>
            <strong>
              {marketType === "primary"
                ? DAYS_MAP[duration]
                : remainingDays}{" "}
              يوم
            </strong>
          </div>

          <div className="flex justify-between">
            <span>القيمة الحالية للجنيه</span>
            <strong>{result.poundValue.toFixed(5)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>لتنفيذ الشراء يخصم</span>
            <strong className="text-red-600">
              {result.actualDeduction.toFixed(2)} جنيه
            </strong>
          </div>

          <div className="flex justify-between">
            <span>يوم الإصدار هتسترد</span>
            <strong className="text-green-600">
              {result.upfrontProfit.toFixed(2)} جنيه
            </strong>
          </div>

          <div className="flex justify-between">
            <span>الضرائب 20%</span>
            <strong>{result.tax.toFixed(2)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>هتسترد بعد نهاية المدة</span>
            <strong>{result.principalMinusTax.toFixed(2)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>صافي الربح بعد نهاية المدة</span>
            <strong className="text-green-600">
              {result.netProfit.toFixed(2)} جنيه
            </strong>
          </div>

          <div className="flex justify-between">
            <span>صافى الربح / القيمة الاسمية</span>
            <strong>{result.netProfitRate.toFixed(2)}%</strong>
          </div>

          <div className="flex justify-between">
            <span>صافى الربح / المبلغ المخصوم</span>
            <strong>{result.actualNetProfitRate.toFixed(2)}%</strong>
          </div>
        </Card>
      )}
    </div>
  );
}
