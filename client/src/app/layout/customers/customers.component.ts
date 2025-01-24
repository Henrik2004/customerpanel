import {Component, ViewChild} from '@angular/core';
import {CustomerListComponent} from '../../ui/customer-list/customer-list.component';
import {CreateCustomerModalComponent} from '../../ui/create-customer-modal/create-customer-modal.component';
import {EditCustomerModalComponent} from '../../ui/edit-customer-modal/edit-customer-modal.component';

@Component({
  selector: 'app-customers',
  imports: [
    CustomerListComponent,
    CreateCustomerModalComponent,
    EditCustomerModalComponent
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
