import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MeasurementsByDate} from '../data/MeasurementsByDate';
import {CreateMeasurementRequest} from '../data/CreateMeasurementRequest';
import {MeasurementEntry} from '../data/MeasurementEntry';
import {MeasurementType} from '../data/MeasurementType';
import {MeasurementUnit} from '../data/MeasurementUnit';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private readonly measurementTypeToUnitMapping: Map<MeasurementType, MeasurementUnit> = new Map<MeasurementType, MeasurementUnit>(
    [[MeasurementType.WEIGHT, MeasurementUnit.KILOGRAM], [MeasurementType.GLUCOSE, MeasurementUnit.MMOL_PER_LITRE],
      [MeasurementType.PULSE, MeasurementUnit.BEATS_PER_MINUTE], [MeasurementType.TEMPERATURE, MeasurementUnit.CELSIUS_DEGREES],
      [MeasurementType.PRESSURE, MeasurementUnit.MERCURY_MM]]
  );

  private readonly measurementEntriesResourcePath = '/v1/measurement-entries';

  constructor(private http: HttpClient) {
  }

  public getMeasurementEntries(pageToLoad: number): Observable<MeasurementsByDate[]> {
    const params = new HttpParams({
      fromObject: {
        page: pageToLoad.toString(),
      }
    });
    return this.http.get<MeasurementsByDate[]>(environment.apiUrl + this.measurementEntriesResourcePath, {params});
  }

  public createMeasurement(newMeasurement: CreateMeasurementRequest): Observable<MeasurementEntry> {
    console.log('create body {}', newMeasurement);
    return this.http.post<MeasurementEntry>(environment.apiUrl + this.measurementEntriesResourcePath, newMeasurement);
  }

  public getUnitForType(type: MeasurementType): MeasurementUnit {
    return this.measurementTypeToUnitMapping.get(type);
  }
}
