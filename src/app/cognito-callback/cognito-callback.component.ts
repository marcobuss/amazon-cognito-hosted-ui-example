import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-cognito-callback',
  templateUrl: './cognito-callback.component.html',
  styleUrls: ['./cognito-callback.component.scss'],
})
export class CognitoCallbackComponent implements OnInit {

  // constructor(private route: ActivatedRoute, private cognitoService: CognitoService) {}
  //
  // ngOnInit() {
  //   this.route.fragment.subscribe(params => {
  //     const parameter = params.split('&');
  //     const idToken = parameter[0].split('=')[1];
  //     this.cognitoService.login(idToken);
  //   });
  // };

  // Using HUB Middleware to listen for authentication
  constructor(private router: Router) {
    Hub.listen('auth', this, 'AuthCodeListener');
  }

  onHubCapsule(capsule) {
    const { channel, payload } = capsule;
    if(channel === 'auth' && payload.event === 'signIn') {
      this.router.navigate([])
    }
  }

  ngOnInit() {}
}
