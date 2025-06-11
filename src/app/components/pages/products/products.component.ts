import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {finalize, Subscription} from "rxjs";
import {ProductSearchService} from "../../../services/product-search.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  protected isCatalogLoaded: boolean = false;
  protected products: ProductType[] = [];
  protected searchQuery: string | undefined = '';

  private productLoadingSubscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductsList();
    this.searchSubscription = this.productService.hasSearchInput$.subscribe(query => {
      this.getProductsList(query);
    });
  }

  getProductsList(query?: string): any {
    this.searchQuery = query;
    this.isCatalogLoaded = false;
    this.productLoadingSubscription = this.productService.getProducts(query ? query : '')
      .pipe(
        finalize(() => {
          this.isCatalogLoaded = true;
        })
      )
      .subscribe((response: ProductType[]): void => {
        this.products = response;
      });
  }

  ngOnDestroy() {
    this.productLoadingSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }
}
