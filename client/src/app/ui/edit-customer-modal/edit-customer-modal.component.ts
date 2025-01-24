import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {NgIf} from '@angular/common';
import {ModalService} from '../../shared/modal.service';
import {RefreshService} from '../../shared/refresh.service';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent {
  protected isActive = false;
  protected customerId = 0;
  protected customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    company: '',
    createdBy: 0
  }

  constructor(private customerPanelApiService: CustomerpanelApiService,
              private modalService: ModalService,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.modalService.modalState$.subscribe(state => {
      this.isActive = state.isOpen;
      if (state.customerId) {
        this.loadCustomer(state.customerId);
      }
    });
  }

  private loadCustomer(customerId: number) {
    this.customerPanelApiService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.customer;
      this.customerId = customerId;
    });
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  public onSubmit(): void {
    this.closeModal();
    const customer = {
      name: this.customer.name,
      email: this.customer.email,
      phone: this.customer.phone,
      address: this.customer.address,
      city: this.customer.city,
      country: this.customer.country,
      zip: this.customer.zip,
      company: this.customer.company,
      updatedBy: this.customerPanelApiService.user
    }
    this.customerPanelApiService.updateCustomer(this.customerId, customer).subscribe((response) => {
      this.refreshService.triggerRefresh();
    });
  }
}
