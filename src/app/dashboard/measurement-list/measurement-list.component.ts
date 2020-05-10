import {Component, HostListener, OnInit} from '@angular/core';
import {MeasurementService} from '../service/MeasurementService';
import {MeasurementsByDate} from '../data/MeasurementsByDate';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  loadedPage = 0;
  measurements: MeasurementsByDate[] = [];
  isLoading = false;
  types = ['all'];

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.measurementService.getMeasurementEntries(this.types, this.loadedPage)
      .subscribe(next => this.pushNewMeasurements(next), this.cancelLoading());
  }

  private cancelLoading() {
    return error => {
      this.loadedPage--;
      this.isLoading = false;
    };
  }

  private pushNewMeasurements(newMeasurements: MeasurementsByDate[]) {
    console.log(newMeasurements);
    newMeasurements.forEach(newMeasurementsByDate => {
      const measurementsToMerge = this.measurements.find(measurementsByDate => measurementsByDate.date === newMeasurementsByDate.date);
      if (measurementsToMerge) {
        measurementsToMerge.measurements.push(...newMeasurementsByDate.measurements);
      } else {
        this.measurements.push(newMeasurementsByDate);
      }
    });
    this.isLoading = false;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {

    const tracker = event.target;

    const limit = tracker.scrollHeight - tracker.clientHeight;
    console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      this.loadedPage++;
      this.isLoading = true;

    }
  }

  loadMeasurements() {
    this.measurementService.getMeasurementEntries(this.types, this.loadedPage)
      .subscribe(newMeasurements => this.pushNewMeasurements(newMeasurements), this.cancelLoading());
  }

  onMeasurementTypeChange(event: MatButtonToggleChange) {
    console.log('current types: ', this.types);
    if (this.types.length === 0 || event.source.value === 'all') {
      console.log('no types selected, resetting to all');
      this.types = ['all'];
    } else if (this.types.length > 1 && this.types.includes('all')) {
      const selectedTypes: string[] = [...this.types];
      console.log('selected ' + selectedTypes + ' ');
      const withoutAll: string[] = selectedTypes.splice(selectedTypes.indexOf('all') - 1, 1);
      console.log('without all: ' + selectedTypes + ' ');
      this.types = withoutAll;
    }
    this.measurementService.getMeasurementEntries(this.types, this.loadedPage)
      .subscribe(newMeasurements => {
        this.measurements = newMeasurements;
        this.isLoading = false;
      }, error => this.isLoading = false);
  }
}
