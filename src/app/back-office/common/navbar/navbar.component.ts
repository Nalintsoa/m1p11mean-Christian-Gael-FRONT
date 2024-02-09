import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faCalendarDay, faChartLine, faHandsHelping, faHandshake, faList, faUserCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
  PATH_BACKOFFICE = "/back-office";

  employeeMenuList: { label: string, icon: IconDefinition }[] = [
    {label: 'Mon profil', icon: faUserCircle},
    {label: 'Rendez-vous', icon: faCalendarDay},
    {label: 'Tâches', icon: faList},
  ];

  managerMenuList: { label: string, icon: IconDefinition, path: string }[] = [
    {label: 'Personnel', icon: faUserCheck, path: `${this.PATH_BACKOFFICE}/staff`},
    {label: 'Service', icon: faHandshake, path: `${this.PATH_BACKOFFICE}/service`},
    {label: 'Statistique', icon: faChartLine, path: `${this.PATH_BACKOFFICE}/statistic`},
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }
  }

  handleOnClickNavigation = () => {
    console.log('miova anhhh');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }
}
