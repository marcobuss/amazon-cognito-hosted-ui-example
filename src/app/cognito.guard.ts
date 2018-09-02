import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CognitoService} from "./aws/cognito.service";

@Injectable()
export class CognitoGuard implements CanActivate {

  constructor(private cognitoService: CognitoService) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.cognitoService.isLoggedIn()) {
      return true;
    } else {
      window.location.href = CognitoService._LOGIN_URL;
    }

  }
}
