import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../../service/MeasurementService';
import {MeasurementType} from '../../data/MeasurementType';
import {CreateGlucoseRequest} from '../../data/CreateGlucoseRequest';
import {CreatePressureRequest} from '../../data/CreatePressureRequest';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {
  private durationInSeconds = 3;
  pressureForm = new FormGroup({
    systolic: new FormControl('', {validators: [Validators.required, Validators.min(10), Validators.max(300)]}),
    diastolic: new FormControl('', {validators: [Validators.required, Validators.min(10), Validators.max(200)]}),
  });

  constructor(private snackBar: MatSnackBar, private measurementService: MeasurementService) {
  }

  ngOnInit() {
  }

  public create() {
    const newPressure = new CreatePressureRequest(this.pressureForm.get('systolic').value, this.pressureForm.get('diastolic').value, this.getUnitForMeasurementType());
    this.measurementService.createPressure(newPressure).subscribe(next => this.snackBar.open('Created new pressure measurement', 'close', {
      duration: this.durationInSeconds * 1000
    }), error => this.snackBar.open('Failed to create new pressure measurement: ' + error.message, '', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snackbar-error'
    }));
  }

  getUnitForMeasurementType() {
    return this.measurementService.getUnitForType(MeasurementType.PRESSURE);
  }

  isValid() {
    return this.pressureForm.valid;
  }
}
