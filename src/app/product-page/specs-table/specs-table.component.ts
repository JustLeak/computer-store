import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';

interface IRow {
  name: string;
  value: string;
  postfix: string;
  isBoolean: boolean;
}

export interface ISection {
  name: string;
  rows: IRow[];
}

@Component({
  selector: 'app-specs-table',
  templateUrl: './specs-table.component.html',
  styleUrls: ['./specs-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecsTableComponent implements OnInit, OnChanges {
  @Input() table: ISection[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }
}
