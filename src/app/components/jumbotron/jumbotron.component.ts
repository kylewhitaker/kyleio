import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, mergeMap, take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html'
})
export class JumbotronComponent {

  roles: string[][] = [
    ['software developer', 'cleveland, ohio'],
    ['catholic', 'husband', 'father'],
  ];

  constructor(private http: HttpClient) { }

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
