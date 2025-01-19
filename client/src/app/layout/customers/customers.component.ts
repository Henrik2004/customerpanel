import { Component } from '@angular/core';
import {OfferListComponent} from "../../ui/offer-list/offer-list.component";
import {CustomerListComponent} from '../../ui/customer-list/customer-list.component';

@Component({
  selector: 'app-customers',
  imports: [
    OfferListComponent,
    CustomerListComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
