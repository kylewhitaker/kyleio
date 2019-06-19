import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-failure',
  templateUrl: './contact-failure.component.html'
})
export class ContactFailureComponent {

  @Output() retry = new EventEmitter<any>();

}
