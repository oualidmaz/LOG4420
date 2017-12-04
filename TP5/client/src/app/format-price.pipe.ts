import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(price: any): any {
    return price.toFixed(2).replace('.', ',');
  }

}
