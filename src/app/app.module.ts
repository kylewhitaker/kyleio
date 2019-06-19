import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnimatedTypingComponent } from './components/animated-typing/animated-typing.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactSuccessComponent } from './components/contact-success/contact-success.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactFailureComponent } from './components/contact-failure/contact-failure.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    JumbotronComponent,
    NavbarComponent,
    AnimatedTypingComponent,
    PortfolioComponent,
    ContactSuccessComponent,
    ContactFormComponent,
    ContactFailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
