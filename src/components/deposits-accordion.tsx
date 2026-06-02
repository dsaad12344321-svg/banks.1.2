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

import type {
  Bank,
  Deposit,
} from '@/types/deposits';

/* =========================
   Maps
========================= */

const payoutMap = {
  monthly: 'شهري',
  quarterly: 'ربع سنوي',
  annual: 'سنوي',
};

/* =========================
   Example Logic
========================= */

const EXAMPLE_AMOUNT = 100000;

function calculateExample(
  deposit: Deposit
) {
  const principal = EXAMPLE_AMOUNT;

  if (deposit.type === 'monthly') {
    const monthly =
      (principal *
        (deposit.interestRate / 100)) /
      12;

    return {
      type: 'monthly',
      monthly,
      total:
        monthly *
        deposit.duration,
    };
  }

  if (deposit.type === 'quarterly') {
    const quarterly =
      (principal *
        (deposit.interestRate / 100)) /
      4;

    return {
      type: 'quarterly',
      quarterly,
      total:
        quarterly *
        (deposit.duration / 3),
    };
  }

  const annual =
    principal *
    (deposit.interestRate / 100);

  return {
    type: 'annual',
    annual,
    total:
      annual *
      (deposit.duration / 12),
  };
}

/* =========================
   Component
========================= */

export default function DepositsAccordion({
  banks,
}: {
  banks: Bank[];
}) {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        {banks.map((bank) => (
          <AccordionItem
            key={bank.id}
            value={bank.id}
            className="border rounded-2xl px-4 shadow-sm bg-card"
          >
            {/* BANK HEADER */}

            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3 w-full text-right">
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-8 h-8 object-contain"
                />

                <span className="text-lg font-bold">
                  {bank.name}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <Accordion
                type="multiple"
                className="space-y-3 pr-4"
              >
                {bank.deposits.map(
                  (deposit) => (
                    <AccordionItem
                      key={deposit.id}
                      value={deposit.id}
                      className="border rounded-xl px-3 bg-muted/40"
                    >
                      <AccordionTrigger className="py-3 font-semibold hover:no-underline">
                        {deposit.name}
                      </AccordionTrigger>

                      <AccordionContent>
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="space-y-4 text-sm"
                        >
                          {/* INFO */}

                          <div className="grid grid-cols-2 gap-3">
                            <InfoItem
                              icon={
                                <Calendar size={16} />
                              }
                              label="المدة"
                            >
                              {deposit.duration}{' '}
                              شهر
                            </InfoItem>

                            <InfoItem
                              icon={
                                <Percent size={16} />
                              }
                              label="العائد"
                            >
                              {deposit.interestRate}%
                            </InfoItem>

                            <InfoItem
                              icon={
                                <Coins size={16} />
                              }
                              label="الدورية"
                            >
                              {
                                payoutMap[
                                  deposit.type
                                ]
                              }
                            </InfoItem>

                            <InfoItem
                              icon={
                                <Banknote size={16} />
                              }
                              label="الحد الأدنى"
                            >
                              {deposit.minAmount.toLocaleString()}{' '}
                              جنيه
                            </InfoItem>
                          </div>

                          {/* DESCRIPTION */}

                          <p className="text-muted-foreground">
                            {
                              deposit.description
                            }
                          </p>

                          {/* FEATURES */}

                          <ul className="list-disc pr-5 space-y-1">
                            {deposit.features.map(
                              (
                                feature,
                                index
                              ) => (
                                <li
                                  key={index}
                                >
                                  {feature}
                                </li>
                              )
                            )}
                          </ul>

                          {/* EXAMPLE */}

                          <div className="bg-primary/5 border rounded-xl p-3">
                            <p className="font-semibold mb-2">
                              مثال عملي
                              (100,000 جنيه):
                            </p>

                            {(() => {
                              const result =
                                calculateExample(
                                  deposit
                                );

                              if (
                                result.type ===
                                'monthly'
                              ) {
                                return (
                                  <div>
                                    <p>
                                      العائد
                                      الشهري:{' '}
                                      <span className="font-bold text-primary">
                                        {result.monthly.toLocaleString(
                                          undefined,
                                          {
                                            maximumFractionDigits: 2,
                                          }
                                        )}{' '}
                                        ج.م
                                      </span>
                                    </p>

                                    <p>
                                      إجمالي
                                      الأرباح:{' '}
                                      <span className="font-bold">
                                        {result.total.toLocaleString(
                                          undefined,
                                          {
                                            maximumFractionDigits: 2,
                                          }
                                        )}{' '}
                                        ج.م
                                      </span>
                                    </p>
                                  </div>
                                );
                              }

                              if (
                                result.type ===
                                'quarterly'
                              ) {
                                return (
                                  <div>
                                    <p>
                                      العائد
                                      كل 3
                                      شهور:{' '}
                                      <span className="font-bold text-primary">
                                        {result.quarterly.toLocaleString(
                                          undefined,
                                          {
                                            maximumFractionDigits: 2,
                                          }
                                        )}{' '}
                                        ج.م
                                      </span>
                                    </p>

                                    <p>
                                      إجمالي
                                      الأرباح:{' '}
                                      <span className="font-bold">
                                        {result.total.toLocaleString(
                                          undefined,
                                          {
                                            maximumFractionDigits: 2,
                                          }
                                        )}{' '}
                                        ج.م
                                      </span>
                                    </p>
                                  </div>
                                );
                              }

                              return (
                                <div>
                                  <p>
                                    العائد
                                    السنوي:{' '}
                                    <span className="font-bold text-primary">
                                      {result.annual.toLocaleString(
                                        undefined,
                                        {
                                          maximumFractionDigits: 2,
                                        }
                                      )}{' '}
                                      ج.م
                                    </span>
                                  </p>

                                  <p>
                                    إجمالي
                                    الأرباح:{' '}
                                    <span className="font-bold">
                                      {result.total.toLocaleString(
                                        undefined,
                                        {
                                          maximumFractionDigits: 2,
                                        }
                                      )}{' '}
                                      ج.م
                                    </span>
                                  </p>
                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

/* =========================
   Info Component
========================= */

function InfoItem({
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
      <div className="text-primary">
        {icon}
      </div>

      <div className="text-xs">
        <p className="text-muted-foreground">
          {label}
        </p>

        <p className="font-semibold">
          {children}
        </p>
      </div>
    </div>
  );
}
