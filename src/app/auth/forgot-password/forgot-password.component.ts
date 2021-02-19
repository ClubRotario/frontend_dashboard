import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  step: number = 1;

  formEmailVerification: FormGroup;
  formCodeVerification: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.initForms();
  }

  onSubmitEmail(){
    if(this.formEmailVerification.valid){
      console.log('Valido');
      this.step++;
    }
  }

  onSubmitCode(){
    if(this.formCodeVerification.valid){
      console.log('Codigo Ingresado')
    }
  }

  //inicialziacion de los formularios reactivos
  initForms(){
    this.formEmailVerification = this.formBuilder.group({
      email: ['', Validators.required]
    });

    this.formCodeVerification = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

}
