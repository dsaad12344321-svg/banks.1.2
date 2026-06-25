"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScheduleRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export default function LoanCalculatorClient() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);

  const calculateLoan = () => {
    const principal = Number(amount);
    const annualRate = Number(rate);
    const duration = Number(months);

    if (
      !principal ||
      !annualRate ||
      !duration ||
      principal <= 0 ||
      annualRate <= 0 ||
      duration <= 0
    ) {
      return;
    }

    const monthlyRate = annualRate / 100 / 12;

    const payment =
      principal *
      ((monthlyRate * Math.pow(1 + monthlyRate, duration)) /
        (Math.pow(1 + monthlyRate, duration) - 1));

    let balance = principal;
    const rows: ScheduleRow[] = [];
    let interestSum = 0;

    for (let month = 1; month <= duration; month++) {
      const interest = balance * monthlyRate;
      const principalPart = payment - interest;

      balance -= principalPart;

      if (balance < 0) balance = 0;

      interestSum += interest;

      rows.push({
        month,
        payment,
        interest,
        principal: principalPart,
        balance,
      });
    }

    setMonthlyPayment(payment);
    setTotalPaid(payment * duration);
    setTotalInterest(interestSum);
    setSchedule(rows);
  };

  return (
    <div className="space-y-6">

      {/* Inputs */}
      <div className="grid gap-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            مبلغ القرض (ج.م)
          </label>
          <Input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100000"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            الفائدة السنوية (%)
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="20"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            مدة القرض (بالأشهر)
          </label>
          <Input
            type="number"
            min="1"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="12"
          />
        </div>

        <Button onClick={calculateLoan}>
          عرض النتائج والجدول
        </Button>

      </div>

      {/* Results */}
      {monthlyPayment !== null && (
        <>
          <div className="rounded-xl border bg-card p-6 text-center space-y-3">

            <div className="text-lg font-semibold">
              القسط الشهري:
              {" "}
              {monthlyPayment.toFixed(2)}
              {" "}
              ج.م
            </div>

            <div className="text-lg font-semibold">
              إجمالي المبلغ المدفوع:
              {" "}
              {totalPaid?.toFixed(2)}
              {" "}
              ج.م
            </div>

            <div className="text-lg font-semibold">
              إجمالي الفوائد المستحقة:
              {" "}
              {totalInterest?.toFixed(2)}
              {" "}
              ج.م
            </div>

          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse border text-center">

              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="border p-3">م</th>
                  <th className="border p-3">القسط</th>
                  <th className="border p-3">الفائدة</th>
                  <th className="border p-3">أصل القرض</th>
                  <th className="border p-3">الرصيد المتبقي</th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td className="border p-2">
                      {row.month}
                    </td>

                    <td className="border p-2">
                      {row.payment.toFixed(2)}
                    </td>

                    <td className="border p-2">
                      {row.interest.toFixed(2)}
                    </td>

                    <td className="border p-2">
                      {row.principal.toFixed(2)}
                    </td>

                    <td className="border p-2">
                      {row.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </>
      )}

    </div>
  );
}
