import {Component} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {OfferCardComponent} from '../offer-card/offer-card.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  imports: [
    OfferCardComponent,
    AsyncPipe
  ],
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  public offers$;

  constructor(private customerpanelApiService: CustomerpanelApiService) {
    this.offers$ = this.customerpanelApiService.getOffers();
  }
}
