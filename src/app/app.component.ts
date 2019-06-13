import { Component } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subject, of } from 'rxjs';
import { map, take, mergeMap, finalize, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  roles: string[][] = [
    ['software developer', 'cleveland, ohio'],
    ['catholic', 'husband', 'father', 'programmer']
  ];

  count = 0;
  trigger$ = new BehaviorSubject<number>(this.count);
  reverse$ = new Subject<any>();

  roles$: Observable<string> = this.trigger$.pipe(
    // map(n => this.roles[n % this.roles.length]),
    switchMap(n => n > 0 ? of(n).pipe(delay(2000)) : of(n)),
    map((n, i) => this.roles[i % this.roles.length].join(' | ')),
    mergeMap(s => {
      const arr = this.buildup(s);
      return timer(0, 50).pipe(
        take(arr.length),
        map(n => arr[n]),
        finalize(() => this.trigger$.next(++this.count))
      );
    }),

  );

  buildup(s: string): string[] {
    const arr = [];
    for (let i = 1; i <= s.length; i++) {
      arr.push(s.substring(0, i));
    }
    return arr;
  }

  openResume(): void {
    window.open('assets/resume.pdf', '_blank');
  }


}
