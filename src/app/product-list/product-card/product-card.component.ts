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
import {AppRoutes, RouterService} from '../../services/router.service';
import { CATALOG } from '../../services/catalog.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

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

  public imageUrls: string[] = [];
  public postfix: string;
  public imagesSubscription: Subscription;
  public currentRate: number = 3.5;

  public catalog: any = CATALOG;
  constructor(
    public routerService: RouterService,
    private afStorage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.postfix = routerService.getPostfix();
  }

  ngOnInit(): void {
    this.imagesSubscription = this.afStorage
      .ref(`${this.postfix}/${this.product.$key}`)
      .listAll()
      .subscribe((value) => {
        value.items.forEach((img) => img.getDownloadURL().then(url => {
          this.imageUrls.push(url);
          this.cdr.markForCheck();
        }));
      });
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }
}
