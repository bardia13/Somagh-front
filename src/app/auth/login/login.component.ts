/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth/auth.options';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { OperationsService } from '../../@core/data/operations.service'
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { NbAuthOAuth2Token } from '@nebular/auth';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private operationService: OperationsService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    console.log(this.user)
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.service.onTokenChange().subscribe(
          (token: NbAuthOAuth2Token) => {
            this.operationService.setHttpHeader(token);
          }
        )
        console.log(this.messages)
      } else {
        this.errors = result.getErrors();
        console.log(this.errors)
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
