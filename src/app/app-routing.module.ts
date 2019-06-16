import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: JumbotronComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
