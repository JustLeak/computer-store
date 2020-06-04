import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { CatalogService } from '../services/catalog.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { RouterService } from '../services/router.service';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { forEach } from 'lodash';
import { MDBModalService } from 'angular-bootstrap-md';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnDestroy {
  public products: any = [];
  public catalogSubscription: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private catalogService: CatalogService,
    private routerService: RouterService,
    private modalService: MDBModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.db.database
      .ref(`categories/${this.routerService.getPostfix()}/products`)
      .once('value')
      .then((snapshot) => {
        this.products = this.convertToList(snapshot);
        this.cdr.markForCheck();
      });
    this.catalogSubscription = this.catalogService.catalogChangesSubject
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.db.database
          .ref(`categories/${value}/products`)
          .once('value')
          .then((snapshot) => {
            this.products = this.convertToList(snapshot);
            this.cdr.markForCheck();
          });
      });
  }

  public openAuthModal() {
    this.modalService.show(AuthModalComponent, {
      ignoreBackdropClick: true
    });
  }

  ngOnDestroy(): void {
    this.catalogSubscription.unsubscribe();
  }

  private convertToList(snapshot: DataSnapshot) {
    let result = [];
    let snapshotValue = snapshot.val();

    if (snapshotValue) {
      forEach(
        Object.keys(snapshotValue),
        (key) => (result[result.push(snapshotValue[key]) - 1].$key = key)
      );
    }

    return result;
  }
}
