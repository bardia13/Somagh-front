/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { OperationsService } from './@core/data/operations.service'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAuthComponent } from './auth/auth.component'
import { NgxLoginComponent } from './auth/login/login.component'
import { NgxLogoutComponent } from './auth/logout/logout.component'
import { NgxRegisterComponent } from './auth/register/register.component'
import { AuthGuard } from './auth-guard.service'

import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
  NbAuthOAuth2Token,
  NbOAuth2ResponseType,
} from '@nebular/auth';


@NgModule({
  declarations: [
    AppComponent,
    NgxAuthComponent, 
    NgxLoginComponent,
    NgxLogoutComponent,
    NgxRegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      strategies : [
        NbOAuth2AuthStrategy.setup({
          name : 'email',
          clientId : 'TaZF7HeEgP7pFV2fAwqRb4Z0UdkWsqXJqi1R1xR4',
          clientSecret : 'lPHLzA7N0ZeZbrkaIGHWm9B2lT1A664V3a16HiTe7eyaoQ0qmotJ2kxlhNOkBYPdp6WdMpYyUwd9AYtgDILUbavEzyCXGqol1d9JnzC5HHHIy5CG1m21lW7HyQ1EJofx',
          clientAuthMethod : NbOAuth2ClientAuthMethod.REQUEST_BODY,
          baseEndpoint : 'http://localhost:8000',
          authorize:{
            endpoint : '/o/token/',
            responseType : NbOAuth2ResponseType.TOKEN,
          },
          token : {
            endpoint : '/o/token/',
            grantType : NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2Token,
          }
        })
      ]
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    OperationsService,
  ],
})
export class AppModule {
}
