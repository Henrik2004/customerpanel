import {Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomerpanelApiService } from '../../shared/customerpanel-api.service';
import { RefreshService } from '../../shared/refresh.service';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent {
  protected isActive = false;
  customerForm: any;

  constructor(
    private customerPanelApiService: CustomerpanelApiService,
    private refreshService: RefreshService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
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

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(): void {
    this.isActive = true;
  }

  public onSubmit(): void {
    if (this.customerForm.valid) {
      this.closeModal();
      const customer = { ...this.customerForm.value, createdBy: this.customerPanelApiService.user };
      this.customerPanelApiService.createCustomer(customer).subscribe((response) => {
        this.refreshService.triggerRefresh();
        this.toastr.success('Customer created successfully');
      });
    }
  }

  public isModalActive(): boolean {
    return this.isActive;
  }
}
