'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { motion } from 'framer-motion';
import {
  Banknote,
  Percent,
  Calendar,
  Coins,
} from 'lucide-react';

import type { Bank, Deposit } from '@/types/deposits';

const payoutMap = {
  monthly: 'شهري',
  quarterly: 'ربع سنوي',
  annual: 'سنوي',
  upfront: 'مقدم',
  maturity: 'نهاية المدة',
};

const EXAMPLE_AMOUNT = 100000;

function calculateExample(deposit: Deposit) {
  const principal = EXAMPLE_AMOUNT;

  switch (deposit.type) {
    case "monthly": {
      const monthly = (principal * deposit.interestRate) / 100 / 12;
      return { type: "monthly", monthly, total: monthly * deposit.duration };
    }

    case "quarterly": {
      const quarterly = (principal * deposit.interestRate) / 100 / 4;
      return { type: "quarterly", quarterly, total: quarterly * (deposit.duration / 3) };
    }

    case "annual": {
      const annual = (principal * deposit.interestRate) / 100;
      return { type: "annual", annual, total: annual * (deposit.duration / 12) };
    }

    case "upfront":
    case "maturity": {
      const total =
        principal * (deposit.interestRate / 100) * (deposit.duration / 12);
      return { type: deposit.type, total };
    }

    default:
      return { type: "annual", annual: 0, total: 0 };
  }
}

export default function DepositsAccordion({ banks }: { banks: Bank[] }) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {banks.map((bank) => (
          <AccordionItem
            key={bank.id}
            value={bank.id}
            className="border rounded-2xl px-4 shadow-sm bg-card"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3 w-full text-right">
                <img src={bank.logo} alt={bank.name} className="w-8 h-8" />
                <span className="text-lg font-bold">{bank.name}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <Accordion type="multiple" className="space-y-3 pr-4">
                {bank.deposits.map((deposit) => (
                  <AccordionItem
                    key={deposit.id}
                    value={deposit.id}
                    className="border rounded-xl px-3 bg-muted/40"
                  >
                    <AccordionTrigger className="py-3 font-semibold">
                      {deposit.name}
                    </AccordionTrigger>

                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-sm"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <Info icon={<Calendar size={16} />} label="المدة">
                            {deposit.duration} شهر
                          </Info>

                          <Info icon={<Percent size={16} />} label="العائد">
                            {deposit.interestRate}%
                          </Info>

                          <Info icon={<Coins size={16} />} label="الدورية">
                            {payoutMap[deposit.type]}
                          </Info>

                          <Info icon={<Banknote size={16} />} label="الحد الأدنى">
                            {deposit.minAmount.toLocaleString()} جنيه
                          </Info>
                        </div>

                        <p className="text-muted-foreground">
                          {deposit.description}
                        </p>

                        <ul className="list-disc pr-5 space-y-1">
                          {deposit.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>

                        <div className="bg-primary/5 border rounded-xl p-3">
                          <p className="font-semibold mb-2">
                            مثال عملي (100,000 جنيه):
                          </p>

                          {(() => {
                            const res = calculateExample(deposit);

                            if (res.type === "monthly") {
                              return (
                                <div>
                                  <p>شهري: {res.monthly.toLocaleString()} ج.م</p>
                                  <p>الإجمالي: {res.total.toLocaleString()} ج.م</p>
                                </div>
                              );
                            }

                            if (res.type === "quarterly") {
                              return (
                                <div>
                                  <p>كل 3 شهور: {res.quarterly.toLocaleString()} ج.م</p>
                                  <p>الإجمالي: {res.total.toLocaleString()} ج.م</p>
                                </div>
                              );
                            }

                            return (
                              <div>
                                <p>العائد: {res.total.toLocaleString()} ج.م</p>
                              </div>
                            );
                          })()}
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function Info({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 bg-background border rounded-lg p-2">
      <div className="text-primary">{icon}</div>
      <div className="text-xs">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold">{children}</p>
      </div>
    </div>
  );
}
