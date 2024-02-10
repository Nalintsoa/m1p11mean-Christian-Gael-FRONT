import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faHome } from "@fortawesome/free-solid-svg-icons"
import { PATH_BACKOFFICE } from '../../routes/back-office-route';
import { CommonModule } from '@angular/common';
import { INavigationItem } from '../../interfaces/breadCrumbInterfaces';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  faHome = faHome;
  PATH_BACKOFFICE = PATH_BACKOFFICE;

  @Input() pathsArray: INavigationItem[] = [];
}
