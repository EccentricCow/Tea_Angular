import {Component, OnDestroy} from '@angular/core';
import {ProductSearchService} from "../../../services/product-search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected searchQuery: string = '';

  constructor(private productSearchService: ProductSearchService) {
  }

  onSearchChange() {
    this.productSearchService.searchStart(this.searchQuery);
  }
}
