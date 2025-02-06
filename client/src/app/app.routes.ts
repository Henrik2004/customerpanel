import { Routes } from '@angular/router';
import {OverviewComponent} from './layout/overview/overview.component';
import {OffersComponent} from './layout/offers/offers.component';
import {CustomersComponent} from './layout/customers/customers.component';
import {SettingsComponent} from './layout/settings/settings.component';
import {CreateofferComponent} from './layout/createoffer/createoffer.component';
import {AlloffersComponent} from './layout/alloffers/alloffers.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import {EditofferComponent} from './layout/editoffer/editoffer.component';
import {DetailofferComponent} from './layout/detailoffer/detailoffer.component';

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'createoffer', component: CreateofferComponent, canActivate: [AuthGuard] },
  { path: 'editoffer', component: EditofferComponent, canActivate: [AuthGuard] },
  { path: 'detailoffer', component: DetailofferComponent, canActivate: [AuthGuard] },
  { path: 'alloffers', component: AlloffersComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];
