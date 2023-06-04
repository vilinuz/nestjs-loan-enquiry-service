import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FilterTypeException } from './filter.type.exception';
import { LoanExceptionFilter } from './loan.exception.filter';

@Catch(FilterTypeException)
export class FilterTypeExceptionFilter
  extends LoanExceptionFilter
  implements ExceptionFilter
{
  catch(exception: FilterTypeException, host: ArgumentsHost) {
    this.handle(exception, host);
  }
}
