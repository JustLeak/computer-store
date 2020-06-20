import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { RouterService } from '../../services/router.service';
import { CATALOG } from '../../services/catalog.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { keys } from 'lodash';
import { Router } from '@angular/router';

export interface IProductDescription {
  name: string;
  value: string | number;
}

export interface IProduct {
  name: string;
  description: IProductDescription[];
  $key: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: any;
  @Output() needAuth: EventEmitter<void> = new EventEmitter<void>();

  public imageUrls: string[] = [];
  public postfix: string;
  public cartKey: string | null = null;
  public isAuthorized: boolean = false;
  public imagesSubscription: Subscription;
  public userSubscription: Subscription;

  public catalog: any = CATALOG;
  constructor(
    public routerService: RouterService,
    private afStorage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.postfix = routerService.getPostfix();
  }

  ngOnInit(): void {
    this.imagesSubscription = this.afStorage
      .ref(`${this.postfix}/${this.product.$key}`)
      .listAll()
      .subscribe((value) => {
        value.items.forEach((img) =>
          img.getDownloadURL().then((url) => {
            this.imageUrls.push(url);
            this.cdr.markForCheck();
          })
        );
      });
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user && user.emailVerified) {
        this.isAuthorized = true;
        this.db
          .object(`users/${user.uid}/orders`)
          .query.orderByChild('key')
          .equalTo(this.product.$key)
          .limitToFirst(1)
          .on('value', (snapshot) => {
            if (snapshot) {
              this.cartKey = keys(snapshot.toJSON())[0];
              this.cdr.markForCheck();
            }
          });
      } else {
        this.cartKey = null;
        this.isAuthorized = false;
      }
      this.cdr.markForCheck();
    });
  }

  public onCartAction(): void {
    if (!this.isAuthorized) {
      this.needAuth.emit();
    } else if (!this.cartKey) {
      this.db.database.ref(`users/${this.authService.uid}/orders`).push({
        count: 1,
        key: this.product.$key,
        type: this.postfix
      });
    } else if (this.cartKey) {
      this.router.navigateByUrl('cart');
    }
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
