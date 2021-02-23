import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryInterface, PostService } from '../../services/post.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryInterface[];

  
  @Output() category_id = new EventEmitter<number>();
  @Input() selected: number = 0;

  constructor( private http: HttpClient, private postService: PostService ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.postService.getCategories().subscribe( (res: any) =>{
      this.categories = res.categories;
    })
  }

  onChangeCategory(){
    if( this.selected !==0 ){
      this.category_id.emit( this.selected );
    }
  }

}
