import { FilterType, MaritalStatus } from '../constants';
import { Education } from '../constants/education';

export interface Loan {
  id: string;
  date: Date;
  isDefault: boolean;
  job: string;
  age: number;
  maritalStatus: MaritalStatus;
  education: Education;
  balance?: number;
  currency?: string;
}

export interface Loans {
  loans: Loan[];
}

export interface LoanById {
  id: string;
}

export interface DefaultedLoanByYear {
  year: string;
  currency?: string;
}

export interface LoanDistributionByDateRange {
  startDate: Date;
  endDate: Date;
}

export interface LoansDistribution {
  defaultedLoansCount: number;
  goodLoansCount: number;
  allLoansCount: number;
}

export interface CustomFilter {
  type: FilterType;
  value: string;
}
