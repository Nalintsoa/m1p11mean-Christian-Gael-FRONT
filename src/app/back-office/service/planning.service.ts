import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StringDecoder } from 'string_decoder';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  basUri = "http://localhost:8000/rdv/";

  constructor(private http: HttpClient) { }

  planningPerMonth(year: string, month: string | number, staff: StringDecoder): Observable<any> {
    return this.http.get(`${this.basUri}/planningPerMonth?year=${year}&month=${month}&staff=${staff}`);
  }

  getTasksDay(date: string) {
    return this.http.get(`${this.basUri}/taskDay?date=${date}`)
  }
}
