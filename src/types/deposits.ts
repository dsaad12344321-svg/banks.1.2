export interface Deposit {
  id: string;
  name: string;
  duration: number;
  interestRate: number;

  returnType: "fixed";

  type:
    | "monthly"
    | "quarterly"
    | "annual"
    | "upfront"
    | "maturity";

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
