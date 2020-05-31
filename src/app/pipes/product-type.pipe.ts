import { Pipe, PipeTransform } from '@angular/core';

export enum PRODUCT_TYPES {
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

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case PRODUCT_TYPES.gpu:
        return 'Видеокарта';
      case PRODUCT_TYPES.motherboard:
        return 'Материнская плата';
      case PRODUCT_TYPES.ram:
        return 'Оперативная память';
      case PRODUCT_TYPES.coolerSystem:
        return 'Систама охлаждения';
      case PRODUCT_TYPES.ssd:
        return 'SSD';
      case PRODUCT_TYPES.hdd:
        return 'Жесткий диск';
      case PRODUCT_TYPES.case:
        return 'Корпус';
      case PRODUCT_TYPES.block:
        return 'Блок питания';
      case PRODUCT_TYPES.cpu:
        return 'Процессор';
      default:
        return '-';
    }
  }
}
