import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  basUri = "http://localhost:8000/rdv/";
  isLoading = false;

  private _refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  checkDisponibility(data: any) {
    const observable = this.http.get(`${this.basUri}checkDispo`, { params: data });
    return observable;

  }

  addRdv(data: any) {
    this.isLoading = true;
    const observable = this.http.post(this.basUri, data);
    return observable;
  }

  getHistory() {
    const observable = this.http.get(`${this.basUri}getHisto`);
    return observable;
  }

  payRdv(data: any) {
    const observable = this.http.patch(`${this.basUri}/pay`, data).pipe(tap(() => { this._refreshRequired.next() }));
    return observable;
  }
}
