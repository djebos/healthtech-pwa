import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {MeasurementService} from '../service/MeasurementService';
import {CreateMeasurementRequest} from '../data/CreateMeasurementRequest';
import {MeasurementType} from '../data/MeasurementType';
import {EnumUtils} from '../data/EnumUtils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent implements OnInit {

  measurementTypeSelected;
  measurementCreationComp;

  constructor(private router: Router) {
  }

  onMeasurementTypeSelect(measurementType: string) {
    this.measurementTypeSelected = EnumUtils.toMeasurementType(measurementType);
    this.router.navigate(['/add-measurement/' + measurementType]);
  }

  public onSubmit() {
    this.measurementCreationComp.create();
  }

  onActivate(componentRef) {
    this.measurementCreationComp = componentRef;
  }

  ngOnInit(): void {
    this.onMeasurementTypeSelect('pulse');
  }
}
