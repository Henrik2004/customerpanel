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
  offersCount: number = 0;
  customersCount: number = 0;
  documentsCount: number = 0;
  tagsCount: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private router: Router) { }

  ngOnInit() {
    this.customerpanelApiService.getAllOffers().subscribe((data: any) => {
      this.offersCount = data.length;
    });

    this.customerpanelApiService.getCustomers().subscribe((data: any) => {
      this.customersCount = data.length;
    });

    this.customerpanelApiService.getDocuments().subscribe((data: any) => {
      this.documentsCount = data.length;
    });

    this.customerpanelApiService.getTags().subscribe((data: any) => {
      this.tagsCount = data.length;
    });
  }

  viewOffers() {
    this.router.navigate(['/offers']);
  }

  viewCustomers() {
    this.router.navigate(['/customers']);
  }

  viewDocuments() {
    this.router.navigate(['/documents']);
  }
}
