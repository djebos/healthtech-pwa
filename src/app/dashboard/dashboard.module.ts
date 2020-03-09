import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MeasurementListComponent} from './measurement-list/measurement-list.component';
import {AddPulseComponent} from './add-pulse/add-pulse.component';
import {DefaultModule} from '../shared/modules/default/default.module';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, MeasurementListComponent, AddPulseComponent, AddMeasurementComponent],
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
