import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  baseUri: string = 'http://localhost:8000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  staffLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUri}/staffLogin`, data, {withCredentials: true,  headers: this.headers})
  }

  private TOKEN_KEY= 'jwt_token';

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
