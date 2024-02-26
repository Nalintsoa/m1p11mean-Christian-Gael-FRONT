import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUri = "http://localhost:8000/stats"
  constructor(private http: HttpClient) { }

  isLoading: boolean = false

  getAverageStaff(data: any) {
    const observable = this.http.get(`${this.baseUri}/statStaff`, { params: data });
    return observable;

  }

  getStatBusiness(data: any) {
    this.isLoading = true;
    const observable = this.http.get(`${this.baseUri}/statBusiness`, { params: data });
    return observable;

  }
}
