import { Controller } from '@nestjs/common';
import { LoanService } from './loan.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CustomFilter,
  DefaultedLoanByYear,
  Loan,
  LoanById,
  LoanDistributionByDateRange,
  Loans,
} from './interfaces/loan.interfaces';

@Controller()
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @GrpcMethod('LoanService', 'FindLoanById')
  async getLoanById(loanById: LoanById): Promise<Loan> {
    return this.loanService.getLoanById(loanById.id);
  }

  @GrpcMethod('LoanService', 'FindLoansByYear')
  async getDefaultedLoansByYear(
    defaultedLoanByYear: DefaultedLoanByYear,
  ): Promise<Loans> {
    if (defaultedLoanByYear.currency) {
      return this.loanService.getDefaultLoansByYearWithForeignCurrency(
        Number(defaultedLoanByYear.year),
        defaultedLoanByYear.currency,
      );
    }

    return this.loanService.getDefaultedLoansByYear(
      Number(defaultedLoanByYear.year),
    );
  }

  @GrpcMethod('LoanService', 'FindLoansDistributionByDateRange')
  async getDefaultLoansDistribution(
    loanDistributionByDateRange: LoanDistributionByDateRange,
  ) {
    const { startDate, endDate } = loanDistributionByDateRange;
    return this.loanService.getLoansDistributionByDateRange(startDate, endDate);
  }

  @GrpcMethod('LoanService', 'FindLoansWithCustomFilter')
  async getLoansWithCustomFilter(filter: CustomFilter): Promise<Loans> {
    return this.loanService.getLoansBy(filter);
  }
}
