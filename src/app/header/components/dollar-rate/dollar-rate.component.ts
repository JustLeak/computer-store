import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dollar-rate',
  templateUrl: './dollar-rate.component.html',
  styleUrls: ['./dollar-rate.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DollarRateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
