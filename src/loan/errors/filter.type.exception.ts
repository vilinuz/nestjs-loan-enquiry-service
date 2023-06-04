import { FilterType } from '../constants';

export class FilterTypeException extends Error {
  constructor(type: FilterType) {
    super(`Invalid filter type ${type}`);
  }
}
