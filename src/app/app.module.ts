import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DollarRateComponent } from './header/components/dollar-rate/dollar-rate.component';
import { SearchComponent } from './header/components/search/search.component';
import { CallCenterComponent } from './header/components/call-center/call-center.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { FilterComponent } from './product-list/filter/filter.component';
import { FilterItemComponent } from './product-list/filter/filter-item/filter-item.component';
import { DescriptionItemComponent } from './product-list/product-card/description-item/description-item.component';
import { AngularFireModule } from '@angular/fire';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DropdownMenuComponent } from './header/components/dropdown-menu/dropdown-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LockWrapperComponent } from './lock-wrapper/lock-wrapper.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './header/components/navbar/navbar.component';
import { CpuCardContentComponent } from './product-list/product-card/cpu-card-content/cpu-card-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    DollarRateComponent,
    SearchComponent,
    CallCenterComponent,
    ProductCardComponent,
    FilterComponent,
    FilterItemComponent,
    DescriptionItemComponent,
    AuthModalComponent,
    DropdownMenuComponent,
    HomePageComponent,
    LockWrapperComponent,
    NavbarComponent,
    CpuCardContentComponent,
    ShoppingCartComponent,
    ProductPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA06nAxj8tpMKxmcgWR28Fq7mZHObu1NWU',
      authDomain: 'computerstore-102c7.firebaseapp.com',
      databaseURL: 'https://computerstore-102c7.firebaseio.com',
      projectId: 'computerstore-102c7',
      storageBucket: 'computerstore-102c7.appspot.com',
      messagingSenderId: '545300291840',
      appId: '1:545300291840:web:3267b4fcb97d637bc7d3e5',
      measurementId: 'G-EG00Z8XMQL'
    }),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [AuthModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
