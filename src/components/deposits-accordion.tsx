import type { Bank } from "@/types/deposits";

interface DepositsAccordionProps {
  banks: Bank[];
}

export default function DepositsAccordion({
  banks,
}: DepositsAccordionProps) {
  return (
    <div className="space-y-6">
      {banks.map((bank) => (
        <div
          key={bank.id}
          className="border rounded-lg p-4"
        >
          <h3 className="font-bold text-lg mb-3">
            {bank.name}
          </h3>

          {(bank.deposits || []).map((deposit) => (
            <div
              key={deposit.id}
              className="border rounded p-3 mb-2"
            >
              <h4 className="font-semibold">
                {deposit.name}
              </h4>

              <p>
                العائد: {deposit.interestRate}%
              </p>

              <p>
                المدة: {deposit.duration} شهر
              </p>

              <p>
                الحد الأدنى:
                {" "}
                {deposit.minAmount.toLocaleString()}
                {" "}
                جنيه
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}