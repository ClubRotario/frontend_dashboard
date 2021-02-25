import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  step: number = 1;

  formEmailVerification: FormGroup;
  formCodeVerification: FormGroup;
  formChangePassword: FormGroup;

  user_id: number;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.initForms();
  }

  onSubmitEmail(){
    if(this.formEmailVerification.valid){
      const email = this.formEmailVerification.get('email').value;
      this.authService.passwordRecovery( email ).subscribe( (res: any) => {
        this.user_id = res.user_id;
        this.step++;
      });
    }
  }

  onSubmitCode(){
    if(this.formCodeVerification.valid && this.user_id){
      const code = this.formCodeVerification.get('code').value;
      this.authService.codeVerification( code, this.user_id ).subscribe( (res:any) => {
        this.step ++;
      }, (error: any) => {
        const { message } = error.error;
        Swal.fire({
          title: 'Error al momento de ingresar el código',
          text: message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    }else{
      Swal.fire({
        title: 'Error al momento de ingresar el código',
        text: 'Por favor verifique que el correo ingresado es el correspondiente con el sistema',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onSubmitUpdatePassword(){
    if(this.formChangePassword.valid){
      const password = this.formChangePassword.get('password').value;
      this.authService.updatePassword( password, this.user_id ).subscribe( (res: any) => {
        Swal.fire({
          title: '¡Listo!',
          text: 'Tu contraseña ha sido cambiada correctamuente, ahora puedes iniciar sesión usando tu nueva contraseña.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then( () => {
          this.router.navigateByUrl('/login');
        })
      }, (error: any) => {
        const { message } = error;
        Swal.fire({
          title: 'Error al momento de cambiar la contraseña',
          text: message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    }
  }

  //inicialziacion de los formularios reactivos
  initForms(){
    this.formEmailVerification = this.formBuilder.group({
      email: ['', [Validators.required , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]]
    });

    this.formCodeVerification = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.formChangePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeat_password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get hasErrorsEmail(){
    return this.formEmailVerification.get('email').touched && this.formEmailVerification.get('email').errors
  }

  get isEmptyEmail(){
    return this.formEmailVerification.get('email').touched && this.formEmailVerification.get('email').errors && this.formEmailVerification.get('email').errors.required;
  }

  get isValidEmail(){
    return this.formEmailVerification.get('email').touched && this.formEmailVerification.get('email').errors && this.formEmailVerification.get('email').errors.pattern;
  }

  get isMinLengthPassword(){
    return this.formChangePassword.get('password').touched && this.formChangePassword.get('password').errors && this.formChangePassword.get('password').errors.minlength
  }

  get isSamePassword(){
    return (this.formChangePassword.get('password').touched && this.formChangePassword.get('repeat_password').touched) && this.formChangePassword.get('password').value !== this.formChangePassword.get('repeat_password').value
  }

}
