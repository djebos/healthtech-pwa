import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {
    MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule, MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {DefaultModule} from '../shared/modules/default/default.module';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PulseComponent } from './add-measurement/pulse/pulse.component';
import { WeightComponent } from './add-measurement/weight/weight.component';
import { GlucoseComponent } from './add-measurement/glucose/glucose.component';
import { TempComponent } from './add-measurement/temp/temp.component';
import { PressureComponent } from './add-measurement/pressure/pressure.component';
import { RecommendationListComponent } from './recommendations/recommendation-list/recommendation-list.component';
import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
import { ReminderListComponent } from './reminders/reminder-list/reminder-list.component';
import { AddReminderComponent } from './reminders/add-reminder/add-reminder.component';
import { RemindersRootComponent } from './reminders/reminders-root/reminders-root.component';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import { RecommendationPopupComponent } from './recommendations/recommendation-popup/recommendation-popup.component';
import { MeasurementChartComponent } from './measurement-chart/measurement-chart.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [DashboardComponent, MeasurementListComponent, AddMeasurementComponent, PulseComponent, WeightComponent, GlucoseComponent, TempComponent, PressureComponent, RecommendationListComponent, ProfileSettingsComponent, ReminderListComponent, AddReminderComponent, RemindersRootComponent, RecommendationPopupComponent, MeasurementChartComponent],
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
        ReactiveFormsModule,
        MatSelectModule,
        OwlDateTimeModule,
        MatCheckboxModule,
        FormsModule,
        MatToolbarModule,
        MatDialogModule,
        ChartsModule,
        MatButtonToggleModule
    ],
  entryComponents: [
    RecommendationPopupComponent
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
