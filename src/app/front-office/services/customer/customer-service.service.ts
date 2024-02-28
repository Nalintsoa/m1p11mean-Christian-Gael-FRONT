import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  baseUri: string = `${API_URL}/customer`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  TOKEN_KEY = "client_token";

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}`, data);
  }

  customerLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}/login`, data, { withCredentials: true, headers: this.headers });
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.baseUri}/${id}`);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | any {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    }

    return true;
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  logout(): Observable<any> {
    this.signOut();
    return this.http.post(`${this.baseUri}/logout`, {}, { withCredentials: true, headers: this.headers });
  }

  addOrRemoveServiceToPreferences(customer: string, service: string): Observable<any> {
    return this.http.post(`${this.baseUri}/addOrRemoveServiceToPreferences`, { customer, service });
  }

  addOrRemoveEmployeeAsFavorite(customer: string, employee?: string): Observable<any> {
    return this.http.post(`${this.baseUri}/addOrRemoveEmployeeAsFavorite`, { customer, employee });
  }

  getFavoriteEmployees(customer: string): Observable<any> {
    return this.http.get(`${this.baseUri}/getFavoriteEmployees/${customer}`);
  }

  forgetPassword(customerEmail: string): Observable<any> {
    return this.http.post(`${this.baseUri}/forgetPassword`, { customerEmail });
  }

  checkTemporaryPassword(customerEmail: string, temporaryPassword: string): Observable<any> {
    return this.http.post(`${this.baseUri}/checkTemporaryPassword`, { customerEmail, temporaryPassword });
  }

  updateCustomerPassword(customerEmail: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUri}/updatePassword`, { customerEmail, password });
  }
}
