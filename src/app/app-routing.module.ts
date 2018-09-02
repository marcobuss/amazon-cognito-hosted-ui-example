import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CognitoCallbackComponent } from "./cognito-callback/cognito-callback.component";
import {CognitoGuard} from "./cognito.guard";

const routes: Routes = [
  {
    path: 'secure',
    loadChildren: './secured/secured.module#SecuredModule',
    canActivate: [CognitoGuard]
  },
  {
    path: 'secured',
    loadChildren: './secured/secured.module#SecuredModule',
    canActivate: [CognitoGuard]
  },
  {
    path: 'cognito-callback',
    component: CognitoCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
