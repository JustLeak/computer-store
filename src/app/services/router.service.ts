import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';

export enum AppRoutes {
  home = '',
  catalog = 'catalog',
  cpu = 'cpu',
  gpu = 'gpu',
  motherboard = 'motherboard',
  ram = 'ram',
  coolerSystem = 'cooler-system',
  ssd = 'ssd',
  hdd = 'hdd',
  case = 'case',
  block = 'block',
  cart = 'cart',
  productPage = 'product-page'
}

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  public params: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.params = this.route.params;
  }

  public getPostfix() {
    return this.router.url.split('/')[1];
  }
}
