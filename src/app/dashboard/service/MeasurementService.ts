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

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private readonly measurementTypeToUnitMapping: Map<MeasurementType, MeasurementUnit> = new Map<MeasurementType, MeasurementUnit>(
    [[MeasurementType.WEIGHT, MeasurementUnit.KILOGRAM], [MeasurementType.GLUCOSE, MeasurementUnit.MMOL_PER_LITRE],
      [MeasurementType.PULSE, MeasurementUnit.BEATS_PER_MINUTE], [MeasurementType.TEMPERATURE, MeasurementUnit.CELSIUS_DEGREES],
      [MeasurementType.PRESSURE, MeasurementUnit.MERCURY_MM]]
  );

  private readonly measurementEntriesResourcePath = '/v1/measurements';

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
    return this.measurementTypeToUnitMapping.get(type);
  }
}
