import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import  {CognitoCallbackComponent } from "./cognito-callback/cognito-callback.component";
import {CognitoService} from "./aws/cognito.service";
import {CognitoGuard} from "./cognito.guard";
import {AwsModule} from "./aws/aws.module";
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    CognitoCallbackComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CognitoService, CognitoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
