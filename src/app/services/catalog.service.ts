import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum CATALOG {
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

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public catalogChangesSubject: Subject<CATALOG> = new Subject<CATALOG>();

  public dispatchCatalog(catalog: CATALOG) {
    this.catalogChangesSubject.next(catalog);
  }
}
