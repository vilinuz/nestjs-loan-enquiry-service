import { Workbook } from 'exceljs';
import { Injectable } from '@nestjs/common';
import { LoanHelper } from '../helpers/loan.helper';
import { LoanDataStore } from '../interfaces/loan.data.store';
import { LoanEntity } from '../entities/loan.entity';
import { LoanFilterResolver } from '../helpers/loan.filter.resolver';
import { CustomFilter } from '../interfaces/loan.interfaces';

@Injectable()
export class ExcelLoanDataStore implements LoanDataStore {
  loans: LoanEntity[] = [];

  constructor(
    private readonly loanHelper: LoanHelper,
    private readonly filterResolver: LoanFilterResolver,
  ) {
    this.initDataSet().then(() => {
      console.log('Loan DataSet initialized successfully');
    });
  }

  async initDataSet(): Promise<void> {
    const workbook = new Workbook();
    const content = await workbook.xlsx.readFile('LoanDataset.xlsx');

    const worksheet = content.worksheets[0];
    const rows = worksheet.getRows(4, worksheet.rowCount) ?? [];

    this.loans = this.loanHelper.mapLoanRecords(rows);
  }

  async getLoanById(id: string): Promise<LoanEntity> {
    return this.loans.find((loan) => loan.id === id);
  }

  /**
   * Retrieve loans in particular date range with additional filter.
   * @param startDate - the start date
   * @param endDate - the end date
   * @param filterAction - callback for additional filtering
   */
  async getLoansInDateRange(
    startDate: Date,
    endDate: Date,
    filterAction: (filterProperty: LoanEntity) => boolean,
  ): Promise<LoanEntity[]> {
    return this.loans.filter((loan) =>
      this.loanHelper.isInDateRange(loan.date, startDate, endDate) &&
      filterAction
        ? filterAction(loan)
        : true,
    );
  }

  async getLoansBy(filter: CustomFilter): Promise<LoanEntity[]> {
    const filterAction = this.filterResolver.resolve(filter);
    return this.loans.filter(filterAction);
  }

  getAllLoans(): Promise<LoanEntity[]> {
    return Promise.resolve(this.loans);
  }
}
