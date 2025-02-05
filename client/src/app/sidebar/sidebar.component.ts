import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CustomerpanelApiService} from '../shared/customerpanel-api.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router,
              private customerpanelApiService: CustomerpanelApiService) {}

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  logout(): void {
    this.customerpanelApiService.logout();
  }
}
