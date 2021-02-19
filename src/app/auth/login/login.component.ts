import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

interface TokenInterface {
  token: string
}

interface ErrorInterface{
  error: {
    message: string
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.initForm();
  }

  //Enviando el formulario de login al servicio
  onSubmit(){
    if(this.formGroup.valid){
      if(this.formGroup.get('remember').value){
        this.authService.setEmail( this.formGroup.get('email').value );
      }else{
        this.authService.removeEmail();
      }
      const user = {
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value
      };
      this.authService.login( user ).subscribe( ( res: TokenInterface ) => {
        const { token } = res;
        this.authService.saveToken( token );
        this.router.navigateByUrl('/dashboard');
      }, (error: ErrorInterface) => {
        console.log(error);
        const { message } = error.error;
        Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    }
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      email: [this.authService?.getEmail() || '', [Validators.required , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', Validators.required],
      remember: [this.authService?.getEmail() || false]
    });
  };


  //Getters para obtener validaciones

  get hasErrorsEmail(){
    return this.formGroup.get('email').touched && this.formGroup.get('email').errors
  }

  get isEmptyEmail(){
    return this.formGroup.get('email').touched && this.formGroup.get('email').errors && this.formGroup.get('email').errors.required;
  }

  get isValidEmail(){
    return this.formGroup.get('email').touched && this.formGroup.get('email').errors && this.formGroup.get('email').errors.pattern;
  }

  get isValidPassword(){
    return this.formGroup.get('password').touched && this.formGroup.get('password').errors && this.formGroup.get('password').errors.required;
  }
  get hasErrorsPassword(){
    return this.formGroup.get('password').touched && this.formGroup.get('password').errors
  }

}
