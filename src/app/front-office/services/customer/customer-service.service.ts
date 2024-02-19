import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  baseUri: string = 'http://localhost:8000/customer';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  TOKEN_KEY = "client_token";

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}`, data);
  }

  customerLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}/login`, data, {withCredentials: true, headers: this.headers});
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
}
