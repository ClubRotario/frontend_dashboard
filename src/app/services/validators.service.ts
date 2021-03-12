import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  checkPassword( group: FormGroup ){
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null: { notSame: true }
  }

  checkRole( group: FormGroup ){
    const role = group.get('role').value;
    return role === 0 ? { notRole: true }: null;
  }

  checkNumber( group: FormGroup ){
    const number = group.get('phone').value;
    return isNaN(number) ? { notNumber: true }: null;
  }
}
