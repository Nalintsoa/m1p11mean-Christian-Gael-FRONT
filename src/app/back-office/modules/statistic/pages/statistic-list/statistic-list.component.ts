import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { StatisticStaffComponent } from '../statistic-staff/statistic-staff.component';

@Component({
  selector: 'app-statistic-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    StatisticStaffComponent
  ],
  templateUrl: './statistic-list.component.html',
  styleUrl: './statistic-list.component.scss'
})
export class StatisticListComponent {
  pathsArray: INavigationItem[] = [
    {
      label: 'Statistiques',
      path: `${PATH_BACKOFFICE}/statistic`,
    },
    {
      label: 'Liste',
    },
  ];

}
