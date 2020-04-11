import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../../service/MeasurementService';
import {MeasurementType} from '../../data/MeasurementType';
import {CreatePulseRequest} from '../../data/CreatePulseRequest';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html',
  styleUrls: ['./pulse.component.css']
})
export class PulseComponent implements OnInit {
  private durationInSeconds = 3;
  pulseForm = new FormGroup({
    value: new FormControl('', {validators: [Validators.required, Validators.min(10), Validators.max(999)]}),
  });

  constructor(private snackBar: MatSnackBar, private measurementService: MeasurementService) {
  }

  ngOnInit() {
  }

  public create() {
    const newPulse = new CreatePulseRequest(this.pulseForm.get('value').value, this.getUnitForMeasurementType());
    this.measurementService.createPulse(newPulse)
      .subscribe(createdMeasurement => this.snackBar.open('Created new pulse measurement', 'close', {
      duration: this.durationInSeconds * 1000
    }), (error: HttpErrorResponse) =>
      this.snackBar.open('Failed to create new pulse measurement: ' + error.message, '', {
        duration: this.durationInSeconds * 1000,
        panelClass: 'snackbar-error'
      }));
  }

  getUnitForMeasurementType() {
    return this.measurementService.getUnitForType(MeasurementType.PULSE);
  }

  isValid() {
    return this.pulseForm.valid;
  }
}
