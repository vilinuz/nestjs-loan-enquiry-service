export class FilterValueException extends Error {
  constructor(value: string) {
    super(`Invalid filter value ${value}. `);
  }
}
