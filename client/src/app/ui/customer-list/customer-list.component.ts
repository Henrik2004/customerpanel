import {Component} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {OfferCardComponent} from '../offer-card/offer-card.component';
import {AsyncPipe} from '@angular/common';
import {CustomerCardComponent} from '../customer-card/customer-card.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  imports: [
    AsyncPipe,
    CustomerCardComponent
  ],
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  public customers$;

  constructor(private customerpanelApiService: CustomerpanelApiService) {
    this.customers$ = this.customerpanelApiService.getCustomers();
  }
}
