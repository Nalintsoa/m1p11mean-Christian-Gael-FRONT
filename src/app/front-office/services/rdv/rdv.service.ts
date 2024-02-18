import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  basUri = "http://localhost:8000/rdv/";
  isLoading = false;

  constructor(private http: HttpClient) { }

  checkDisponibility(data: any) {
    const response = this.http.get(`${this.basUri}checkDispo`, { params: data });
    return response;

  }

  addRdv(data: any) {
    this.isLoading = true;
    const response = this.http.post(this.basUri, data);
    return response;
  }

  getHistory() {
    const response = this.http.get(`${this.basUri}getHisto`);
    return response;
  }
}
