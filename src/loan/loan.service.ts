import { Inject, Injectable } from '@nestjs/common';
import { ExchangeRateService } from './exchange/exchange.rate.service';
import { DefaultCurrency } from './constants';
import { LoanDataStore } from './interfaces/loan.data.store';
import {
  CustomFilter,
  Loan,
  LoanDistributionByDateRange,
  Loans,
  LoansDistribution,
} from './interfaces/loan.interfaces';

@Injectable()
export class LoanService {
  constructor(
    @Inject('LoanDataStore') private readonly loanDataStore: LoanDataStore,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  /**
   * Get loans by id.
   * @param id - the primary key of the loan
   */
  async getLoanById(id: string): Promise<Loan> {
    return this.loanDataStore.getLoanById(id);
  }

  /**
   * Get defaulted loans by year. Includes balance in the response.
   * @param year - the year for which we want to get defaulted loans
   */
  async getDefaultedLoansByYear(year: number): Promise<Loans> {
    const { startDate, endDate } = this.map(year);

    const loans: Loan[] = await this.loanDataStore.getLoansInDateRange(
      startDate,
      endDate,
      (loan: Loan) => loan.isDefault,
    );

    return { loans: loans };
  }

  /**
   * Get defaulted loans by year with foreign currency.
   * It will exchange balance to given currency.
   * @param year - the year for which we want to get defaulted loans
   * @param toCurrency - the foreign currency to which we want to exchange balance
   */
  async getDefaultLoansByYearWithForeignCurrency(
    year: number,
    toCurrency: string,
  ): Promise<Loans> {
    const defaultedLoans = await this.getDefaultedLoansByYear(year);

    const exchangedBalance = await this.exchangeRateService.exchange(
      1,
      DefaultCurrency,
      toCurrency,
    );

    const result = defaultedLoans.loans.map((loan) => {
      return {
        ...loan,
        balance: exchangedBalance.balance * loan.balance,
        currency: exchangedBalance.currency,
      };
    });

    return { loans: result };
  }

  async getLoansBy(filterBody: CustomFilter): Promise<Loans> {
    const loans = await this.loanDataStore.getLoansBy({
      type: filterBody.type,
      value: filterBody.value,
    });

    return { loans: loans };
  }

  async getLoansDistributionByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<LoansDistribution> {
    const allLoans = await this.loanDataStore.getLoansInDateRange(
      startDate,
      endDate,
    );
    const allDefaultLoans = await this.loanDataStore.getLoansInDateRange(
      startDate,
      endDate,
      (loan: Loan) => loan.isDefault,
    );

    return {
      allLoansCount: allLoans.length,
      defaultedLoansCount: allDefaultLoans.length,
      goodLoansCount: allLoans.length - allDefaultLoans.length,
    };
  }

  private map(year: number): LoanDistributionByDateRange {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    return {
      startDate: startDate,
      endDate: endDate,
    };
  }
}
