import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { RouterService } from '../../services/router.service';
import filterConfig from './filter.config';
import { forEach } from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() filterData: any[];

  public filterConfig: any = filterConfig;
  public currentFilters: any[];
  public currentFilterConfig: any[];

  constructor(private RouterService: RouterService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentFilters = this.filterConfig[this.RouterService.getPostfix()];
    this.ensureFilters();
  }

  private ensureFilters() {
    this.currentFilterConfig = [];

    forEach(this.currentFilters, (filter) => {
      let newFilter = this.createFilter(filter);

      if (newFilter) {
        this.currentFilterConfig.push(newFilter);
      }
    });
  }

  private createFilter(filter) {
    let newFilter = { ...filter };

    switch (newFilter.type) {
      case 'range': {
        let range = this.getRangeByFilterKey(newFilter.filterKey);

        if (range) {
          newFilter.range = range;
        } else {
          newFilter = null;
        }
        break;
      }
      case 'select': {
        let options = this.getSelectOptionsByFilterKey(filter.filterKey);

        if (options.lenght > 1) {
          newFilter.options = options;
        } else {
          newFilter = null;
        }
        break;
      }
      case 'checkbox': {
        newFilter.selected = false;
        break;
      }
    }
    return newFilter;
  }

  private getRangeByFilterKey(key: string): any {
    let range = {
      min: 0,
      max: 0
    };

    range.min = this.filterData[0][key];
    range.max = this.filterData[0][key];
    forEach(this.filterData, (item) => {
      if (item[key] > range.max) {
        range.max = item[key];
      } else if (item[key] < range.min) {
        range.min = item[key];
      }
    });

    return range.min === range.max ? null : range;
  }

  private getSelectOptionsByFilterKey(key: string): any {
    let options: Map<string, object> = new Map();

    forEach(this.filterData, (item) =>
      options.set(item[key], { value: item[key], selected: false })
    );

    return Array.from(options.values());
  }
}
