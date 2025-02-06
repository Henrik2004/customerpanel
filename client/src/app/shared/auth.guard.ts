import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CustomerpanelApiService} from './customerpanel-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private customerPanelApiService: CustomerpanelApiService,
              private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      if (new Date().getTime() - parseInt(<string>localStorage.getItem('tokenTime'), 10) > 300000) {
        this.customerPanelApiService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      this.customerPanelApiService.token = localStorage.getItem('token') || '';
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
