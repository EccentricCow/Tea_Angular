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
  protected searchQuery: string = '';

  private productLoadingSubscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(private productService: ProductService,
              private productSearchService: ProductSearchService) {
  }

  ngOnInit(): void {
    this.searchSubscription = this.productSearchService.hasSearchInput$.subscribe(query => this.searchQuery = query);
    this.getProductsList();
  }

  getProductsList(): any {
    this.productLoadingSubscription = this.productService.getProducts(this.searchQuery ? this.searchQuery : '')
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
