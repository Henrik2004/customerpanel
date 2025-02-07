import {Component, OnInit} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {OfferListComponent} from '../../ui/offer-list/offer-list.component';

@Component({
  selector: 'app-alloffers',
  imports: [
    OfferListComponent
  ],
  templateUrl: './alloffers.component.html',
  styleUrl: './alloffers.component.scss'
})
export class AlloffersComponent implements OnInit {
  offers: any = [];
  all: string = 'all';

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  ngOnInit() {
    this.customerpanelApiService.getAllOffers().subscribe((data) => {
      this.offers = data;
    });
  }
}
