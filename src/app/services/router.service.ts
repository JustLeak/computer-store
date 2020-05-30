import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router
  ) {}

  public getPostfix() {
    return this.router.url.split('/')[1];
  }
}
