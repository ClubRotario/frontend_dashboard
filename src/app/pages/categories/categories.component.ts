import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  get categories(): Category[]{
    return this.categoriesService.categories;
  }

  constructor( private categoriesService: CategoriesService ) { }

  ngOnInit(): void {

  }

  onDelete( category_id: number ){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar esta categoría?',
      text: "Una vez realizada esta acción no se podra deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory( category_id ).subscribe( res => {
          this.categoriesService.getAllCategories();
          Swal.fire('Carrecto', 'Categoría eliminada satisfactoriamente', 'success');
        }, err => {
          const message = err.error.message;
          Swal.fire('Error', message, 'error');
        })
      }
    })
  }

  onCreateCategory(){
    Swal.fire({
      title: 'Ingresa el nuevo nombre de la categoría.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      preConfirm: (res) => {
        if( res.trim().length === 0 ){
          Swal.showValidationMessage( 'Debes especificar el nombre de la categoría' );
          return;
        }
        return this.categoriesService.createCategory( { category: res } ).then( res => {
          return res;
        }).catch( err => {
          Swal.showValidationMessage( `${err.error.message}` );
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.getAllCategories();
        Swal.fire('Correcto', 'Categoría agregada satisfactoriamente.', 'success');
      }
    }) 
  }

  onUpdate( category_id: number, category: string ){
    Swal.fire({
      title: 'Ingresa el nuevo nombre de la categoría.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        
      },
      inputValue: category,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      preConfirm: (res) => {
        return this.categoriesService.updateCategory( { category_id, category: res } ).then( res => {
          return res;
        }).catch( err => {
          Swal.showValidationMessage( `${err.error.message}` );
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.getAllCategories();
        Swal.fire('Correcto', 'Categoría actualizada satisfactoriamente.', 'success');
      }
    }) 
  }

}
