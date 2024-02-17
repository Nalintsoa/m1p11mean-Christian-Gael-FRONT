import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(data: FormData) {
    const response = this.http.post("http://localhost:8081/upload", data);
    return response;
  }
}
