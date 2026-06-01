"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Bank } from "@/types/deposits";

interface Props {
  banks: Bank[];
  loading: boolean;
  error: string;
}

export default function DepositsCalculatorClient({
  banks,
}: Props) {
  const [amount, setAmount] = useState("100000");

  const [result, setResult] = useState<{
    monthlyProfit: number;
    totalProfit: number;
    totalAmount: number;
  } | null>(null);

  const calculateProfit = () => {
    const deposit = banks?.[0]?.deposits?.[0];

    if (!deposit) return;

    const principal = Number(amount);

    const monthlyProfit =
      (principal * deposit.interestRate) /
      100 /
      12;

    const totalProfit =
      monthlyProfit * deposit.duration;

    const totalAmount =
      principal + totalProfit;

    setResult({
      monthlyProfit,
      totalProfit,
      totalAmount,
    });
  };

  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <Label htmlFor="amount">
          مبلغ الاستثمار
        </Label>

        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />
      </div>

      <Button
        onClick={calculateProfit}
        className="w-full"
      >
        حساب الأرباح
      </Button>

      {result && (
        <div className="border rounded-lg p-4 space-y-3">

          <div>
            <strong>الربح الشهري:</strong>{" "}
            {result.monthlyProfit.toLocaleString(
              "ar-EG",
              {
                maximumFractionDigits: 2,
              }
            )}{" "}
            ج.م
          </div>

          <div>
            <strong>إجمالي الربح:</strong>{" "}
            {result.totalProfit.toLocaleString(
              "ar-EG",
              {
                maximumFractionDigits: 2,
              }
            )}{" "}
            ج.م
          </div>

          <div>
            <strong>الإجمالي النهائي:</strong>{" "}
            {result.totalAmount.toLocaleString(
              "ar-EG",
              {
                maximumFractionDigits: 2,
              }
            )}{" "}
            ج.م
          </div>

        </div>
      )}
    </div>
  );
}