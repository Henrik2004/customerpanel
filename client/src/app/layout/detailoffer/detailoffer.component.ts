import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detailoffer',
  imports: [
    FormsModule
  ],
  templateUrl: './detailoffer.component.html',
  styleUrl: './detailoffer.component.scss'
})
export class DetailofferComponent implements OnInit {
  offer: any = {};
  customer: any = {};
  createdByOffer: any = {};
  updatedByOffer: any = {};
  createdByCustomer: any = {};
  updatedByCustomer: any = {};

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const offerId = params['id'];
      this.customerpanelApiService.getOfferById(offerId).subscribe((offer) => {
        this.offer = offer.offer;
        this.customerpanelApiService.getCustomerById(this.offer.customerId).subscribe((customer) => {
          this.customer = customer.customer;
          this.customerpanelApiService.getUserById(this.customer.createdBy).subscribe((user) => {
            this.createdByCustomer = user.user.name;
          });
          this.customerpanelApiService.getUserById(this.customer.updatedBy).subscribe((user) => {
            this.updatedByCustomer = user.user.name;
          });
        });
        this.customerpanelApiService.getUserById(this.offer.createdBy).subscribe((user) => {
          this.createdByOffer = user.user.name;
        });
        this.customerpanelApiService.getUserById(this.offer.updatedBy).subscribe((user) => {
          this.updatedByOffer = user.user.name;
        });
      });
    });
  }
}
