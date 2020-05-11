import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {ProfileSettingsComponent} from './settings/profile-settings/profile-settings.component';
import {RecommendationListComponent} from './recommendations/recommendation-list/recommendation-list.component';
import {ReminderListComponent} from './reminders/reminder-list/reminder-list.component';
import {AddReminderComponent} from './reminders/add-reminder/add-reminder.component';
import {RemindersRootComponent} from './reminders/reminders-root/reminders-root.component';
import {MeasurementChartComponent} from './measurement-chart/measurement-chart.component';
import {UpdateProfileComponent} from './settings/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']}
  },
  {
    path: 'measurements',
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
      {path: '', redirectTo: 'pulse', pathMatch: 'full'},
      {path: 'pulse', component: PulseComponent},
      {path: 'pressure', component: PressureComponent},
      {path: 'weight', component: WeightComponent},
      {path: 'glucose', component: GlucoseComponent},
      {path: 'temp', component: TempComponent}
    ]
  },
  {
    path: 'chart',
    component: MeasurementChartComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']}
  },
  {
    path: 'reminders',
    component: RemindersRootComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']},
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: ReminderListComponent},
      {path: 'add-reminder', component: AddReminderComponent}
    ]
  },
  {
    path: 'settings',
    component: ProfileSettingsComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']},
  },
  {
    path: 'settings/update',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {roles: ['USER']},
  },
  {
    path: 'recommendations',
    component: RecommendationListComponent,
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
