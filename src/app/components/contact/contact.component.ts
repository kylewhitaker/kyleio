import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  contact = new Contact('', '', '', '');

  constructor(private http: HttpClient) { }

  sendEmail(): void {
    const baseUrl = environment.production
      ? 'https://enigmatic-lowlands-97259.herokuapp.com'
      : 'http://localhost:8080';

    this.http.post(`${baseUrl}/email`, this.contact).subscribe({
      next: (response) => console.log('success:', response),
      error: (err) => console.log('error:', err)
    });
  }
}
