import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('search') searchRef;
  private stream$: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.stream$ = fromEvent<any>(this.searchRef.nativeElement, 'input')
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => ajax.getJSON(''))
      );

    this.stream$.subscribe(value => {
      console.log(value);
    })
  }
}
