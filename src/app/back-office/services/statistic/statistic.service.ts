import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUri = `${API_URL}/stats`
  constructor(private http: HttpClient) { }

  isLoading: boolean = false

  getAverageStaff(data: any) {
    const observable = this.http.get(`${this.baseUri}/statStaff`, { params: data });
    return observable;

  }

  getStatBooking(data: any) {
    this.isLoading = true;
    const observable = this.http.get(`${this.baseUri}/statBooking`, { params: data });
    return observable;

  }

  getStatBusiness(data: any) {
    const observable = this.http.get(`${this.baseUri}/statBusiness`, { params: data });
    return observable;

  }

  getStatBenefice(data: any) {
    this.isLoading = true;
    const observable = this.http.get(`${this.baseUri}/statBenefice`, { params: data });
    return observable;

  }
}
