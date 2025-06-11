import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {finalize, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription | null = null;
  private orderSubmitSubscription: Subscription | null = null;
  protected isOrderCreated: boolean = false;
  protected isOrderInProcess: boolean = false;
  protected isSubmitHasError: boolean = false;

  orderForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]],
    last_name: ['', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+)?\d{11}$/)]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-/]+$/u)]],
    comment: [''],
    product: [''],
  }, {
    updateOn: 'blur',
  });

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.queryParams.subscribe(param => {
      if (param['product']) {
        this.orderForm.patchValue({
          product: param['product'],
        })
      } else {
        this.router.navigate(['']);
      }
    })
  }

  protected createOrder() {
    if (this.orderForm.valid) {
      this.isOrderInProcess = true;
      this.orderSubmitSubscription = this.orderService.submitOrder(this.orderForm.value)
        .pipe(
          finalize(() => {
            this.isOrderInProcess = false;
          }),
        )
        .subscribe(response => {
          if (response.success) {
            this.isOrderCreated = true;
          } else {
            this.isSubmitHasError = true;
            setTimeout(() => {
              this.isSubmitHasError = false;
            }, 3000);
          }
        })
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  protected get name() {
    return this.orderForm.get('name');
  }

  protected get lastName() {
    return this.orderForm.get('last_name');
  }

  protected get phone() {
    return this.orderForm.get('phone');
  }

  protected get country() {
    return this.orderForm.get('country');
  }

  protected get zip() {
    return this.orderForm.get('zip');
  }

  protected get address() {
    return this.orderForm.get('address');
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
    this.orderSubmitSubscription?.unsubscribe();
    this.orderForm.reset();
  }
}
