import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(searchQuery?: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea' + (searchQuery ? '?search=' + searchQuery : ''));
  }
}
