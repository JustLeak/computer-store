import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject, Subscription } from 'rxjs';

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
      this.orderPriceMap[operation.key] = operation.value;
      for (let key in this.orderPriceMap) {
        newTotalPrice += this.orderPriceMap[key];
      }
      this.totalPrice.next(newTotalPrice);
    });
  }

  public getUserCard(uid: string): Observable<any> {
    return this.db.object(`users/${uid}/orders`).valueChanges();
  }
}
