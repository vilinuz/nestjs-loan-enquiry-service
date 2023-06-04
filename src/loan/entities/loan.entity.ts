import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { FilterType, MaritalStatus } from '../constants';
import { Education } from '../constants/education';

export class LoanEntity {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly isDefault: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly balance: number;

  @IsNumber()
  age: number;

  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsString()
  job: string;

  @IsEnum(Education)
  education: Education;
}
