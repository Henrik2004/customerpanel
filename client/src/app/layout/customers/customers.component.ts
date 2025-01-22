import {Component, ViewChild} from '@angular/core';
import {OfferListComponent} from "../../ui/offer-list/offer-list.component";
import {CustomerListComponent} from '../../ui/customer-list/customer-list.component';
import {CreateCustomerModalComponent} from '../../ui/create-customer-modal/create-customer-modal.component';

@Component({
  selector: 'app-customers',
  imports: [
    OfferListComponent,
    CustomerListComponent,
    CreateCustomerModalComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  @ViewChild(CreateCustomerModalComponent) createCustomerModal!: CreateCustomerModalComponent;

  constructor() { }

  public openCreateCustomerModal(): void {
    this.createCustomerModal.openModal();
  }
}
