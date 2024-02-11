import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffApiService {
  constructor(private http: HttpClient) { }
  baseUri: string = 'http://localhost:8000/staff';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  createStaff(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}`, data)
  }
}
