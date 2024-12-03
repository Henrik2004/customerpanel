import { Routes } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {OffersComponent} from './offers/offers.component';
import {CustomersComponent} from './customers/customers.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];
