import { Component } from '@angular/core';
import {OfferListComponent} from '../../ui/offer-list/offer-list.component';

@Component({
  selector: 'app-offers',
  imports: [
    OfferListComponent
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent {

}
