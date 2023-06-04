import { LoanHelper } from '../src/loan/helpers/loan.helper';
import { LoanDatasetLoader } from '../src/loan/datastore/loan-dataset-loader.service';

it('test_excel_loan_storage_initialization', async () => {
  const loanHelper = new LoanHelper();
  const excelLoanStorage = await new LoanDatasetLoader(loanHelper);
  expect(excelLoanStorage.loans.length).toBeGreaterThan(0);
});

it('test_excel_loan_storage_get_loan_by_id', async () => {
  const loanHelper = new LoanHelper();
  const excelLoanStorage = await new LoanDatasetLoader(loanHelper);
  const loan = await excelLoanStorage.getLoanById('1');
  expect(loan.id).toEqual('1');
});

it('test_excel_loan_storage_get_defaulted_loans_by_dates_range', async () => {
  const loanHelper = new LoanHelper();
  const excelLoanStorage = await new LoanDatasetLoader(loanHelper);
  const loans = await excelLoanStorage.getDefaultedLoansByDatesRange({
    startDate: new Date(2019, 1, 1),
    endDate: new Date(2021, 1, 1),
  });
  expect(loans.length).toBeGreaterThan(0);
});

it('test_excel_loan_storage_get_all_loans', async () => {
  const loanHelper = new LoanHelper();
  const excelLoanStorage = await new LoanDatasetLoader(loanHelper);
  const loans = await excelLoanStorage.getLoansInDateRange(
    new Date(2023, 1, 1),
    new Date(2023, 11, 31),
    () => true,
  );
  expect(loans.length).toBeGreaterThan(0);
});

it('test_excel_loan_storage_get_loans_by', async () => {
  const loanHelper = new LoanHelper();
  const excelLoanStorage = await new LoanDatasetLoader(loanHelper);
  const loans = await excelLoanStorage.getLoansBy((loan) => loan.id === '1');
  expect(loans.length).toBeGreaterThan(0);
});
