import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { IProductDescription } from '../product-card.component';

export interface ICpu {
  $key: string;
  TDP: number;
  baseClock: number;
  coreCount: number;
  includeGraphics: false;
  lineup: string;
  maxClock: number;
  model: string;
  price: number;
  producer: string;
  releaseDate: number;
  socket: string;
  techProcess: number;
  threadCount: number;
  type: string;
}

@Component({
  selector: 'app-cpu-card-content',
  templateUrl: './cpu-card-content.component.html',
  styleUrls: ['./cpu-card-content.component.less']
})
export class CpuCardContentComponent implements OnInit, OnChanges {
  @Input() cpu: ICpu;

  public shortDescription: IProductDescription[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cpu) {
      this.shortDescription = [
        {
          name: 'Год выпуска',
          value: this.cpu.releaseDate
        },
        {
          name: 'Тактовая частота',
          value: this.cpu.baseClock + '-' + this.cpu.maxClock
        },
        {
          name: 'Количество ядер/потоков',
          value: this.cpu.coreCount + '/' + this.cpu.threadCount
        },
        {
          name: 'Техпроцесс',
          value: this.cpu.techProcess
        }
      ];
    }
  }
}
