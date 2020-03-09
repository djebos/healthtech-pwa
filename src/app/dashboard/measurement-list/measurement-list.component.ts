import {Component, HostListener, OnInit} from '@angular/core';
import {MeasurementEntry} from './data/MeasurementEntry';
import {MeasurementService} from './service/MeasurementService';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  pageToLoad = 0;
  measurements: MeasurementEntry[] = [];
  isLoading = false;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.measurementService.getMeasurementEntries(this.pageToLoad)
      .subscribe(this.pushNewMeasurements(), this.cancelLoading());
  }

  private cancelLoading() {
    return error => {
      this.pageToLoad--;
      this.isLoading = false;
    };
  }

  private pushNewMeasurements() {
    return next => {
      console.log(...next)
      this.measurements.push(...next);
      this.pageToLoad++;
      this.isLoading = false;
    };
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
      this.isLoading = true;
      this.measurementService.getMeasurementEntries(this.pageToLoad)
        .subscribe(this.pushNewMeasurements(), this.cancelLoading());
    }
  }
}
