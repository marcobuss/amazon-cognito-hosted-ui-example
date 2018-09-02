import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognitoService } from './cognito.service';
import {Router} from "@angular/router";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: []
})
export class AwsModule {
}
