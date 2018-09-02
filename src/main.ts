import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: environment.identityPoolId,
    region: environment.region,
    userPoolId: environment.userPoolId,
    userPoolWebClientId: environment.clientId,
    oauth: {
      domain: `${environment.domainName}.auth.${environment.region}.amazoncognito.com`,
      scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'],
      redirectSignIn : 'http://localhost:4200/cognito-callback',

      // Sign out URL
      redirectSignOut : 'http://localhost:4200/',

      // 'code' for Authorization code grant,
      // 'token' for Implicit grant
      responseType: 'code',

      // optional, for Cognito hosted ui specified options
      // options: {
      //   // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
      //   AdvancedSecurityDataCollectionFlag : true
      // }
    }
  }

});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
