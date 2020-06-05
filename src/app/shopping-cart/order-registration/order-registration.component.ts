import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-order-registration',
  templateUrl: './order-registration.component.html',
  styleUrls: ['./order-registration.component.less']
})
export class OrderRegistrationComponent implements OnInit {
  @Input() orders: any[];

  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
