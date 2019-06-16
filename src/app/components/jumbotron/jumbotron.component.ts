import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, mergeMap, take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html'
})
export class JumbotronComponent {

  cursor$: Observable<string> = timer(0, 600).pipe(
    map(val => val % 2 === 0 ? 'text-light' : 'text-dark')
  );

  roles: string[][] = [
    ['software developer', 'cleveland, ohio'],
    ['catholic', 'husband', 'father', 'programmer']
  ]
    .map(x => x.join(' | '))
    .map(x => this.buildup(x));

  trigger$ = new BehaviorSubject<number>(this.roles.length);

  roles$: Observable<string> = this.trigger$.pipe(
    map(val => ({ val, arr: this.roles[Math.abs(val % this.roles.length)] })),
    mergeMap(({ val, arr }) => val > 0
      ? this.type(val, arr, 500, 70)
      : this.delete(val, arr, 2500, 25)
    )
  );

  constructor(private http: HttpClient) { }

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

  open(uri: string): void {
    switch (uri) {
      case 'resume':
        window.open('assets/resume.pdf', '_blank');
        break;
      case 'github':
        window.open('https://www.github.com/kylewhitaker', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/whitakerkyle', '_blank');
        break;
      default:
        alert('Sorry, this option is not currently available.');
        break;
    }
  }

}
