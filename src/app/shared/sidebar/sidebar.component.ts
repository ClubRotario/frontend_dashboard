import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

interface ItemsMenu {
  path: string,
  icon: string,
  name: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  itemsMenu: ItemsMenu[];

  constructor(private sidebarService: SidebarService) { }


  ngOnInit(): void {
    this.itemsMenu = this.sidebarService.itemsMenu
  }

}
