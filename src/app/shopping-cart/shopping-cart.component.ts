import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {

  constructor(shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
