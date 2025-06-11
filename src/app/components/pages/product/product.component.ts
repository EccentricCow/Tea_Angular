import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  protected product: ProductType;
  private productLoadingSubscription: Subscription | null = null;
  private routeParamsSubscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router
  ) {
    this.product = {
      id: 0,
      title: '',
      description: '',
      image: '',
      price: 0
    }
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productLoadingSubscription = this.productService.getProducts().subscribe(response => {
          const result = response.find(product => product.id === +params['id']);
          if (result) {
            this.product = result;
          } else {
            this.router.navigate(['']);
          }
        })
      }
    });
  }

  ngOnDestroy() {
    this.productLoadingSubscription?.unsubscribe();
    this.routeParamsSubscription?.unsubscribe();
  }
}
