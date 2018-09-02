import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

@Injectable()
export class CognitoGuard implements CanActivate {

  constructor(private amplifyService: AmplifyService ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.amplifyService.auth().currentSession().catch((error) => {
      const config = this.amplifyService.auth().configure(false);
      const {
        domain,
        redirectSignIn,
        responseType
      } = config['oauth'];

      const clientId = config['userPoolWebClientId'];
      const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn +
        '&response_type=' + responseType + '&client_id=' + clientId;

      // Launch hosted UI
      window.location.assign(url);
    });
  }
}
