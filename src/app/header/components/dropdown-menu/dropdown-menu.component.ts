import {Component, OnInit} from '@angular/core';
import {CatalogService} from '../../../services/catalog.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../services/router.service';

enum CATALOG {
  cpu = 'cpu',
  gpu = 'gpu',
  motherboard = 'motherboard',
  ram = 'ram',
  coolerSystem = 'cooler-system',
  ssd = 'ssd',
  hdd = 'hdd',
  case = 'case',
  block = 'block'
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.less']
})
export class DropdownMenuComponent implements OnInit {
  public CATALOG: any = CATALOG;
  public currentCatalog: string;

  constructor(private router: Router, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
  }

  public goTo(catalog: CATALOG) {
    this.router.navigateByUrl(AppRoutes[catalog]).then(() => {
      this.catalogService.dispatchCatalog(catalog);
    });
  }
}
