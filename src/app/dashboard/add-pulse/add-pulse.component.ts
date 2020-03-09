import {Component, OnInit} from '@angular/core';
import {MeasurementService} from '../measurement-list/service/MeasurementService';

@Component({
  selector: 'app-add-pulse',
  templateUrl: './add-pulse.component.html',
  styleUrls: ['./add-pulse.component.css']
})
export class AddPulseComponent implements OnInit {

  constructor(private measurementService: MeasurementService) {
}

  ngOnInit() {
  }

}
