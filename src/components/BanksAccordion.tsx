'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { motion } from 'framer-motion';
import { Banknote, Percent, Calendar, Coins } from 'lucide-react';

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

export default function BanksAccordion({ banks }: { banks: Bank[] }) {
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
              <div className="flex items-center gap-3 text-right w-full">
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
              {/* CERTIFICATES */}
              <Accordion type="multiple" className="space-y-3 pr-4">
                {bank.certificates.map((cert) => (
                  <AccordionItem
                    key={cert.id}
                    value={cert.id}
                    className="border rounded-xl px-3 bg-muted/40"
                  >
                    <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                      {cert.name}
                    </AccordionTrigger>

                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-sm"
                      >
                        {/* INFO GRID */}
                        <div className="grid grid-cols-2 gap-3">

                          <InfoItem icon={<Calendar size={16} />} label="المدة">
                            {cert.duration/12} سنوات
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

                        {/* GRADUATED */}
                        {cert.returnType === 'graduated' && cert.graduatedRates && (
                          <div className="bg-background border rounded-xl p-3">
                            <p className="font-semibold mb-2">العائد المتدرج:</p>
                            <div className="flex justify-between text-sm">
                              <span>السنة الأولى:{cert.graduatedRates.year1}%</span>
                              <span>السنة الثانية:{cert.graduatedRates.year2}%</span>
                              <span>السنة الثالثة:{cert.graduatedRates.year3}%</span>
                            </div>
                          </div>
                        )}

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
   Reusable Info Item
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
