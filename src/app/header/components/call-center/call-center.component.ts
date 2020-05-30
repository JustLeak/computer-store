import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallCenterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
