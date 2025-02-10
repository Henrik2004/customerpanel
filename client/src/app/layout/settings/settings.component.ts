import { Component } from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  tablesbtnactive: boolean = true;
  testbtnactive: boolean = true;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private toastr: ToastrService) { }

  recreateDatabaseTables() {
    this.tablesbtnactive = false;
    this.customerpanelApiService.recreateDatabaseTables().subscribe();
    this.loadTestData();
    this.toastr.info('Recreating Tables...');
    setTimeout(() => {
      this.toastr.success('Database tables recreated');
      this.tablesbtnactive = true;
    }, 10000);
  }

  loadTestData() {
    this.testbtnactive = false;
    this.customerpanelApiService.loadTestData().subscribe();
    this.toastr.info('Loading test data...');
    setTimeout(() => {
      this.toastr.success('Test data loaded');
      this.testbtnactive = true;
    }, 10000);
  }
}
