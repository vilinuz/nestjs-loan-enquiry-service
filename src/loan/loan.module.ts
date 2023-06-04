import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { join } from 'util.join';
import { ExcelLoanDataStore } from './datastore/excel.loan.data.store';
import { ExchangeRateService } from './exchange/exchange.rate.service';
import { LoanFilterResolver } from './helpers/loan.filter.resolver';
import { LoanHelper } from './helpers/loan.helper';

@Module({
  controllers: [LoanController],
  providers: [
    LoanService,
    ExchangeRateService,
    LoanFilterResolver,
    LoanHelper,
    {
      provide: 'LoanDataStore',
      useClass: ExcelLoanDataStore,
    },
  ],
})
export class LoanModule {}
