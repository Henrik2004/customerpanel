import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {NgIf} from '@angular/common';
import {ModalService} from '../../shared/modal.service';
import {RefreshService} from '../../shared/refresh.service';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit {
  protected isActive = false;
  protected customerId = 0;
  customerForm: any;

  constructor(private customerPanelApiService: CustomerpanelApiService,
              private modalService: ModalService,
              private refreshService: RefreshService,
              private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      company: ['', Validators.required]
    });
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
      this.customerForm.patchValue(response.customer);
      this.customerId = customerId;
    });
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  public onSubmit(): void {
    if (this.customerForm.valid) {
      this.closeModal();
      const customer = { ...this.customerForm.value, updatedBy: this.customerPanelApiService.user };
      this.customerPanelApiService.updateCustomer(this.customerId, customer).subscribe(() => {
        this.refreshService.triggerRefresh();
      });
    }
  }
}
