import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilterService, IService } from '../../interfaces/serviceInterface';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoading = false;
  constructor(private http: HttpClient) { }
  baseUri: string = 'http://localhost:8000/service/';

  addService(data: IService) {
    const response = this.http.post(this.baseUri, data)
    return response;
  }

  getServices(filter?: IFilterService) {
    const data = filter ?? {};
    this.isLoading = true;
    const response = this.http.get<IService[]>(this.baseUri, data).pipe(finalize(() => this.isLoading = false));
    return response;
  }

  updateService(data: IService) {
    const response = this.http.patch(this.baseUri, data)
    return response;
  }

  getOneService(data: string) {
    const response = this.http.get<IService>(`${this.baseUri}${data}`);
    return response;
  }





}
