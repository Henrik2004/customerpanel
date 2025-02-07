import {Component, OnInit} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  offers: any = [];
  offersCount: number = 0;
  customers: any = [];
  customersCount: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private router: Router) { }

  ngOnInit() {
    this.customerpanelApiService.getAllOffers().subscribe((data: any) => {
      this.offers = data;
      this.offersCount = data.length;
    });

    this.customerpanelApiService.getCustomers().subscribe((data: any) => {
      this.customers = data;
      this.customersCount = data.length;
    });
  }

  viewOffers() {
    this.router.navigate(['/offers']);
  }

  viewCustomers() {
    this.router.navigate(['/customers']);
  }
}
