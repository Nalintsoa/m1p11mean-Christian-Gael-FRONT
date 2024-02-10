import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [BreadcrumbComponent, FontAwesomeModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {
  faPlus = faPlus
  pathsArray: INavigationItem[] = [
    {
      label: 'Service',
      path: `${PATH_BACKOFFICE}/service`
    },
    {
      label: 'Liste',
    }
  ];

  handleClickRow = () => {
    console.log('click');
  }
}
