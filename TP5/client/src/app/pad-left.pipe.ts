import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft'
})
export class PadLeftPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let val = value? value.toString(): "0";
    
    let l = val?val.length:0;
    
    let max = 5;
    let s = "";
    console.log("l =", l)
    for(let i = 0; i< 5-l; i++)
      s +="0";
    return s+val;
  }

}
