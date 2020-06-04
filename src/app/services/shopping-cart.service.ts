import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public orderPriceMap: any = {};
  public totalPrice = new Subject<number>();
  public priceChangeSubject = new Subject<any>();

  constructor(private db: AngularFireDatabase) {
    this.priceChangeSubject.subscribe((operation) => {
      let newTotalPrice = 0;
      if (operation.value) {
        this.orderPriceMap[operation.key] = operation.value;
      } else {
        delete this.orderPriceMap[operation.key];
      }
      for (let key in this.orderPriceMap) {
        newTotalPrice += this.orderPriceMap[key];
      }
      this.totalPrice.next(+newTotalPrice.toFixed(2));
    });
  }

  public getUserCard(uid: string): Observable<any> {
    return this.db
      .object(`users/${uid}/orders`)
      .valueChanges()
      .pipe(
        map((value) => {
          return this.convertToList(value);
        })
      );
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
