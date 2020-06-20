import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { IProduct } from '../product-list/product-card/product-card.component';

export interface ISelectedProduct {
  type: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public selectedProduct: IProduct = null;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {}
}
