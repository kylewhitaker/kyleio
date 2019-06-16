import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  constructor(private http: HttpClient) { }

  sendEmail(): void {
    const body = {
      name: 'jabroni smith',
      email: 'jabroni.smith@gmail.com',
      subject: 'Hire you!',
      message: 'When can you start?'
    };

    const baseUrl = environment.production
      ? 'https://enigmatic-lowlands-97259.herokuapp.com'
      : 'http://localhost:8080';

    this.http.post(`${baseUrl}/email`, body).subscribe({
      next: (response) => console.log('success:', response),
      error: (err) => console.log('error:', err)
    });
  }
}
