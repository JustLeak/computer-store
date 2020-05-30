import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.productService.selectedProduct);
  }

}
