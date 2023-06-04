import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FilterTypeException } from './filter.type.exception';
import { FilterValueException } from './filter.value.exception';
import { LoanExceptionFilter } from './loan.exception.filter';

@Catch(FilterValueException)
export class FilterValueExceptionFilter
  extends LoanExceptionFilter
  implements ExceptionFilter
{
  catch(exception: FilterTypeException, host: ArgumentsHost) {
    this.handle(exception, host);
  }
}
