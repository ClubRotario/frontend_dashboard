import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';
import { AuthService } from './auth.service';

export interface Category{
  category_id: number,
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _categories: Category[] = [];

  get categories(): Category[]{
    return this._categories;
  }

  constructor( private http: HttpClient, private authService: AuthService ) {
    this.getAllCategories();
  }

  getAllCategories(){
    const headers = new HttpHeaders({
      token: this.authService.getToken()
    })
    this.http.get<{categories: Category[]}>(`${Globals.URL}/api/categories`, { headers }).subscribe( res => {
      this._categories = res.categories;
    })
  }

  deleteCategory( category_id: number ){
    const headers = new HttpHeaders({
      token: this.authService.getToken()
    });
    return this.http.delete<{ message: string }>(`${Globals.URL}/api/categories?category_id=${category_id}`);
  }

  updateCategory( category ){
    const headers = new HttpHeaders({
      token: this.authService.getToken()
    });
    return this.http.put(`${Globals.URL}/api/categories`, category,{ headers }).toPromise();
  }

  createCategory( category ){
    const headers = new HttpHeaders({
      token: this.authService.getToken()
    });
    return this.http.post(`${Globals.URL}/api/categories`, category,{ headers }).toPromise();
  }

}
