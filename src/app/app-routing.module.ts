import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { JumbotronComponent } from "./components/jumbotron/jumbotron.component";
import { ContactComponent } from "./components/contact/contact.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";

const routes: Routes = [
  { path: "", component: JumbotronComponent },
  { path: "contact", component: ContactComponent },
  { path: "portfolio", component: PortfolioComponent },
  {
    path: "prolife2022",
    component: JumbotronComponent,
    resolve: {
      url: "externalUrlRedirectResolver",
    },
    data: {
      externalUrl: "https://wp.kylewhitaker.io/",
    },
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: "externalUrlRedirectResolver",
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class AppRoutingModule {}
