import {Component, OnInit, ViewChild} from '@angular/core';
import { CustomerpanelApiService } from '../../shared/customerpanel-api.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CreateCustomerModalComponent} from '../../ui/create-customer-modal/create-customer-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-createoffer',
  imports: [
    NgForOf,
    FormsModule,
    CreateCustomerModalComponent
  ],
  templateUrl: './createoffer.component.html',
  styleUrl: './createoffer.component.scss'
})
export class CreateofferComponent implements OnInit {
  @ViewChild(CreateCustomerModalComponent) createCustomerModal!: CreateCustomerModalComponent;

  customers: any[] = [];
  protected title: any;
  protected description: any;
  protected price: any;
  protected customer: any;
  selectedCustomer: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.customerpanelApiService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  onSubmit() {

    if (this.createCustomerModal.isModalActive()) {
      return;
    }

    this.customerpanelApiService.createOffer({
      title: this.title,
      description: this.description,
      price: this.price,
      customerId: this.selectedCustomer,
      status: 'draft',
      createdBy: this.customerpanelApiService.user
    }).subscribe(() => {
      this.router.navigate(['/offers']);
      this.toastr.success('Offer created successfully');
    });
  }

  fetchCustomers() {
    this.customerpanelApiService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  createCustomer() {
    this.createCustomerModal.openModal();
  }
}
