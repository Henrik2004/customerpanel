import { Routes } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {OffersComponent} from './offers/offers.component';
import {CustomersComponent} from './customers/customers.component';
import {SettingsComponent} from './settings/settings.component';
import {CreateofferComponent} from './createoffer/createoffer.component';
import {AlloffersComponent} from './alloffers/alloffers.component';

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'createoffer', component: CreateofferComponent },
  { path: 'alloffers', component: AlloffersComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];
