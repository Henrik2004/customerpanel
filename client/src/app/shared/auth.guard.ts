import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CustomerpanelApiService} from './customerpanel-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private customerPanelApiService: CustomerpanelApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.customerPanelApiService.token !== '') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
