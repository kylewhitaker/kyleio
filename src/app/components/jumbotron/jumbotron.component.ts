import { Component } from '@angular/core';
import { Observable, BehaviorSubject, of, timer } from 'rxjs';
import { switchMap, delay, map, mergeMap, take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html'
})
export class JumbotronComponent {

  roles: string[][] = [
    ['software developer', 'cleveland, ohio'],
    ['catholic', 'husband', 'father', 'programmer']
  ]
    .map(x => x.join(' | '))
    .map(x => this.buildup(x));

  trigger$ = new BehaviorSubject<any>('');

  roles$: Observable<string> = this.trigger$.pipe(
    switchMap((val, idx) => idx > 0 ? of(val).pipe(delay(2000)) : of(val)),
    map((val, idx) => this.roles[idx % this.roles.length]),
    mergeMap(arr => timer(0, 50).pipe(
      take(arr.length),
      map(n => arr[n]),
      finalize(() => this.trigger$.next(''))
    ))
  );

  buildup(s: string): string[] {
    const arr = [];
    for (let i = 1; i <= s.length; i++) {
      arr.push(s.substring(0, i));
    }
    return arr;
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
