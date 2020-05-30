import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthService } from '../../../services/auth.service';
import { AuthModalComponent } from '../../../auth-modal/auth-modal.component';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../services/router.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  public username = 'Евгений';

  private authModalRef: MDBModalRef;

  constructor(
    public authService: AuthService,
    private modalService: MDBModalService,
    private router: Router,
    public shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  public onProfileClick() {
    console.log('profile');
  }

  public onSignOutClick() {
    this.authService.signOut();
  }

  public openAuthModal() {
    this.authModalRef = this.modalService.show(AuthModalComponent, {
      ignoreBackdropClick: true
    });
  }

  public onShoppingCartClick() {
    this.router.navigateByUrl(AppRoutes.cart);
  }
}
