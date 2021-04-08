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
      phone: [this.userDetails.phone, Validators.required],
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
    if(this.formGroup.valid){
      const user: UserInterface = this.formGroup.value;
      this.authService.updateUserProfile( user ).then( (res:any) => {
          this.authService.getUserDetails();
          Swal.fire('Correcto', 'Datos actualizados correctamente', 'success');
      })
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
        Swal.fire('Error', 'Por favor, asegurese de que su contraseña actual es correcta', 'error');
      })
    }
  }

  onCloseModal(){
    this.fgPassowrd.reset();
  }


}
