import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Event} from '../data/Event';
import {DatePipe} from '@angular/common';
import {HttpParamEncoder} from '../../../shared/modules/default/http-param-encoder';
import {CreateReminder} from '../data/CreateReminder';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  getReminders(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/v1/reminders', {
      params: new HttpParams({
          fromObject: {
            startDate: this.datePipe.transform(this.getStartTime(), 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ'),
            endDate: this.datePipe.transform(this.getEndTime(), 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')
          },
          encoder: new HttpParamEncoder()
        }
      )
  });
  }

  createReminder(newReminder: CreateReminder): Observable<Event> {
    return this.http.post<Event>(environment.apiUrl + '/v1/reminders', newReminder);
  }

private getEndTime(): Date {
  const current = new Date();
  current.setHours(23, 59, 59, 999);
  return current;
}

private getStartTime(): Date {
  const current = new Date();
  current.setHours(0, 0, 0, 1);
  return current;
}
}
