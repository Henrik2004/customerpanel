import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: any;
  showMore: boolean = false;

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  ngOnInit() {
    this.customerpanelApiService.getCustomerById(this.offer.customerId).subscribe((customer: any) => {
      this.offer.offerCardCustomerName = customer.customer.name;
      this.offer.offerCardCustomerCompany = customer.customer.company;
    });
  }
}
