import { Component, OnInit } from '@angular/core';
import {CognitoService} from "../../aws/cognito.service";

@Component({
  selector: 'app-secure-site',
  templateUrl: './secure-site.component.html',
  styleUrls: ['./secure-site.component.scss']
})
export class SecureSiteComponent implements OnInit {

  constructor(private cognitoService: CognitoService) {
  }

  ngOnInit() {
  }

  public logout() {
    this.cognitoService.logout();
  }

}
