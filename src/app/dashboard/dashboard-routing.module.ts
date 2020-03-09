import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationGuard} from '../login/guard/authorization.guard';
import {AuthGuard} from '../login/guard/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']}
  },
  {
    path: 'measurement-list',
    component: MeasurementListComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']}
  },
  {
    path: 'add-measurement',
    component: AddMeasurementComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
