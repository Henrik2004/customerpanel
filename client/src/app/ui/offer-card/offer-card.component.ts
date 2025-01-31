import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: any;
  showMore: boolean = false;
  customer$: Observable<any> | undefined;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.customer$ = this.customerpanelApiService.getCustomerById(this.offer.customerId);
  }

  deleteOffer(offerId: number) {
    this.customerpanelApiService.deleteOffer(offerId).subscribe(() => {
      this.refreshService.triggerRefresh();
    });
  }
}
