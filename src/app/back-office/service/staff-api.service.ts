import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffApiService {
  constructor(private http: HttpClient) { }
  baseUri: string = 'http://localhost:8000/staff';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private _refreshRequired = new Subject<void>();

  get RefreshRequired(){
    return this._refreshRequired;
  }

  createStaff(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}`, data).pipe(
      tap(() => {
        this._refreshRequired.next();
      })
    );
  }

  getStaffList() {
    return this.http.get(`${this.baseUri}`);
  }

  updateStaff(data: any): Observable<any> {
    return this.http.patch(`${this.baseUri}`, data).pipe(
      tap(() => {
        this._refreshRequired.next();
      })
    );
  }

  deleteStaff(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}/delete`, data).pipe(
      tap(() => {
        this._refreshRequired.next();
      })
    );
  }

  getStaff(id: any): Observable<any> {
    return this.http.get(`${this.baseUri}/${id}`);
  }

  getStaffBySpeciality(speciality: string): Observable<any> {
    return this.http.post(`${this.baseUri}/getStaffBySpeciality`, {speciality});
  }
}
