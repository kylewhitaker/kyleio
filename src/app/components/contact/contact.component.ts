import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  completed = false;
  success = false;

  onComplete(success: boolean): void {
    this.success = success;
    this.completed = true;
  }

  reset(): void {
    this.completed = false;
  }

}
