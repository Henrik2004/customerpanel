import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent {
  protected isActive = false;
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
              private refreshService: RefreshService) { }

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(): void {
    this.isActive = true;
  }

  public onSubmit(): void {
    this.closeModal();
    this.customer.createdBy = this.customerPanelApiService.user;
    this.customerPanelApiService.createCustomer(this.customer).subscribe((response) => {
      this.refreshService.triggerRefresh();
    });
  }
}
