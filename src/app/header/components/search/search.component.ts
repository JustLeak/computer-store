import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  public model: string;
  public data = [
    { name: 'Intel Core i7 9700K', key: '-M785unOIk-96s2YOsx-' },
    { name: 'AMD Ryzen 5 1600', key: '-M784MhB3jdZgpOrGH7n' },
    { name: 'AMD Ryzen 5 3600', key: '-M6uedHxjavoi6gyt2SO' },
    { name: 'Intel Core i5 9600K', key: '-M6uedI1FBk53_-1wNCn' }
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  public formatter = (data: any) => data.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((term) =>
        this.data
          .filter((state) => new RegExp(term, 'mi').test(state.name))
          .slice(0, 10)
      )
    );

  public onSelect($event): void {
    this.router.navigateByUrl(`cpu/${$event.item.key}`).then(() => {
      this.cdr.detectChanges();
    });
  }
}
