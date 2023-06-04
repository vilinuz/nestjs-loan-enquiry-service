import { LoanEntity } from '../entities/loan.entity';
import { CustomFilter } from './loan.interfaces';

export interface LoanDataStore {
  getLoanById(id: string): Promise<LoanEntity>;

  /**
   * Retrieve loans in particular date range with additional filter.
   * @param startDate - the start date
   * @param endDate - the end date
   * @param filterAction - callback for additional filtering
   */
  getLoansInDateRange(
    startDate: Date,
    endDate: Date,
    filterAction?: (filterProperty: LoanEntity) => boolean,
  ): Promise<LoanEntity[]>;

  getLoansBy(filter: CustomFilter): Promise<LoanEntity[]>;

  /**
   * Retrieve all loans.
   */
  getAllLoans(): Promise<LoanEntity[]>;
}

export const LoanDataStore = Symbol('LoanDataStore');
