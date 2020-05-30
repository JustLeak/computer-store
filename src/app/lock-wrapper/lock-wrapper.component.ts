import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-lock-wrapper',
  templateUrl: './lock-wrapper.component.html',
  styleUrls: ['./lock-wrapper.component.less']
})
export class LockWrapperComponent implements OnInit, OnChanges {
  @Input() isLocked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.isLocked.currentValue);
  }
}
