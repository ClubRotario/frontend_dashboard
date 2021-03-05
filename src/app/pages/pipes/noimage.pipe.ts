import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value){
      return '../../assets/images/noimage.jpg';
    }else{
      return value;
    }
    return null;
  }

}
