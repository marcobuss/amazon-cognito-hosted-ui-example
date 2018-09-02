import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CognitoService} from "../aws/cognito.service";
import {CognitoAuth} from 'amazon-cognito-auth-js';

@Component({
  selector: 'app-cognito-callback',
  templateUrl: './cognito-callback.component.html',
  styleUrls: ['./cognito-callback.component.scss'],
})
export class CognitoCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cognitoService: CognitoService) {}

  ngOnInit() {
    this.route.fragment.subscribe(params => {
      const parameter = params.split('&');
      const idToken = parameter[0].split('=')[1];
      this.cognitoService.login(idToken);
    });
  };
}
