import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-item',
  templateUrl: './description-item.component.html',
  styleUrls: ['./description-item.component.less']
})
export class DescriptionItemComponent implements OnInit {
  @Input() key: string;
  @Input() value: string;

  constructor() {}

  ngOnInit(): void {}
}
