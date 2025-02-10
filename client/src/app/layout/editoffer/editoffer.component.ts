import {Component, OnInit} from '@angular/core';
import { CustomerpanelApiService } from '../../shared/customerpanel-api.service';
import {NgForOf} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-editoffer',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './editoffer.component.html',
  styleUrl: './editoffer.component.scss'
})
export class EditofferComponent implements OnInit {
  customers: any[] = [];
  protected title: any;
  protected description: any;
  protected price: any;
  protected customer: any;
  selectedCustomer: number = 0;
  offerId: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.customerpanelApiService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
    this.route.queryParams.subscribe((params) => {
      this.offerId = params['id'];
      this.customerpanelApiService.getOfferById(this.offerId).subscribe((offer) => {
        const offerData = offer.offer;
        this.title = offerData.title;
        this.description = offerData.description;
        this.price = offerData.price;
        this.selectedCustomer = offerData.customerId;
      });
    });
  }

  onSubmit() {
    this.customerpanelApiService.updateOffer(this.offerId, {
      title: this.title,
      description: this.description,
      price: this.price,
      customerId: this.selectedCustomer,
      status: 'draft',
      updatedBy: this.customerpanelApiService.user
    }).subscribe(() => {
      this.router.navigate(['/offers']);
      this.toastr.success('Offer updated successfully');
    });
  }

  cancel() {
    this.router.navigate(['/offers']);
  }
}
