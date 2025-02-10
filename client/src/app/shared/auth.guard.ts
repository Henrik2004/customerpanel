import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CustomerpanelApiService} from './customerpanel-api.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private customerPanelApiService: CustomerpanelApiService,
              private router: Router,
              private toastr: ToastrService) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      if (new Date().getTime() - parseInt(<string>localStorage.getItem('tokenTime'), 10) > 1800000) {
        this.customerPanelApiService.logout();
        this.router.navigate(['/login']);
        this.toastr.error('Session expired, please login again');
        return false;
      }
      this.customerPanelApiService.token = localStorage.getItem('token') || '';
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('Please login to access this page');
      return false;
    }
  }
}
