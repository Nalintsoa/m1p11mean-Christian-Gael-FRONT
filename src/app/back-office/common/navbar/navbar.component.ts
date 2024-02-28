import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faCalendarDay, faChartLine, faHandshake, faList, faUserCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { PATH_BACKOFFICE } from '../../routes/back-office-route';
import { AuthApiService } from '../../service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { StaffApiService } from '../../service/staff-api.service';
import { data } from 'jquery';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  faBars = faBars;
  faUserCircle = faUserCircle;
  screenWidth = 0;
  isAdmin = true;

  constructor(private authService: AuthApiService, private router: Router, private staffApiService: StaffApiService) { }

  employeeMenuList: { label: string, icon: IconDefinition, path: string }[] = [
    { label: 'Mon profil', icon: faUserCircle, path: `${PATH_BACKOFFICE}/profile` },
    { label: 'Rendez-vous', icon: faCalendarDay, path: `${PATH_BACKOFFICE}/planning` },
    // { label: 'Tâches', icon: faList, path: `${PATH_BACKOFFICE}/task` },
  ];

  managerMenuList: { label: string, icon: IconDefinition, path: string }[] = [
    { label: 'Personnel', icon: faUserCheck, path: `${PATH_BACKOFFICE}/staff` },
    { label: 'Service', icon: faHandshake, path: `${PATH_BACKOFFICE}/service` },
    { label: 'Statistique', icon: faChartLine, path: `${PATH_BACKOFFICE}/statistic` },
  ];

  menuList: { label: string, icon: IconDefinition, path: string }[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }
    this.getInfoEmployee();
    this.checkTokenExpiration();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  private checkTokenExpiration() {
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/backoffice']);
    } else {
      const token = this.authService.getToken();
      this.authService.saveToken(token);
    }
  }

  getInfoEmployee() {
    const jwt_token = this.authService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.staffApiService.getStaff(decodedToken._id).subscribe((data) => {
          if (data.role === "manager") {
            this.menuList = this.managerMenuList;
          } else {
            this.menuList = this.employeeMenuList;
          }
        })
      }

    }
  }

  handleLogout = () => {
    this.authService.logout().subscribe({
      next: (res) => {
        this.router.navigate(['/backoffice']);
      }
    });
  }
}
