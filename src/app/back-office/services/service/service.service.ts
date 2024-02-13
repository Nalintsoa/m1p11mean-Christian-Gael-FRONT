import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IService } from '../../interfaces/serviceInterface';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoading = false;
  constructor(private http: HttpClient) { }

  addService(data: IService) {
    const response = this.http.post("http://localhost:8081/service/", data)
    return response;
  }

  getServices() {
    this.isLoading = true;
    const response = this.http.get<IService[]>("http://localhost:8081/service/").pipe(finalize(() => this.isLoading = false));
    return response;
  }


}
