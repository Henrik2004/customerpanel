import { Routes } from '@angular/router';
import {OverviewComponent} from './layout/overview/overview.component';
import {OffersComponent} from './layout/offers/offers.component';
import {CustomersComponent} from './layout/customers/customers.component';
import {SettingsComponent} from './layout/settings/settings.component';
import {CreateofferComponent} from './layout/createoffer/createoffer.component';
import {AlloffersComponent} from './layout/alloffers/alloffers.component';

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'createoffer', component: CreateofferComponent },
  { path: 'alloffers', component: AlloffersComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];
