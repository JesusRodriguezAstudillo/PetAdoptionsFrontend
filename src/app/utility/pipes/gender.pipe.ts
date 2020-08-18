import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === "F") {
      return "Female";
    }
    else if(value === "M") {
      return "Male";
    }
    else {
      return null;
    }
  }

}
