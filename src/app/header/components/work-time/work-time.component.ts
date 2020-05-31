import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkTimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
