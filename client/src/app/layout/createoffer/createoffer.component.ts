import {Component, OnInit} from '@angular/core';
import { CustomerpanelApiService } from '../../shared/customerpanel-api.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-createoffer',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './createoffer.component.html',
  styleUrl: './createoffer.component.scss'
})
export class CreateofferComponent implements OnInit {
  customers: any[] = [];
  protected title: any;
  protected description: any;
  protected price: any;
  protected customer: any;
  selectedCustomer: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService, private router: Router) {
  }

  ngOnInit() {
    this.customerpanelApiService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  onSubmit() {
    this.customerpanelApiService.createOffer({
      title: this.title,
      description: this.description,
      price: this.price,
      customerId: this.selectedCustomer,
      status: 'draft',
      createdBy: this.customerpanelApiService.user
    }).subscribe((response) => {
      this.router.navigate(['/offers']);
    });
  }
}
