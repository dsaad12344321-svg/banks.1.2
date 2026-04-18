'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { motion } from 'framer-motion';
import { Banknote, Percent, Calendar, Coins } from 'lucide-react';

/* =========================
   Types
========================= */

interface Certificate {
  id: string;
  name: string;
  duration: number;
  interestRate: number;
  returnType: 'fixed' | 'variable' | 'graduated';
  graduatedRates?: {
    year1: number;
    year2: number;
    year3: number;
  };
  type: 'monthly' | 'quarterly' | 'annual';
  minAmount: number;
  description: string;
  features: string[];
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  certificates: Certificate[];
}

/* =========================
   Maps
========================= */

const returnTypeMap = {
  fixed: 'ثابت',
  variable: 'متغير',
  graduated: 'متدرج',
};

const payoutMap = {
  monthly: 'شهري',
  quarterly: 'ربع سنوي',
  annual: 'سنوي',
};

/* =========================
   Example Logic
========================= */

const EXAMPLE_AMOUNT = 100000;

type ExampleResult =
  | {
      type: 'fixed-monthly';
      monthly: number;
      total: number;
    }
  | {
      type: 'fixed-quarterly';
      quarterly: number;
      total: number;
    }
  | {
      type: 'graduated';
      yearly: { y1: number; y2: number; y3: number };
      monthly: { y1: number; y2: number; y3: number };
      total: number;
    }
  | {
      type: 'fixed';
      monthly: number;
      total: number;
    };

function calculateExample(cert: Certificate): ExampleResult {
  const principal = EXAMPLE_AMOUNT;

  // FIXED MONTHLY
  if (cert.returnType === 'fixed' && cert.type === 'monthly') {
    const monthly = (principal * (cert.interestRate / 100)) / 12;

    return {
      type: 'fixed-monthly',
      monthly,
      total: monthly * 12 * (cert.duration / 12),
    };
  }

  // FIXED QUARTERLY
  if (cert.returnType === 'fixed' && cert.type === 'quarterly') {
    const quarterly = (principal * (cert.interestRate / 100)) / 4;

    return {
      type: 'fixed-quarterly',
      quarterly,
      total: quarterly * 4 * (cert.duration / 12),
    };
  }

  // GRADUATED
  if (cert.returnType === 'graduated' && cert.graduatedRates) {
    const y1 = principal * (cert.graduatedRates.year1 / 100);
    const y2 = principal * (cert.graduatedRates.year2 / 100);
    const y3 = principal * (cert.graduatedRates.year3 / 100);

    return {
      type: 'graduated',
      yearly: { y1, y2, y3 },
      monthly: {
        y1: y1 / 12,
        y2: y2 / 12,
        y3: y3 / 12,
      },
      total: y1 + y2 + y3,
    };
  }

  // DEFAULT FIXED
  const monthly = (principal * (cert.interestRate / 100)) / 12;

  return {
    type: 'fixed',
    monthly,
    total: monthly * 12 * (cert.duration / 12),
  };
}

/* =========================
   Component
========================= */

export default function BanksAccordion({
  banks,
}: {
  banks: Bank[];
}) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
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
              <Accordion type="multiple" className="space-y-3 pr-4">
                {bank.certificates.map((cert) => (
                  <AccordionItem
                    key={cert.id}
                    value={cert.id}
                    className="border rounded-xl px-3 bg-muted/40"
                  >
                    <AccordionTrigger className="py-3 font-semibold hover:no-underline">
                      {cert.name}
                    </AccordionTrigger>

                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-sm"
                      >
                        {/* INFO */}
                        <div className="grid grid-cols-2 gap-3">
                          <InfoItem icon={<Calendar size={16} />} label="المدة">
                            {cert.duration / 12} سنوات
                          </InfoItem>

                          <InfoItem icon={<Percent size={16} />} label="العائد">
                            {returnTypeMap[cert.returnType]}
                          </InfoItem>

                          <InfoItem icon={<Coins size={16} />} label="الدورية">
                            {payoutMap[cert.type]}
                          </InfoItem>

                          <InfoItem icon={<Banknote size={16} />} label="الحد الأدنى">
                            {cert.minAmount.toLocaleString()} جنيه
                          </InfoItem>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-muted-foreground">
                          {cert.description}
                        </p>

                        {/* FEATURES */}
                        <ul className="list-disc pr-5 space-y-1">
                          {cert.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>

                        {/* =========================
                            EXAMPLE 100K
                        ========================= */}
                        <div className="bg-primary/5 border rounded-xl p-3">
                          <p className="font-semibold mb-2">
                            مثال عملي (100,000 جنيه):
                          </p>

                          {(() => {
                            const res = calculateExample(cert);

                            if (res.type === 'fixed-monthly') {
                              return (
                                <div>
                                  <p>
                                    العائد الشهري:{' '}
                                    <span className="font-bold text-primary">
                                      {res.monthly.toLocaleString(undefined, {
                                        maximumFractionDigits: 2,
                                      })}{' '}
                                      ج.م
                                    </span>
                                  </p>
                                  <p>
                                    الإجمالي:{' '}
                                    <span className="font-bold">
                                      {res.total.toLocaleString()} ج.م
                                    </span>
                                  </p>
                                </div>
                              );
                            }

                            if (res.type === 'fixed-quarterly') {
                              return (
                                <div>
                                  <p>
                                    كل 3 شهور:{' '}
                                    <span className="font-bold text-primary">
                                      {res.quarterly.toLocaleString(undefined, {
                                        maximumFractionDigits: 2,
                                      })}{' '}
                                      ج.م
                                    </span>
                                  </p>
                                  <p>
                                    الإجمالي:{' '}
                                    <span className="font-bold">
                                      {res.total.toLocaleString()} ج.م
                                    </span>
                                  </p>
                                </div>
                              );
                            }

                            if (res.type === 'graduated') {
                              return (
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-semibold">سنوي:</p>
                                    <p>الأولى: {res.yearly.y1.toLocaleString()} ج.م</p>
                                    <p>الثانية: {res.yearly.y2.toLocaleString()} ج.م</p>
                                    <p>الثالثة: {res.yearly.y3.toLocaleString()} ج.م</p>
                                  </div>

                                  <div>
                                    <p className="font-semibold">شهري:</p>
                                    <p>الأولى: {res.monthly.y1.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
                                    <p>الثانية: {res.monthly.y2.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
                                    <p>الثالثة: {res.monthly.y3.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
                                  </div>

                                  <p className="font-bold text-primary">
                                    الإجمالي: {res.total.toLocaleString()} ج.م
                                  </p>
                                </div>
                              );
                            }

                            return (
                              <div>
                                <p>
                                  العائد الشهري:{' '}
                                  <span className="font-bold text-primary">
                                    {res.monthly.toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })}{' '}
                                    ج.م
                                  </span>
                                </p>
                                <p>
                                  الإجمالي:{' '}
                                  <span className="font-bold">
                                    {res.total.toLocaleString()} ج.م
                                  </span>
                                </p>
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
      <div className="text-primary">{icon}</div>
      <div className="text-xs">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold">{children}</p>
      </div>
    </div>
  );
}
