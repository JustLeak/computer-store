import { Component, Input, OnInit } from '@angular/core';

export enum FILTER_TYPE {
  checkbox = 'checkbox',
  range = 'range',
  select = 'select'
}

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.less']
})
export class FilterItemComponent {
  @Input() filterItem: any;

  public FILTER_TYPE: any = FILTER_TYPE;
}
