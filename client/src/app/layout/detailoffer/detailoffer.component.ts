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

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const offerId = params['id'];
      this.customerpanelApiService.getOfferById(offerId).subscribe((offer) => {
        this.offer = offer.offer;
      });
    });
  }
}
