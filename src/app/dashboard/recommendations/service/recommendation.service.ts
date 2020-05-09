import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recommendation} from '../data/Recommendation';
import {environment} from '../../../../environments/environment';
import {DatePipe} from '@angular/common';
import {HttpParamEncoder} from '../../../shared/modules/default/http-param-encoder';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getRecommendationsForPeriod(period: string): Observable<Recommendation[]> {
    let params;
    const currentDate: Date = new Date();
    const endDate: Date = new Date();
    if (period === 'Month') {
      endDate.setDate(endDate.getDate() - 30);
    }
    if (period === 'Year') {
      endDate.setDate(endDate.getDate() - 365);
    }
    if (period === 'Week') {
      endDate.setDate(endDate.getDate() - 7);
    }
    params = new HttpParams({
      fromObject: {
        startDate: this.datePipe.transform(endDate, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ'),
        endDate: this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
      },
      encoder: new HttpParamEncoder()
    });
    return this.http.get<Recommendation[]>(environment.apiUrl + '/v1/recommendations', {params}, );
  }
}
