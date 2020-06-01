import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {DataSnapshot} from '@angular/fire/database/interfaces';
import { forEach } from 'lodash';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  private userCardSubscription: Subscription;
  public orders: any = [];

  constructor(
    public shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.authSubscription = this.authService.user.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('');
      } else {
        this.userCardSubscription = this.shoppingCartService
          .getUserCard(user.uid)
          .pipe(take(1))
          .subscribe((userCard) => {
            this.orders = this.convertToList(userCard);
            this.cdr.detectChanges();
          });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    if (this.userCardSubscription) {
      this.userCardSubscription.unsubscribe();
    }
  }

  private convertToList(userCard: any) {
    let result = [];

    if (userCard) {
      forEach(
        Object.keys(userCard),
        (key) => (result[result.push(userCard[key]) - 1].$key = key)
      );
    }

    return result;
  }
}
