import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../../service/MeasurementService';
import {MeasurementType} from '../../data/MeasurementType';
import {CreateWeightRequest} from '../../data/CreateWeightRequest';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  private durationInSeconds = 3;
  weightForm = new FormGroup({
    value: new FormControl('', {validators: [Validators.required, Validators.min(10), Validators.max(999)]}),
  } );
  constructor(private snackBar: MatSnackBar, private measurementService: MeasurementService) { }

  ngOnInit() {
  }

  public create() {
    const newWeight = new CreateWeightRequest(this.weightForm.get('value').value, this.getUnitForMeasurementType());
    this.measurementService.createWeight(newWeight).subscribe(next => this.snackBar.open('Created new glucose measurement', 'close', {
      duration: this.durationInSeconds * 1000
    }), error => this.snackBar.open('Failed to create new glucose measurement: ' + error.message, '', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snackbar-error'
    }));
  }

  getUnitForMeasurementType() {
    return this.measurementService.getUnitForType(MeasurementType.WEIGHT);
  }

  isValid() {
    return this.weightForm.valid;
  }
}
