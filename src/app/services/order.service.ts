import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderType} from "../types/order.type";
import {Observable} from "rxjs";
import {OrderResponseType} from "../types/order-response.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  submitOrder(data: OrderType): Observable<OrderResponseType> {
    return this.http.post<OrderResponseType>('https://testologia.ru/order-tea', data);
  }

}
