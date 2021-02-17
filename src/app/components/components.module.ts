import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AlertComponent, EditorComponent, PaginationComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ AlertComponent, EditorComponent, PaginationComponent ]
})
export class ComponentsModule { }
