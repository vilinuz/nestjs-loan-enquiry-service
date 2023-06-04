import { Injectable } from '@nestjs/common';
import { FilterType, MaritalStatus } from '../constants';
import { LoanHelper } from './loan.helper';
import { LoanEntity } from '../entities/loan.entity';
import { FilterTypeException } from '../errors/filter.type.exception';
import { FilterValueException } from '../errors/filter.value.exception';
import { Education } from '../constants/education';
import { CustomFilter } from '../interfaces/loan.interfaces';

/**
 * This class is responsible for resolving the filter type to a function
 * that can be used to filter the loans.
 * TODO: Validate the filter type and value
 */
@Injectable()
export class LoanFilterResolver {
  constructor(private readonly loanHelper: LoanHelper) {}

  public resolve(filter: CustomFilter): // The function used to filter the loans
  (loan: LoanEntity) => boolean {
    const value = filter.value;

    if (!value) {
      throw new FilterValueException('The filter value cannot be empty');
    }

    switch (filter.type) {
      case FilterType.ByAge:
        return (loan: LoanEntity) => loan.age === Number(value);
      case FilterType.ByMaritalStatus:
        return (loan: LoanEntity) =>
          loan.maritalStatus ===
          this.loanHelper.stringToEnum(MaritalStatus, value);
      case FilterType.ByEducation:
        return (loan: LoanEntity) =>
          loan.education === this.loanHelper.stringToEnum(Education, value);
      case FilterType.ByJob:
        return (loan: LoanEntity) => loan.job === String(value);
      default:
        throw new FilterTypeException(filter.type);
    }
  }
}
