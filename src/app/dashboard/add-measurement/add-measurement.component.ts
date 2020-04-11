import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {MeasurementService} from '../service/MeasurementService';
import {CreateMeasurementRequest} from '../data/CreateMeasurementRequest';
import {MeasurementType} from '../data/MeasurementType';
import {EnumUtils} from '../data/EnumUtils';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent {
  measurementForm = new FormGroup({
    value: new FormControl('', {validators: [(control: AbstractControl): { [key: string]: any } | null => this.patternByTypeValidator(control)]}),
  } );

  measurementTypeSelected = MeasurementType.PULSE;

  constructor(private measurementService: MeasurementService) {
  }

  onMeasurementTypeSelect(measurementType: string) {
    this.measurementTypeSelected = EnumUtils.toMeasurementType(measurementType);
  }

  public onSubmit() {
    const measurementToCreate = new CreateMeasurementRequest(this.measurementForm.get('value').value,
      this.getUnitForSelectedMeasurementType(), this.measurementTypeSelected);
    this.measurementService.createMeasurement(measurementToCreate).subscribe(next => console.log(next));
  }

  public getUnitForSelectedMeasurementType() {
    return this.measurementService.getUnitForType(this.measurementTypeSelected);
  }

  public patternByTypeValidator(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value;
    if (this.measurementTypeSelected === MeasurementType.PULSE) {
      if (!/^\d{2,3}$/.test(val)) {
        console.log('invalid pulse');
        return {pattern: 'pattern'};
      }
    }
    return null;
  }
}
