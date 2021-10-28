import { Pipe, PipeTransform } from '@angular/core';
import { IUser, CURRENCIES } from '@aula/api-interfaces';

@Pipe({
  name: 'equity'
})
export class EquityPipe implements PipeTransform {

  transform(equity: number, currency: CURRENCIES): string {
    console.log(equity, currency);
    return `${this.symbol(currency)}${equity}`;
  }
  symbol(currency: CURRENCIES) {
    switch (currency) {
      case CURRENCIES.DOLLAR: return '$'
      case CURRENCIES.EURO: return '€'
    }
  }
}
