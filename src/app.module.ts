import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
        timeout: 5000,
      }),
    }),
    LoanModule,
  ],
})
export class AppModule {}
