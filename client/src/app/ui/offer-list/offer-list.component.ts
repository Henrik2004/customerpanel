import {Component, Input} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {OfferCardComponent} from '../offer-card/offer-card.component';
import {NgForOf} from '@angular/common';
import {RefreshService} from '../../shared/refresh.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  imports: [
    OfferCardComponent,
    NgForOf
  ],
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  @Input() status: string = '';
  offers = [];

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.loadOffers();
    this.refreshService.refresh$.subscribe(() => {
      this.loadOffers();
    });
  }

  private loadOffers() {
    if (this.status === 'all') {
      this.customerpanelApiService.getAllOffers().subscribe((response) => {
        this.offers = response;
      });
      return;
    }
    this.customerpanelApiService.getOffers(this.status).subscribe((response) => {
      this.offers = response;
    });
  }

  trackByOfferId(index: number, offer: any): number {
    return offer.id;
  }
}
