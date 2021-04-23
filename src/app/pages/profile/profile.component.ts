import { Component, OnInit } from '@angular/core';
import { AuthService, UserInterface } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserInterface;

  formGroup: FormGroup;

  fgPassowrd: FormGroup;
 
  userSub: Subscription;

  constructor( private authService: AuthService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.fgPassowrd = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  initForms(){
    this.formGroup = this.formBuilder.group({
      name: [this.userDetails.name, Validators.required],
      last_name: [this.userDetails.last_name, Validators.required],
      email: [this.userDetails.email, Validators.required],
      phone: [this.userDetails.phone, [Validators.required]],
      charge: [this.userDetails.charge , [Validators.required]],
      address: [this.userDetails.address, Validators.required]
    });
  }

  getUserDetails(){
    this.userSub = this.authService._user.subscribe( (res: UserInterface) => {
      this.userDetails = res;
      this.initForms();
    });
  }

  updateUserProfile(){
    if(this.formGroup.valid && !this.isValidEmailPatter && !this.isValidPhoneNumber){
      const user: UserInterface = this.formGroup.value;
      this.authService.updateUserProfile( user ).then( (res:any) => {
          this.authService.getUserDetails();
          Swal.fire('Correcto', 'Datos actualizados correctamente', 'success');
      })
    }else{
      Swal.fire('Error', 'Por favor corrige todos los errores para continuar', 'error');
    }
  }

  onSubmitChangePassword(){
    if(this.fgPassowrd.valid){
      const password = {
        newPassword: this.fgPassowrd.get('newPassword').value,
        oldPassword: this.fgPassowrd.get('oldPassword').value
      }
      console.log(this.fgPassowrd.get('newPassword').value);
      this.authService.changePassowrd( password ).then( res => {
        Swal.fire('Correcto', 'Contraseña cambiada satisfactoriamente', 'success');
      }).catch( err => {
        Swal.fire('Error', 'Por favor, asegúrese de que su contraseña actual es correcta', 'error');
      })
    }
  }

  onCloseModal(){
    this.fgPassowrd.reset();
  }

  get isValidName(){
    return this.formGroup.get('name').errors && this.formGroup.get('name').touched && this.formGroup.get('name').invalid;
  }

  get isValidLastname(){
    return this.formGroup.get('last_name').errors && this.formGroup.get('last_name').touched && this.formGroup.get('last_name').invalid;
  }

  get isValidEmail(){
    return this.formGroup.get('email').errors && this.formGroup.get('email').touched && this.formGroup.get('email').invalid;
  }

  get isValidEmailPatter(){
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return this.formGroup.get('email').touched && !pattern.exec( this.formGroup.get('email').value );
  }

  get isValidPhone(){
    return this.formGroup.get('phone').errors && this.formGroup.get('phone').touched && this.formGroup.get('phone').invalid;
  }

  get isValidPhoneNumber(){
    return this.formGroup.get('phone').touched && isNaN( this.formGroup.get('phone').value );
  }

  get isValidAddress(){
    return this.formGroup.get('address').errors && this.formGroup.get('address').touched && this.formGroup.get('address').invalid;
  }

  get isValidCharge(){
    return this.formGroup.get('charge').errors && this.formGroup.get('charge').touched && this.formGroup.get('charge').invalid;
  }


}
