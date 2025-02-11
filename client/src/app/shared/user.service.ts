import { Injectable } from '@angular/core';
import {CustomerpanelApiService} from './customerpanel-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  get role(): number {
    return this.customerpanelApiService.user;
  }
}
