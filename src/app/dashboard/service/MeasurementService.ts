import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MeasurementsByDate} from '../data/MeasurementsByDate';
import {MeasurementEntry} from '../data/MeasurementEntry';
import {MeasurementType} from '../data/MeasurementType';
import {MeasurementUnit} from '../data/MeasurementUnit';
import {CreatePulseRequest} from '../data/CreatePulseRequest';
import {CreatePressureRequest} from '../data/CreatePressureRequest';
import {CreateTempRequest} from '../data/CreateTempRequest';
import {CreateWeightRequest} from '../data/CreateWeightRequest';
import {CreateGlucoseRequest} from '../data/CreateGlucoseRequest';
import {DatePipe} from '@angular/common';
import {HttpParamEncoder} from '../../shared/modules/default/http-param-encoder';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  public static readonly measurementTypeToUnitMapping: Map<MeasurementType, MeasurementUnit> = new Map<MeasurementType, MeasurementUnit>(
    [[MeasurementType.WEIGHT, MeasurementUnit.KILOGRAM], [MeasurementType.GLUCOSE, MeasurementUnit.MMOL_PER_LITRE],
      [MeasurementType.PULSE, MeasurementUnit.BEATS_PER_MINUTE], [MeasurementType.TEMPERATURE, MeasurementUnit.CELSIUS_DEGREES],
      [MeasurementType.PRESSURE, MeasurementUnit.MERCURY_MM]]
  );

  private readonly measurementEntriesResourcePath = '/v1/measurements';

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  public getMeasurementEntries(pageToLoad: number): Observable<MeasurementsByDate[]> {
    const params = new HttpParams({
      fromObject: {
        page: pageToLoad.toString(),
      }
    });
    return this.http.get<MeasurementsByDate[]>(environment.apiUrl + this.measurementEntriesResourcePath, {params});
  }

  public getMeasurementEntriesInTimeRange(start: Date, end: Date): Observable<MeasurementEntry[]> {
    console.log('start: ' + start);
    console.log('end: ' + end);
    const params = new HttpParams({
      fromObject: {
        start: this.datePipe.transform(start, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ'),
        end: this.datePipe.transform(end, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
      },
      encoder: new HttpParamEncoder()
    });
    return this.http.get<MeasurementEntry[]>(environment.apiUrl + '/v1/measurements', {params});
  }

  public createPulse(newPulse: CreatePulseRequest): Observable<MeasurementEntry> {
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath + '/pulse', newPulse);
  }

  public createPressure(newPressure: CreatePressureRequest): Observable<MeasurementEntry> {
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath + '/pressure', newPressure);
  }

  public createTemp(newTemp: CreateTempRequest): Observable<MeasurementEntry> {
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath + '/temp', newTemp);
  }

  public createWeight(newWeight: CreateWeightRequest): Observable<MeasurementEntry> {
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath + '/weight', newWeight);
  }

  public createGlucose(newGlucose: CreateGlucoseRequest): Observable<MeasurementEntry> {
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath + '/glucose', newGlucose);
  }

  public getUnitForType(type: MeasurementType): MeasurementUnit {
    return MeasurementService.measurementTypeToUnitMapping.get(type);
  }
}
