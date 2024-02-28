import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StringDecoder } from 'string_decoder';
import { API_URL } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  basUri = `${API_URL}/rdv/`;

  constructor(private http: HttpClient) { }

  planningPerMonth(year: string, month: string | number, staff: StringDecoder): Observable<any> {
    return this.http.get(`${this.basUri}/planningPerMonth?year=${year}&month=${month}&staff=${staff}`);
  }

  getTasksDay(date: string) {
    return this.http.get(`${this.basUri}/taskDay?date=${date}`)
  }

  getRdvById = (rdv: string): Observable<any> => {
    return this.http.get(`${this.basUri}&id=${rdv}`);
  }

  sendAlertRdvMail = (rdv: string): Observable<any> => {
    return this.http.post(`${this.basUri}sendAlertRdvMail`, { id: rdv });
  }
}
