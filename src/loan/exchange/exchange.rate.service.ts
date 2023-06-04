import { Injectable } from '@nestjs/common';
import { DefaultExchangeApiUrl } from '../constants';
import { ExchangedCurrency } from '../entities/exchanged.currency';

@Injectable()
export class ExchangeRateService {
  async exchange(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<ExchangedCurrency> {
    console.log('exchange', amount, fromCurrency, toCurrency);
    const response = await fetch(
      `${DefaultExchangeApiUrl}?sourceCurrency=${fromCurrency}&targetCurrency=${toCurrency}&amount=${amount}`,
    );
    const data = await response.json();
    console.log('exchanged date', data);
    return { balance: data.amount, currency: toCurrency };
  }
}
