import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public itemsCount: number = 0;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {}
}
