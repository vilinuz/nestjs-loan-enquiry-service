import Excel from 'exceljs';
import { Injectable } from '@nestjs/common';
import { MaritalStatus } from '../constants';
import { LoanEntity } from '../entities/loan.entity';
import { Education } from '../constants/education';

@Injectable()
export class LoanHelper {
  stringToEnum<T>(enm: { [s: string]: T }, value: string): T | undefined {
    const result = (Object.values(enm) as unknown as string[]).includes(value)
      ? (value as unknown as T)
      : undefined;

    return result;
  }

  getCellValue = (row: Excel.Row, cellIndex: number): string => {
    const cell = row.getCell(cellIndex);
    return cell.value ? cell.value.toString() : '';
  };

  mapLoanRecords = (rows: Excel.Row[]): LoanEntity[] => {
    return rows.map((raw) => {
      return {
        id: this.getCellValue(raw, 2),
        date: new Date(this.getCellValue(raw, 1)),
        balance: Number(this.getCellValue(raw, 8)),
        isDefault: Boolean(this.getCellValue(raw, 7) == 'yes'),
        age: Number(this.getCellValue(raw, 3)),
        job: this.getCellValue(raw, 4),
        education: this.stringToEnum(Education, this.getCellValue(raw, 6)),
        maritalStatus: this.stringToEnum(
          MaritalStatus,
          this.getCellValue(raw, 5),
        ),
      };
    });
  };

  isInDateRange = (date: Date, startDate: Date, endDate: Date): boolean => {
    return (
      this.normalizeDate(startDate) < date && date < this.normalizeDate(endDate)
    );
  };

  normalizeDate = (date: Date): Date => {
    return new Date(date);
  };
}
