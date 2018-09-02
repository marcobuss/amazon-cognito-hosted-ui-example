import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk/global";
import {Router} from "@angular/router";

@Injectable()
export class CognitoService {

  public static _REGION = environment.region;

  public static _IDENTITY_POOL_ID = environment.identityPoolId;
  public static _IDP_ENDPOINT = `cognito-idp.${environment.region}.amazonaws.com/${environment.userPoolId}`;
  public static _LOGIN_URL = `https://${environment.domainName}.auth.${environment.region}.amazoncognito.com/login?redirect_uri=http://localhost:4200/cognito-callback&response_type=token&client_id=${environment.clientId}`;
  public static _LOGOUT_URL = `https://${environment.domainName}.auth.${environment.region}.amazoncognito.com/logout?logout_uri=http://localhost:4200&client_id=${environment.clientId}`;

  private cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor(private router: Router) {
    this.cognitoCreds = JSON.parse(localStorage.getItem('cognito-creds'));
    // check if token is valid
  }

  login(idToken: string) {
    const params = {
      IdentityPoolId: CognitoService._IDENTITY_POOL_ID,
      Logins: {
      }
    };
    params.Logins[CognitoService._IDP_ENDPOINT] = idToken;

    this.setCognitoCreds(new AWS.CognitoIdentityCredentials(params, { region: CognitoService._REGION}));

    this.cognitoCreds.refresh((err => {
      if(err) {
        console.log("Login failed");
      } else {
        localStorage.setItem('cognito-creds', JSON.stringify(this.cognitoCreds));
        //
        this.router.navigate(['/secure']);
        console.log("Login success ");
      }
    }));
  }

  logout() {
    localStorage.removeItem('cognito-creds');
    window.location.href = CognitoService._LOGOUT_URL;
  }

  // AWS Stores Credentials in many ways, and with TypeScript this means that
  // getting the base credentials we authenticated with from the AWS globals gets really murky,
  // having to get around both class extension and unions. Therefore, we're going to give
  // developers direct access to the raw, unadulterated CognitoIdentityCredentials
  // object at all times.
  setCognitoCreds(creds: AWS.CognitoIdentityCredentials) {
    this.cognitoCreds = creds;
  }

  getCognitoCreds(): AWS.CognitoIdentityCredentials {
    return this.cognitoCreds;
  }

  isLoggedIn() {
    let result = false;
    if(this.cognitoCreds != null) {
      result = true;
    }
    return result;
  }
}
