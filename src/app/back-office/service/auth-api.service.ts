import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }
  baseUri: string = 'http://localhost:8000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  staffLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}/staffLogin`, data, {withCredentials: true,  headers: this.headers})
  }

  private TOKEN_KEY= (this.router.url.includes("backoffice") || this.router.url.includes("back-office")) ? 'jwt_token' : 'client_token' ;

  getToken(): string | any {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  setToken(token: string) {
    this.cookieService.set(this.TOKEN_KEY, token, {expires: 2} )
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    }

    return true;
  }

  logout(): Observable<any> {
    this.signOut()
    return this.http.post(`${this.baseUri}/staffLogout`, {}, { withCredentials: true, headers: this.headers });
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getTokenInSession(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

}
