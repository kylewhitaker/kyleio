import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { environment } from '../../../environments/environment';

const customEmailValidator: ValidatorFn = (control) => {
  return Validators.pattern(/.+@.+\..+/i)(control) && { email: true };
};

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  @Output() completed = new EventEmitter<boolean>();

  roles: string[][] = [
    ['Need help? Hire me!'],
    ['Have an idea? I can help!'],
    [`Don't be a stranger. Say hello!`],
  ];

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, customEmailValidator]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  sendEmail(): void {
    const baseUrl = environment.production
      ? 'https://enigmatic-lowlands-97259.herokuapp.com'
      : 'http://localhost:8080';

    this.http.post(`${baseUrl}/email`, this.contactForm.value).subscribe({
      next: (response) => this.completed.emit(true),
      error: (err) => this.completed.emit(false)
    });
  }

}
