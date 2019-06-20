import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { environment } from '../../../environments/environment';

interface ApiValidationError {
  location: string;
  param: string;
  value: string;
  msg: string;
}

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
    name: [''],
    email: [''],
    subject: [''],
    message: ['']
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

    this.contactForm.disable();

    const baseUrl = environment.production
      ? 'https://enigmatic-lowlands-97259.herokuapp.com'
      : 'http://localhost:8080';

    this.http.post(`${baseUrl}/email`, this.contactForm.value).subscribe({
      next: (response) => this.completed.emit(true),
      error: (httpError: HttpErrorResponse) => {
        this.contactForm.enable();
        if (httpError.status === 400 && !!httpError.error && !!httpError.error.validationErrors) {
          httpError.error.validationErrors.forEach((ve: ApiValidationError) => this.setError(ve));
        } else {
          this.completed.emit(false);
        }
      }
    });

  }

  private setError(error: ApiValidationError): void {
    let err = {};
    switch (error.msg) {
      case 'required':
        err = { required: true };
        break;
      case 'email':
        err = { email: true };
        break;
      default:
        break;
    }
    const control = this.contactForm.get(error.param);
    control.setErrors({ ...control.errors, ...err });
  }

}
