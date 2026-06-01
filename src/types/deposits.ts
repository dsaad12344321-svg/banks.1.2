export interface Deposit {
  id: string;
  name: string;

  duration: number;

  interestRate: number;

  returnType?: "fixed" | "variable" | "graduated";

  graduatedRates?: {
    year1: number;
    year2: number;
    year3: number;
  };

  type: "monthly" | "quarterly" | "annual";

  minAmount: number;

  description: string;

  features: string[];
}

export interface Bank {
  id: string;
  name: string;
  logo: string;

  deposits: Deposit[];
}