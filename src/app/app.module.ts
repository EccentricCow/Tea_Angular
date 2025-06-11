import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainComponent} from './components/pages/main/main.component';
import {ProductsComponent} from './components/pages/products/products.component';
import {ProductCardComponent} from './components/common/product-card/product-card.component';
import {OrderComponent} from './components/pages/order/order.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {ProductComponent} from './components/pages/product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsComponent,
    ProductCardComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
