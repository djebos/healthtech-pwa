import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../../service/MeasurementService';
import {MeasurementType} from '../../data/MeasurementType';
import {CreateGlucoseRequest} from '../../data/CreateGlucoseRequest';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-glucose',
  templateUrl: './glucose.component.html',
  styleUrls: ['./glucose.component.css']
})
export class GlucoseComponent implements OnInit {
  private durationInSeconds = 3;
  glucoseForm = new FormGroup({
    value: new FormControl('', {validators: [Validators.required, Validators.min(1), Validators.max(100)]}),
  });

  constructor(private snackBar: MatSnackBar, private measurementService: MeasurementService) {
  }

  ngOnInit() {
  }

  public create() {
    const newGlucose = new CreateGlucoseRequest(this.glucoseForm.get('value').value, this.getUnitForMeasurementType());
    this.measurementService.createGlucose(newGlucose).subscribe(next => this.snackBar.open('Created new glucose measurement', 'close', {
      duration: this.durationInSeconds * 1000
    }), error => this.snackBar.open('Failed to create new glucose measurement: ' + error.message, '', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snackbar-error'
    }));
  }

  getUnitForMeasurementType() {
    return this.measurementService.getUnitForType(MeasurementType.GLUCOSE);
  }

  isValid() {
    return this.glucoseForm.valid;
  }
}
