import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {   constructor(private router: Router, private dataSharingService: DataSharingService) { }
isUserLoggedIn: boolean | undefined;
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  const { authenticationRequired, authenticationFailureRedirectUrl } = route.data;
  this.dataSharingService.isUserLoggedIn.subscribe(value => {
    
    this.isUserLoggedIn = value;
    console.log(this.isUserLoggedIn)

  });
  if (
    typeof authenticationRequired === 'boolean' &&
    authenticationRequired === this.isUserLoggedIn
  ) { return true; }

  let authRedirectUrl = authenticationFailureRedirectUrl
  if (authenticationRequired) {
    const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`, '');
    authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
  }

  return this.router.parseUrl(authRedirectUrl || '/');
}

}