import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-registration',
  templateUrl: './order-registration.component.html',
  styleUrls: ['./order-registration.component.less']
})
export class OrderRegistrationComponent implements OnInit {
  @Input() orders: any[];
  public validatingForm: FormGroup;
  public orderConfirmed: boolean = false;
  public isLoading: boolean = false;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      address: new FormControl('', [Validators.required]),
      payMethod: new FormControl('', [Validators.required]),
      comment: new FormControl('', [])
    });
  }

  get name() {
    return this.validatingForm.get('name');
  }
  get phone() {
    return this.validatingForm.get('phone');
  }
  get email() {
    return this.validatingForm.get('email');
  }
  get address() {
    return this.validatingForm.get('address');
  }
  get payMethod() {
    return this.validatingForm.get('payMethod');
  }
  get comment() {
    return this.validatingForm.get('comment');
  }

  public onOrder(): void {
    this.isLoading = true;
    this.db.database
      .ref(`users/${this.authService.uid}/ordersConfirmed`)
      .push({
        name: this.validatingForm.get('name').value,
        phone: this.validatingForm.get('phone').value,
        email: this.validatingForm.get('email').value,
        address: this.validatingForm.get('address').value,
        payMethod: this.validatingForm.get('payMethod').value,
        comment: this.validatingForm.get('comment').value,
        orders: this.orders.map((order) => {
          let orderNew = { ...order };
          delete orderNew.$key;
          return orderNew;
        })
      })
      .then(() => {
        this.orderConfirmed = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
