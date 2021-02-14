import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AlertComponent, EditorComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule
  ],
  exports: [ AlertComponent, EditorComponent ]
})
export class ComponentsModule { }
