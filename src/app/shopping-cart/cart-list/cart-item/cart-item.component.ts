import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { isNumber } from 'lodash';
import { AngularFireStorage } from '@angular/fire/storage';
import { distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() order: any;
  public product: any;
  public imageUrl: string;
  public isImageLoaded: boolean = false;
  public orderCount: FormControl;
  public orderRef: firebase.database.Reference;
  public orderCountSubscription: Subscription;

  constructor(
    private afStorage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    private db: AngularFireDatabase,
    private authService: AuthService,
    public shoppingCartService: ShoppingCartService
  ) {
    this.orderCount = new FormControl(1);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.order) {
      this.orderRef = this.db.database.ref(
        `users/${this.authService.uid}/orders/${this.order.$key}/count`
      );
      this.orderCount.setValue(this.order.count);
      this.afStorage
        .ref(`${this.order.type}/${this.order.key}`)
        .listAll()
        .pipe(
          take(1),
          switchMap((value) => {
            return value.items[0].getDownloadURL();
          })
        )
        .subscribe((url) => {
          this.imageUrl = url;
          this.isImageLoaded = true;
          this.cdr.detectChanges();
        });

      this.db.database
        .ref(`categories/${this.order.type}/products/${this.order.key}`)
        .once('value')
        .then((product) => {
          this.product = product.val();
          this.shoppingCartService.priceChangeSubject.next({
            key: this.order.key,
            value: this.product.price * this.orderCount.value
          });
          this.cdr.detectChanges();
        });

      this.orderCountSubscription = this.orderCount.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value) => {
          if (!isNumber(value)) {
            this.orderCount.setValue(1);
          } else if (value > this.product.count) {
            this.orderCount.setValue(this.product.count);
          }

          this.shoppingCartService.priceChangeSubject.next({
            key: this.order.key,
            value: this.product.price * this.orderCount.value
          });
          this.orderRef.set(this.orderCount.value);
        });
    }
  }

  ngOnDestroy(): void {
    this.orderCountSubscription.unsubscribe();
  }
}
