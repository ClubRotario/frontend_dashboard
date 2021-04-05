import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserInterface, UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('close') closeModal: ElementRef;

  users: UserInterface[];
  formGroup: FormGroup;
  name: string;
  public pagination: any;
  constructor( private userService: UsersService, private formBuilder: FormBuilder, private validatorService: ValidatorsService ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.initForm();
  }

  getAllUsers(){
    this.userService.getManyUsers().then( (res: any) => {
      this.users = res.users;
      this.pagination = res.pagination;
    }).catch( (error: any) => {
      console.log(error);
    })
  }

  deleteUser( id: number ){
    Swal.fire({
      title: '¿Seguro que deseas eliminar este usuario?',
      text: "Ten en cuenta que no podra acceder mas al sistema, este cambio es irreversible.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser( id ).then( (res: any) => {
          this.getAllUsers();
          Swal.fire(
            'Correcto!',
            'Usuario eliminado satisfactoriamente.',
            'success'
          )
        })
      }
    })
  }

  getUserByName(){
    if(this.name.length > 0){
      this.userService.getUserByName( this.name ).then( (users: any) => {
        this.users = users.users;
      }).catch( (error: any) => {
        console.log(error);
      });
    }else{
      this.getAllUsers();
    }
  }

  changePage( page: any ){
    this.userService.getManyUsers( page ).then( (res: any) => {
      this.users = res.users;
      this.pagination = res.pagination;
    }).catch( (error: any) => {
      console.log(error);
    });
  }

  //Funcion para cerrar el modal y reiniciar el formulario
  onCloseModal(){
    this.closeModal.nativeElement.click();
    this.formGroup.reset();
    this.initForm();
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      role: [0],
      email: ['', [Validators.required , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    }, { validators: [this.validatorService.checkPassword, this.validatorService.checkRole, this.validatorService.checkNumber] });
  }

  onSubmit(){
    if(this.formGroup.valid){
      const user = this.formGroup.value;
      delete user.repeatPassword;
      console.log(user);
      this.userService.saveOneUser( user ).then( (res: any) => {
        const { message } = res;
        this.showAlert('Correcta', message, 'success');
        this.getAllUsers();
        this.onCloseModal();
      }).catch( (error: any) => {
        const { message } = error.error;
        this.showAlert( 'Error', message, 'error' );
      });

    }
  }

  //Metodo para mostrar una advertencia si el usuario elige registrar el administrador
  onRoleChange(){
    if(this.formGroup.get('role').value == 1){
      this.showAlert( 'Advertencia', 'Estas por registrar un administrador, ten en cuenta que tendra los mismos privilegios que tu', 'warning' );
    }
  }

  //Metodo para mostrar mensajes de SweetAlert
  showAlert( title: string, text: string, icon: any ){
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar'
    });
  }

  //Validaciones del formulario
  get isValidName(){
    return this.formGroup.get('name').touched && this.formGroup.get('name').errors && this.formGroup.get('name').errors.required;
  }
  get isValidLastName(){
    return this.formGroup.get('lastName').touched && this.formGroup.get('lastName').errors && this.formGroup.get('lastName').errors.required;
  }
  get isValidEmail(){
    return this.formGroup.get('email').touched && this.formGroup.get('email').errors && this.formGroup.get('email').errors.required;
  }
  get isValidEmailPattern(){
    return this.formGroup.get('email').touched && this.formGroup.get('email').errors && this.formGroup.get('email').errors.pattern;
  }
  get isValidPhone(){
    return this.formGroup.get('phone').touched && this.formGroup.get('phone').errors && this.formGroup.get('phone').errors.required;
  }
  get isValidPassword(){
    return this.formGroup.get('password').touched && this.formGroup.get('password').errors && this.formGroup.get('password').errors.required;
  }
  get isValidAddress(){
    return this.formGroup.get('address').touched && this.formGroup.get('address').errors && this.formGroup.get('address').errors.required;
  }

  get isValidPasswordLength(){
    return this.formGroup.get('password').touched && this.formGroup.get('password').errors && this.formGroup.get('password').errors.minlength;
  }

  get isValidPhoneNumber(){
    return this.formGroup.get('phone').touched && this.formGroup.errors && this.formGroup.errors.notNumber;
  }
  get isValidPhoneLength(){
    return this.formGroup.get('phone').touched && this.formGroup.get('phone').errors && this.formGroup.get('phone').errors.maxlength;
  }


}
