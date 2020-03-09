import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {MeasurementEntry} from '../data/MeasurementEntry';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private readonly measurementEntriesResourcePath = '/v1/measurement-entries';
  constructor(private http: HttpClient) {
  }

  public getMeasurementEntries(pageToLoad: number): Observable<MeasurementEntry[]> {
    const params = new HttpParams({
      fromObject: {
        page: pageToLoad.toString(),
      }
    });
    return this.http.get<MeasurementEntry[]>(environment.apiUrl + this.measurementEntriesResourcePath, {params});
  }

  public createMeasurement(body: any): Observable<any> {
    console.log("create body" + body)
    return this.http.post(environment.apiUrl + this.measurementEntriesResourcePath, body);
  }
}
