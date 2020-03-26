import {Component, HostListener, OnInit} from '@angular/core';
import {MeasurementEntry} from './data/MeasurementEntry';
import {MeasurementService} from './service/MeasurementService';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  loadedPage = 0;
  measurements: MeasurementEntry[] = [];
  isLoading = false;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.measurementService.getMeasurementEntries(this.loadedPage)
      .subscribe(this.pushNewMeasurements(), this.cancelLoading());
  }

  private cancelLoading() {
    return error => {
      this.loadedPage--;
      this.isLoading = false;
    };
  }

  private pushNewMeasurements() {
    return next => {
      console.log(...next)
      this.measurements.push(...next);
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
      this.loadedPage++;
      this.isLoading = true;
      this.measurementService.getMeasurementEntries(this.loadedPage)
        .subscribe(this.pushNewMeasurements(), this.cancelLoading());
    }
  }
}
