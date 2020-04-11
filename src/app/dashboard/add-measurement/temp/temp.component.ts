import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MeasurementService} from '../../service/MeasurementService';
import {MeasurementType} from '../../data/MeasurementType';
import {CreateTempRequest} from '../../data/CreateTempRequest';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  private durationInSeconds = 3;
  temperatureForm = new FormGroup({
    value: new FormControl('', {validators: [Validators.required, Validators.min(34), Validators.max(43)]}),
  } );
  constructor(private snackBar: MatSnackBar, private measurementService: MeasurementService) { }

  ngOnInit() {
  }

  public create() {
    const newTemp = new CreateTempRequest(this.temperatureForm.get('value').value, this.getUnitForMeasurementType());
    this.measurementService.createTemp(newTemp).subscribe(next => this.snackBar.open('New temp added', 'close', {
      duration: this.durationInSeconds * 1000
    }), error => this.snackBar.open('Failed to create new temp: ' + error.message, '', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snackbar-error'
    }));
  }

  getUnitForMeasurementType() {
    return this.measurementService.getUnitForType(MeasurementType.TEMPERATURE);
  }

  isValid() {
    return this.temperatureForm.valid;
  }

}
