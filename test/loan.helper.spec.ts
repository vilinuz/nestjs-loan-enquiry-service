import { MaritalStatus } from '../src/loan/constants';
import { LoanHelper } from '../src/loan/helpers/loan.helper';

describe('test_to_marital_status', () => {
  it(':should correctly map string values to MaritalStatus enum values', () => {
    const loanHelper = new LoanHelper();
    expect(loanHelper.stringToEnum(MaritalStatus, 'married')).toEqual(
      MaritalStatus.Married,
    );
    expect(loanHelper.stringToEnum(MaritalStatus, 'single')).toEqual(
      MaritalStatus.Single,
    );
    expect(loanHelper.stringToEnum(MaritalStatus, 'divorced')).toEqual(
      MaritalStatus.Divorced,
    );
    expect(loanHelper.stringToEnum(MaritalStatus, 'other')).toBeUndefined();
  });
});

describe('test_get_cell_value', () => {
  it(':should correctly map string values to Date', () => {
    const loanHelper = new LoanHelper();
    const row = {
      getCell: (cellIndex: number) => {
        return {
          value: 'test',
        };
      },
    } as any;
    expect(loanHelper.getCellValue(row, 1)).toEqual('test');
  });
});
