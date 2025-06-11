import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {
  hasSearchInput$: Subject<string> = new Subject<string>();
  products: ProductType[] = [];

  constructor(private router: Router) {
  }

  searchStart(query: string): void {
    this.router.navigate(['/products']);
    this.hasSearchInput$.next(query);
  }
}
