import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLocaleString'
})
export class ToLocaleStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === "object") {
      try {
        return (<Date>value).toISOString().substring(0, 10);
      } catch (error) {
        return null;
      }
    }
    return null;
    
  }

}
