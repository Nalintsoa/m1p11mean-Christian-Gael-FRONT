import { CommonModule } from '@angular/common';
import { Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faCalendarDay, faChartLine, faHandshake, faList, faUserCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { PATH_BACKOFFICE } from '../../routes/back-office-route';
import { INavigationItem } from '../../interfaces/breadCrumbInterfaces';
import { AuthApiService } from '../../service/auth-api.service';

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
  
  constructor(private authService: AuthApiService, private router: Router) {}

  employeeMenuList: { label: string, icon: IconDefinition, path: string }[] = [
    {label: 'Mon profil', icon: faUserCircle, path: `${PATH_BACKOFFICE}/profile`},
    {label: 'Rendez-vous', icon: faCalendarDay, path: `${PATH_BACKOFFICE}/planning`},
    {label: 'Tâches', icon: faList, path:`${PATH_BACKOFFICE}/task`},
  ];

  managerMenuList: { label: string, icon: IconDefinition, path: string }[] = [
    {label: 'Personnel', icon: faUserCheck, path: `${PATH_BACKOFFICE}/staff`},
    {label: 'Service', icon: faHandshake, path: `${PATH_BACKOFFICE}/service`},
    {label: 'Statistique', icon: faChartLine, path: `${PATH_BACKOFFICE}/statistic`},
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }

    this.checkTokenExpiration();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  private checkTokenExpiration() {
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/backoffice']);
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
