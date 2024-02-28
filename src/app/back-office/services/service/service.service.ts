import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilterService, IService } from '../../interfaces/serviceInterface';
import { finalize } from 'rxjs';
import { API_URL } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoading = false;
  constructor(private http: HttpClient) { }
  baseUri: string = `${API_URL}/service/`;

  addService(data: IService) {
    const observable = this.http.post(this.baseUri, data)
    return observable;
  }

  getServices(filter?: IFilterService) {
    const data = filter ?? {};
    this.isLoading = true;
    const observable = this.http.get<IService[]>(this.baseUri, data).pipe(finalize(() => this.isLoading = false));
    return observable;
  }

  updateService(data: IService) {
    const observable = this.http.patch(this.baseUri, data)
    return observable;
  }

  getOneService(data: string) {
    const observable = this.http.get<IService>(`${this.baseUri}one/${data}`);
    return observable;
  }

  getNotificationOffer() {
    const observable = this.http.get(`${this.baseUri}notifOffre`);
    return observable;
  }

  deleteService(data: string) {
    const observable = this.http.post(`${this.baseUri}/delete`, { _id: data });
    return observable
  }




}
