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
  "11":336,
  "12": 364,
};

export default function TreasuryBillsCalculatorClient() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("3");

  const [result, setResult] = useState<null | {
    poundValue: number;
    actualDeduction: number;
    upfrontProfit: number;
    tax: number;
    netProfit: number;
    netProfitRate: number;
  }>(null);

  function calculate() {
      // Open smart link in new window
        const smartLink = 'https://www.effectivegatecpm.com/zi4we4ije?key=04861c118556f3663575520723c26923'
        window.open(smartLink, '_blank', 'noopener,noreferrer'); 
    const principal = Number(amount);
    const interestRate = Number(rate) / 100;
    const days = DAYS_MAP[duration];

    if (!principal || !interestRate || !days) return;
    const poundValue=(1 / ((days / 365) * interestRate + 1));
    const actualDeduction = poundValue * principal;
    const upfrontProfit =principal-actualDeduction;

    const tax = upfrontProfit * 0.2;
    const netProfit = upfrontProfit - tax;
    const netProfitRate = (netProfit / principal) * 100;

    setResult({
      poundValue,
      actualDeduction,
      upfrontProfit,
      tax,
      netProfit,
      netProfitRate,
    });
  }

  return (
    <div className="space-y-6">

      {/* Inputs */}
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
        <Link href="https://www.cbe.org.eg/ar/auctions/egp-t-bills" 
              className="text-blue-500 hover:underline text-[10px]">
          موقع البنك المركزى
        </Link>

        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المدة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">  ٣ شهور</SelectItem>
            <SelectItem value="6"> ٦ شهور</SelectItem>
            <SelectItem value="9">٩ شهور</SelectItem>
            <SelectItem value="11">١١ شهر</SelectItem>
            <SelectItem value="12">سنة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      <Button className="w-full" onClick={calculate}>
        احسب الأرباح
      </Button>

      {/* Results */}
      {result && (
        <Card className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>القيمة الاسمية(المبلغ المحجوز)</span>
            <strong>{Number(amount).toLocaleString()} جنيه</strong>
          </div>
          <div className="flex justify-between">
            <span>متوسط سعر العائد</span>
            <strong>{Number(rate).toLocaleString()}% </strong>
          </div>
            <div className="flex justify-between">
            <span>مدة أذون الخزانة بالأيام</span>
            <strong>يوم{DAYS_MAP[duration]}</strong>
          </div>
          <div className="flex justify-between">
            <span>القيمة الحالية للجنيه</span>
            <strong>{result.poundValue.toFixed(5)} جنيه</strong>
          </div>
          <div className="flex justify-between">
            <span>المبلغ المخصوم فعليا</span>
            <strong>{result.actualDeduction.toFixed(2)} جنيه</strong>
          </div>
          
          <div className="flex justify-between">
            <span>الأرباح المصروفة مقدّمًا</span>
            <strong>{result.upfrontProfit.toFixed(2)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>الضرائب (20%)</span>
            <strong>{result.tax.toFixed(2)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>صافي الربح بعد نهاية المدة</span>
            <strong>{result.netProfit.toFixed(2)} جنيه</strong>
          </div>

          <div className="flex justify-between">
            <span>عائد الاستثمار</span>
            <strong>{result.netProfitRate.toFixed(2)}%</strong>
          </div>
        </Card>
      )}
    </div>
  );
}


