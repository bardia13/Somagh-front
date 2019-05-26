import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, ) {
    // console.log(route);

    let routePath = route['routeConfig']['path'];
    // console.log("route path : " + routePath);

    // console.log(this.authService.isAuthenticated());

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          // console.log("authentication : " + authenticated);
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}