import {Component, Input} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {OfferCardComponent} from '../offer-card/offer-card.component';
import {AsyncPipe} from '@angular/common';
import { Observable } from 'rxjs';

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
  @Input() status: string = '';
  public offers$: Observable<any>;

  constructor(private customerpanelApiService: CustomerpanelApiService) {
    this.offers$ = new Observable();
  }

  ngOnInit() {
    this.offers$ = this.customerpanelApiService.getOffers(this.status);
  }
}
