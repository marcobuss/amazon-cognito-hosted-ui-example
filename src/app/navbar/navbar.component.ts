import { Component, OnInit } from '@angular/core';
import {CognitoService} from "../aws/cognito.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private cognitoService: CognitoService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.cognitoService.isLoggedIn();
  }

}
