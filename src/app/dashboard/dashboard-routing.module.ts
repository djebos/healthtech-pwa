import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationGuard} from '../login/guard/authorization.guard';
import {AuthGuard} from '../login/guard/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';
import {GlucoseComponent} from './add-measurement/glucose/glucose.component';
import {PulseComponent} from './add-measurement/pulse/pulse.component';
import {PressureComponent} from './add-measurement/pressure/pressure.component';
import {WeightComponent} from './add-measurement/weight/weight.component';
import {TempComponent} from './add-measurement/temp/temp.component';

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
    data: {roles: ['USER']},
    children: [
      {path: 'pulse', component: PulseComponent},
      {path: 'pressure', component: PressureComponent},
      {path: 'weight', component: WeightComponent},
      {path: 'glucose', component: GlucoseComponent},
      {path: 'temp', component: TempComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
