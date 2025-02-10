import {Component, OnInit} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {CustomerCardComponent} from '../customer-card/customer-card.component';
import {NgForOf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  company: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface SortedCustomer {
  id: number;
  totalPrice: number;
  offerCount: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  company: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

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
  customers: Customer[] = [];

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
      this.customers = this.sortCustomers(response);
    });
  }

  trackByCustomerId(index: number, customer: any): number {
    return customer.id;
  }

  private sortCustomers(customers: Customer[]): SortedCustomer[] {
    const sortedCustomers: SortedCustomer[] = [];
    this.customerPanelApiService.getAllOffers().subscribe((offers) => {
      for (const customer of customers) {
        let totalPrice = 0;
        let offerCount = 0;
        for (const offer of offers) {
          if (offer.customerId === customer.id) {
            totalPrice += offer.price;
            offerCount++;
          }
        }
        sortedCustomers.push({
          id: customer.id,
          totalPrice,
          offerCount,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          zip: customer.zip,
          country: customer.country,
          company: customer.company,
          createdAt: customer.createdAt,
          createdBy: customer.createdBy,
          updatedAt: customer.updatedAt,
          updatedBy: customer.updatedBy
        });
      }
      sortedCustomers.sort((a, b) => {
        if (a.totalPrice < b.totalPrice) {
          return 1;
        } else if (a.totalPrice > b.totalPrice) {
          return -1;
        } else {
          if (a.offerCount < b.offerCount) {
            return 1;
          } else if (a.offerCount > b.offerCount) {
            return -1;
          }
        }
        return 0;
      });
      console.log(sortedCustomers);
    });
    return sortedCustomers;
  }
}
