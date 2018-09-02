import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecureSiteComponent } from './secure-site/secure-site.component';

@NgModule({
  imports: [
    CommonModule,
    SecuredRoutingModule
  ],
  declarations: [SecureSiteComponent]
})
export class SecuredModule { }
