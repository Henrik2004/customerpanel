import { Component } from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(private customerpanelApiService: CustomerpanelApiService) { }

  recreateDatabaseTables() {
    this.customerpanelApiService.recreateDatabaseTables().subscribe();
    this.loadTestData();
  }

  loadTestData() {
    this.customerpanelApiService.loadTestData().subscribe();
  }
}
