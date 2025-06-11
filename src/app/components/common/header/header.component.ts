import {Component} from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected searchQuery: string = '';

  constructor(private productService: ProductService) {
  }

  onSearchChange() {
    if (this.searchQuery !== this.productService.searchQuery) {
      this.productService.searchStart(this.searchQuery);
    }
  }
}
