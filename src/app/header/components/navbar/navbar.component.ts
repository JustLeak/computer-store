import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthService } from '../../../services/auth.service';
import { AuthModalComponent } from '../../../auth-modal/auth-modal.component';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../services/router.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public username = 'Евгений';
  public userSubscription: Subscription;
  public userCardSubscription: Subscription;
  public ordersCount: number = 0;
  private authModalRef: MDBModalRef;

  constructor(
    public authService: AuthService,
    private modalService: MDBModalService,
    private router: Router,
    public shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.userCardSubscription = this.shoppingCartService
          .getUserCard(user.uid)
          .subscribe((userCard) => {
            this.ordersCount = userCard.length;
          });
      } else {
        this.ordersCount = 0;
      }
    });
  }

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

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.userCardSubscription.unsubscribe();
  }
}
