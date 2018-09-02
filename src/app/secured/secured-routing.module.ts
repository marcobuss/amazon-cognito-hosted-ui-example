import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecureSiteComponent} from "./secure-site/secure-site.component";

const routes: Routes = [
  {
    path: '**',
    component: SecureSiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredRoutingModule { }
