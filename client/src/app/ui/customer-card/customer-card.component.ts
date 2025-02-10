import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ModalService} from '../../shared/modal.service';
import {RefreshService} from '../../shared/refresh.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input({required: true}) customer!: any;
  public showMore = false;

  constructor(
    private modalService: ModalService,
    private customerPanelApiService: CustomerpanelApiService,
    private refreshService: RefreshService,
    private toastr: ToastrService
  ) {
  }

  public editCustomer() {
    this.modalService.openModal(this.customer.id);
  }

  public deleteCustomer() {
    this.customerPanelApiService.deleteCustomer(this.customer.id).subscribe((response) => {
      this.refreshService.triggerRefresh();
      this.toastr.success('Customer deleted successfully');
    });
  }
}
