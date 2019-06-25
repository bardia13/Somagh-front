import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { MENU_ITEMS } from './pages-menu';
import { OperationsService } from '../@core/data/operations.service'
import { NbAuthService, NbAuthOAuth2Token } from '@nebular/auth/services';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  user_subscription: Subscription
  constructor(private operationsService : OperationsService,
    private authService: NbAuthService,){

      this.authService.onTokenChange().subscribe(
        (token: NbAuthOAuth2Token) => {
          operationsService.setHttpHeader(token);
        })
  }

  ngOnInit(){
    this.user_subscription = this.operationsService.userInfoGet().subscribe();
  }

  ngOnDestroy(){
    this.user_subscription.unsubscribe();
  }
}
