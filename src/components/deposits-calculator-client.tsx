"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calculator, TrendingUp } from "lucide-react";

import type { Bank } from "@/types/deposits";

interface Props {
  banks: Bank[];
  loading: boolean;
  error: string;
}

export default function DepositsCalculatorClient({
  banks,
}: Props) {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState("");
  const [amount, setAmount] = useState("100000");

  const [result, setResult] = useState<{
    periodicProfit: number;
    totalProfit: number;
    totalAmount: number;
  } | null>(null);

  const availableDeposits = selectedBank
    ? banks.find((bank) => bank.id === selectedBank)?.deposits || []
    : [];

  const calculateProfit = () => {
      // Open smart link in new window
        const smartLink = 'https://www.effectivegatecpm.com/zi4we4ije?key=04861c118556f3663575520723c26923'
         window.open(smartLink, '_blank', 'noopener,noreferrer');  
    if (!selectedBank || !selectedDeposit || !amount) return;

    const bank = banks.find((b) => b.id === selectedBank);
    const deposit = bank?.deposits.find((d) => d.id === selectedDeposit);
    if (!deposit) return;

    const principal = parseFloat(amount);

    let periodicProfit = 0;
    let totalProfit = 0;

    switch (deposit.type) {
      case "monthly":
        periodicProfit = (principal * deposit.interestRate) / 100 / 12;
        totalProfit = periodicProfit * deposit.duration;
        break;

      case "quarterly":
        periodicProfit = (principal * deposit.interestRate) / 100 / 4;
        totalProfit = periodicProfit * (deposit.duration / 3);
        break;

      case "annual":
        periodicProfit = (principal * deposit.interestRate) / 100;
        totalProfit = periodicProfit * (deposit.duration / 12);
        break;

      case "upfront":
        totalProfit =
          principal *
          (deposit.interestRate / 100) *
          (deposit.duration / 12);
        periodicProfit = totalProfit;
        break;

      case "maturity":
        totalProfit =
          principal *
          (deposit.interestRate / 100) *
          (deposit.duration / 12);
        periodicProfit = totalProfit;
        break;
    }

    setResult({
      periodicProfit,
      totalProfit,
      totalAmount: principal + totalProfit,
    });
  };

  const reset = () => {
    setSelectedBank("");
    setSelectedDeposit("");
    setAmount("100000");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>اختر البنك</Label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger>
              <SelectValue placeholder="اختر البنك" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <img 
                        src={bank.logo} 
                        alt={`${bank.name} logo`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'block';
                          }
                        }}
                      />
                      <div className="text-sm" style={{display: 'none'}}>
                        {bank.id === 'banque-misr' ? '🏦' : '🏛️'}
                      </div>
                    </div>
                    <span>{bank.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>اختر الوديعة</Label>
          <Select
            value={selectedDeposit}
            onValueChange={setSelectedDeposit}
            disabled={!selectedBank}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الوديعة" />
            </SelectTrigger>
            <SelectContent>
              {availableDeposits.map((deposit) => (
                <SelectItem key={deposit.id} value={deposit.id}>
                  {deposit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>مبلغ الاستثمار</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Button className="flex-1" onClick={calculateProfit}>
          <Calculator className="w-4 h-4 ml-2" />
          حساب الأرباح
        </Button>

        <Button variant="outline" onClick={reset}>
          إعادة تعيين
        </Button>
      </div>

      {result && selectedBank && selectedDeposit && (() => {
        const bank = banks.find((b) => b.id === selectedBank);
        const deposit = bank?.deposits.find((d) => d.id === selectedDeposit);
        if (!deposit) return null;

        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                نتيجة الحساب
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center p-4 border rounded-lg">
                <p>
                  {deposit.type === "monthly"
                    ? "الربح الشهري"
                    : deposit.type === "quarterly"
                    ? "الربح ربع السنوي"
                    : deposit.type === "annual"
                    ? "الربح السنوي"
                    : deposit.type === "upfront"
                    ? "العائد المقدم"
                    : "العائد عند الاستحقاق"}
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {result.periodicProfit.toLocaleString("ar-EG", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  ج.م
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <p>إجمالي الربح</p>
                <p className="text-2xl font-bold">
                  {result.totalProfit.toLocaleString("ar-EG")} ج.م
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <p>الإجمالي النهائي</p>
                <p className="text-2xl font-bold text-primary">
                  {result.totalAmount.toLocaleString("ar-EG")} ج.م
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })()}
    </div>
  );
}
