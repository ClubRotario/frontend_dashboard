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
  @Output() changePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.pages);
  }

  getUrl( page: number ){
    return `/dashboard/posts/${page}`;
  }

  pageChanged( page:number ){
    this.changePage.emit(page);
  }

}
