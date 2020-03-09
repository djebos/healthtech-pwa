import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MeasurementService} from '../measurement-list/service/MeasurementService';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent implements OnInit {
  measurementForm = new FormGroup({
    time: new FormControl(new Date()),
    value: new FormControl(''),
  });
  measurementTypeSelected = 'pulse';

  @ViewChildren('measurementType') measurementTypes: QueryList<ElementRef>;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
  }

  onMeasurementTypeSelect(event: MouseEvent, measurementType: string) {
    this.measurementTypeSelected = measurementType;
    const selectedMesurementType = this.measurementTypes.toArray()
      .find(value => value.nativeElement.getAttribute('data-measurement-type') === this.measurementTypeSelected);
    const notSelectedMeasurementTypes: ElementRef[] = this.measurementTypes.toArray()
      .filter(value => value.nativeElement.getAttribute('data-measurement-type') !== this.measurementTypeSelected);
    selectedMesurementType.nativeElement.classList.add('measurement-type-selected');
    selectedMesurementType.nativeElement.classList.remove('measurement-type-not-selected');
    selectedMesurementType.nativeElement.getElementsByClassName('material-icons').item(0).classList.add('measurement-type-icon-enabled');
    selectedMesurementType.nativeElement.getElementsByClassName('material-icons').item(0).classList.remove('measurement-type-icon-disabled');
    notSelectedMeasurementTypes.forEach(value => {
      value.nativeElement.classList.add('measurement-type-not-selected');
      value.nativeElement.classList.remove('measurement-type-selected');
      value.nativeElement.getElementsByClassName('material-icons').item(0).classList.remove('measurement-type-icon-enabled');
      value.nativeElement.getElementsByClassName('material-icons').item(0).classList.add('measurement-type-icon-disabled');
    });
  }

  public onSubmit() {
    this.measurementService.createMeasurement({
      type: this.measurementTypeSelected.toUpperCase(),
      value: this.measurementForm.get('value').value
    }).subscribe(next => console.log(next));
  }
}
