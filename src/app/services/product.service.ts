import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  hasSearchInput$: Subject<string> = new Subject<string>();
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  getProducts(searchQuery?: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea' + (searchQuery ? '?search=' + searchQuery : ''));
  }

  searchStart(query: string): void {
    this.searchQuery = query;
    this.router.navigate(['/products']);
    this.hasSearchInput$.next(query);
  }
}
