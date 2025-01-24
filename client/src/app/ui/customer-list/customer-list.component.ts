import {Component, OnInit} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {CustomerCardComponent} from '../customer-card/customer-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  imports: [
    CustomerCardComponent,
    NgForOf
  ],
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers = [];

  constructor(
    private customerPanelApiService: CustomerpanelApiService,
    private refreshService: RefreshService
  ) {
  }

  ngOnInit() {
    this.loadCustomers();
    this.refreshService.refresh$.subscribe(() => {
      this.loadCustomers();
    });
  }

  private loadCustomers() {
    this.customerPanelApiService.getCustomers().subscribe((response) => {
      this.customers = response;
    });
  }

  trackByCustomerId(index: number, customer: any): number {
    return customer.id;
  }
}
