import { Component, Input, OnInit, Inject } from '@angular/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
import { NbMenuService, NbSidebarService, NB_WINDOW} from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { NbAuthOAuth2Token, NbAuthService, NbAuthResult, NB_AUTH_OPTIONS, NbLogoutComponent } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'پروفایل', data:'profile' }, { title: 'خروج', data:'logout' }];
  strategy: string = '';
  redirectDelay: number = 0;

  constructor(private sidebarService: NbSidebarService,
              private nbMenuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              protected service: NbAuthService,   
              private router: Router,
              private directionService: NbLayoutDirectionService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              @Inject(NB_WINDOW) private window, ) {
    this.strategy = this.getConfigValue('forms.logout.strategy');
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.directionService.setDirection(NbLayoutDirection.RTL);
  }


  //logout :
  logout(): void {
    console.log("logout strategy: " + this.strategy);
    this.service.logout(this.strategy).subscribe((result: NbAuthResult) => {

        if(result.isSuccess){
          
            return this.router.navigateByUrl('auth/login');
  
        }
    });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);

    this.nbMenuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'user-menu'),
      map(({ item: { data } }) => data),
    )
    .subscribe(data => {
      
      if (data == "logout"){
        console.log("clicked")
        this.logout()     
      }
      
    });
   
  }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.nbMenuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


}
