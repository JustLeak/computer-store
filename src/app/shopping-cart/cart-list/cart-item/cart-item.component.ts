import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterService } from '../../../services/router.service';
import {
  catchError,
  finalize,
  first,
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() order: any;
  public product: any;
  public imageUrl: string;
  public isImageLoaded: boolean = false;

  constructor(
    private afStorage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.order) {
      this.afStorage
        .ref(`${this.order.type}/${this.order.key}/`)
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
          this.cdr.detectChanges();
        });
    }
  }
}
