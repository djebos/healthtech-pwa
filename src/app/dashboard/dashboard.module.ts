import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {DefaultModule} from '../shared/modules/default/default.module';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PulseComponent } from './add-measurement/pulse/pulse.component';
import { WeightComponent } from './add-measurement/weight/weight.component';
import { GlucoseComponent } from './add-measurement/glucose/glucose.component';
import { TempComponent } from './add-measurement/temp/temp.component';
import { PressureComponent } from './add-measurement/pressure/pressure.component';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
import { RecommendationListComponent } from './recommendations/recommendation-list/recommendation-list.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';


@NgModule({
  declarations: [DashboardComponent, MeasurementListComponent, AddMeasurementComponent, PulseComponent, WeightComponent, GlucoseComponent, TempComponent, PressureComponent, NotificationListComponent, RecommendationListComponent, ProfileSettingsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    DashboardRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    DefaultModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
