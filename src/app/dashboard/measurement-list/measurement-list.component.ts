import {Component, HostListener, OnInit} from '@angular/core';
import {MeasurementService} from '../service/MeasurementService';
import {MeasurementsByDate} from '../data/MeasurementsByDate';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  loadedPage = 0;
  measurements: MeasurementsByDate[] = [];
  isLoading = false;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.measurementService.getMeasurementEntries(this.loadedPage)
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
    // do tracking
    console.log('scrolled', event.target.scrollTop);
    // Listen to click events in the component
    const tracker = event.target;

    const limit = tracker.scrollHeight - tracker.clientHeight;
    console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      this.loadedPage++;
      this.isLoading = true;
      this.measurementService.getMeasurementEntries(this.loadedPage)
        .subscribe(newMeasurements => this.pushNewMeasurements(newMeasurements), this.cancelLoading());
    }
  }
}
