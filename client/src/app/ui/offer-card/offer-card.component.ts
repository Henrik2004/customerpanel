import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: any;
  showMore: boolean = false;
  customer$: Observable<any> | undefined;
  statuses = ['draft', 'active', 'onIce'];

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private refreshService: RefreshService,
              private router: Router,
              private toastr: ToastrService,
              protected userService: UserService) {
  }

  ngOnInit() {
    this.customer$ = this.customerpanelApiService.getCustomerById(this.offer.customerId);
  }

  deleteOffer(offerId: number) {
    this.customerpanelApiService.deleteOffer(offerId).subscribe(() => {
      this.refreshService.triggerRefresh();
      this.toastr.success('Offer deleted successfully');
    });
  }

  editOffer(offerId: number) {
    this.router.navigate(['/editoffer'], {queryParams: {id: offerId}});
  }

  showOfferDetails(offerId: number) {
    this.router.navigate(['/detailoffer'], {queryParams: {id: offerId}});
  }

  changeStatus(offerId: number) {
    const data = {
      status: this.offer.status,
      updatedBy: this.customerpanelApiService.user
    }
    this.customerpanelApiService.changeOfferStatus(offerId, data).subscribe(() => {
      this.refreshService.triggerRefresh();
      this.toastr.success('Status changed successfully');
    });
  }
}
