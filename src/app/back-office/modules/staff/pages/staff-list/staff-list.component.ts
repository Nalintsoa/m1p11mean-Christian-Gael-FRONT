import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../common/navbar/navbar.component';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent {
  pathsArray: INavigationItem[] = [
    {
      label: 'Gestion de personnel',
      path: `${PATH_BACKOFFICE}/staff`
    },
    {
      label: 'Liste',
    }
  ]
}
