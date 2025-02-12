import { Component } from '@angular/core';
import {OfferListComponent} from '../../ui/offer-list/offer-list.component';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-offers',
  imports: [
    OfferListComponent,
    NgIf
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent {
  statusdraft = 'draft';
  statusactive = 'active';
  statusonice = 'onice';
  showOnIceOffers = false;

  constructor(private router: Router,
              protected userService: UserService) {
  }

  toggleOnIceOffers() {
    this.showOnIceOffers = !this.showOnIceOffers;
  }

  openCreateOffer() {
    this.router.navigate(['/createoffer']);
  }
}
