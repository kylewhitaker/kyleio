import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subject } from 'rxjs';
import { take, map, finalize, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-animated-typing',
  templateUrl: './animated-typing.component.html',
  styleUrls: ['./animated-typing.component.scss']
})
export class AnimatedTypingComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:variable-name
  private _roles: string[][];
  // tslint:disable-next-line:variable-name
  private _text: string;

  @Input() cursor: 'light' | 'dark';

  @Input()
  set text(value: string) {
    this._text = `text-${value}`;
  }
  get text(): string {
    return this._text;
  }

  @Input()
  set roles(value: string[][]) {
    this._roles = value
      .map(x => x.join(' | '))
      .map(x => this.buildup(x));
  }
  get roles(): string[][] {
    return this._roles;
  }

  cursor$: Observable<string>;

  trigger$ = new Subject<number>();

  roles$: Observable<string> = this.trigger$.pipe(
    map(val => ({ val, arr: this.roles[Math.abs(val % this.roles.length)] })),
    mergeMap(({ val, arr }) => val > 0
      ? this.type(val, arr, 500, 70)
      : this.delete(val, arr, 2500, 25)
    )
  );

  ngOnInit() {
    this.cursor$ = timer(0, 600).pipe(
      map(val => val % 2 === 0 ? `text-${this.cursor}` : 'hide-cursor')
    );
  }

  ngAfterViewInit() {
    this.trigger$.next(this.roles.length);
  }

  buildup(s: string): string[] {
    const arr = [];
    for (let i = 0; i <= s.length; i++) {
      arr.push(s.substring(0, i));
    }
    return arr;
  }

  type(val: number, arr: string[], wait: number, period: number): Observable<string> {
    return timer(wait, period).pipe(
      take(arr.length),
      map(n => arr[n]),
      finalize(() => this.trigger$.next(val * -1))
    );
  }

  delete(val: number, arr: string[], wait: number, period: number): Observable<string> {
    return timer(wait, period).pipe(
      take(arr.length),
      map(n => arr[arr.length - n - 1]),
      finalize(() => this.trigger$.next(val * -1 + 1))
    );
  }

}
