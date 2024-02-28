import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(data: FormData) {
    const response = this.http.post(`${API_URL}/upload`, data);
    return response;
  }
}
