import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public itemsCount: number = 1;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {}
}
