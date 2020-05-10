import {Component, OnInit} from '@angular/core';
import {MeasurementService} from '../service/MeasurementService';
import {MeasurementEntry} from '../data/MeasurementEntry';
import {FormControl, FormGroup} from '@angular/forms';
import {EnumUtils} from '../data/EnumUtils';
import {MeasurementType} from '../data/MeasurementType';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-measurement-chart',
  templateUrl: './measurement-chart.component.html',
  styleUrls: ['./measurement-chart.component.css']
})
export class MeasurementChartComponent implements OnInit {

  measurements: MeasurementEntry[] = [];
  measurementTypeSelected: MeasurementType;
  public options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0
        }
      }]
  }};
  public labels = [];
  public chartType = 'line';
  public legend = true;
  public data = [];
  chartPeriodForm: FormGroup = new FormGroup({
    chartPeriod: new FormControl('Month')
  });

  constructor(private measurementService: MeasurementService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.loadMeasurements();
    this.measurementTypeSelected = MeasurementType.PULSE;
  }

  onMeasurementTypeSelect(measurementType: string) {
    this.measurementTypeSelected = EnumUtils.toMeasurementType(measurementType);
    this.loadMeasurements();
  }

  loadMeasurements() {
    const startDate = new Date();
    const endDate = new Date();
    if (this.chartPeriodForm.get('chartPeriod').value === 'Month') {
      startDate.setDate(endDate.getDate() - 30);
    } else if (this.chartPeriodForm.get('chartPeriod').value === 'Week') {
      startDate.setDate(endDate.getDate() - 7);
    } else if (this.chartPeriodForm.get('chartPeriod').value === 'Year') {
      startDate.setDate(endDate.getDate() - 365);
    }
    this.measurementService.getMeasurementEntriesInTimeRange(startDate, endDate)
      .subscribe(measurements => {
        this.measurements = measurements.filter(measurement => this.measurementTypeSelected === EnumUtils.toMeasurementType(measurement.type));
        this.labels = this.measurements.map(measurement => this.datePipe.transform(measurement.created, 'MM-dd'));
        if (this.measurementTypeSelected === MeasurementType.PRESSURE) {
          this.data = [{
            data: this.measurements.map(measurement => Number.parseFloat(measurement.value.substring(0, measurement.value.indexOf('/')))),
            label: 'systolic, ' + MeasurementService.measurementTypeToUnitMapping.get(MeasurementType.PRESSURE),
            fill: 'false',
            lineTension: 0
          },
            {
              data: this.measurements
                .map(measurement => Number.parseFloat(measurement.value.substring(measurement.value.indexOf('/') + 1))),
              label: 'diastolic, ' + MeasurementService.measurementTypeToUnitMapping.get(MeasurementType.PRESSURE),
              fill: 'false',
              lineTension: 0
            }
          ];
        } else {
          this.data = [{
            data: this.measurements.map(measurement => Number.parseFloat(measurement.value)),
            label: this.measurementTypeSelected + ', ' + MeasurementService.measurementTypeToUnitMapping.get(this.measurementTypeSelected),
            fill: 'false',
            lineTension: 0
          }];
        }
      });
  }
}
