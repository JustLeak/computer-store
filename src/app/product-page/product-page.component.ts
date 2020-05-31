import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ProductService } from '../services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { ISection } from './specs-table/specs-table.component';
import specsConfig from './specs-table/specs.config';
import { AngularFireDatabase } from '@angular/fire/database';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public imageUrls: string[] = [];
  public isLoading: boolean = true;
  public table: ISection[];
  public currentRate: number = 3.5;
  public product: any;

  private imagesSubscription: Subscription;
  public postfix: string;
  private productKey: string;
  private specsConfig: any = specsConfig;

  constructor(
    private productService: ProductService,
    private afStorage: AngularFireStorage,
    private routerService: RouterService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postfix = this.routerService.getPostfix();
    this.productKey = this.route.snapshot.params['key'];
    this.imagesSubscription = this.afStorage
      .ref(`${this.postfix}/${this.productKey}`)
      .listAll()
      .subscribe((value) => {
        value.items.forEach((img) =>
          img.getDownloadURL().then((url) => {
            this.imageUrls.push(url);
            this.isLoading = false;
            this.cdr.markForCheck();
          })
        );
      });
    this.db.database
      .ref(`categories/${this.postfix}/products/${this.productKey}`)
      .once('value')
      .then((snapshot) => {
        this.product = snapshot.val();
        this.initSpecsTable();
      });
  }

  private initSpecsTable() {
    this.table = cloneDeep(this.specsConfig[this.postfix]);
    this.table.forEach((section) => {
      section.rows.forEach((row) => {
        row.value = this.product[row.value];
      });
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }
}
