import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Pagination{
  show: boolean,
  totalPages: number[],
  currentPage: number
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pages: Pagination;
  @Input() url = 'posts';
  @Input() linked: string;
  @Output() changePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  getUrl( page: number ){
    return `/dashboard/${this.url}/${page}`;
  }

  pageChanged( page:number ){
    this.changePage.emit(page);
  }

  get showLink(){
    return this.linked == "none" ? true: false
  }

}
