import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): boolean {
    const token = this.cookieService.get('client_token');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        this.router.navigate(['/frontoffice']);
        return false;
      }
    } else {
      this.router.navigate(['/frontoffice']);
      return false;
    }

    return true;
  }
}