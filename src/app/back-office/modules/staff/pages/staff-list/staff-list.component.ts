import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../common/navbar/navbar.component';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { CommonListComponent } from '../../../../common/common-list/common-list.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, CommonListComponent, CreateModalComponent],
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
  ];

  arrayData = [
    { id: 1, firstName: 'Foo', lastName: 'Bar' },
    { id: 2, firstName: 'Someone', lastName: 'Youknow' },
    { id: 3, firstName: 'Iamout', lastName: 'Ofinspiration' },
    { id: 4, firstName: 'Yoda', lastName: 'Skywalker' },
    { id: 5, firstName: 'Patrick', lastName: 'Dupont' },
    { id: 6, firstName: 'Barack', lastName: 'Obama' },
    { id: 7, firstName: 'François', lastName: 'Holland' },
    { id: 8, firstName: 'Michel', lastName: 'Popo' },
    { id: 9, firstName: 'Chuck', lastName: 'Norris' },
    { id: 10, firstName: 'Simon', lastName: 'Robin' },
    { id: 11, firstName: 'Gael', lastName: 'Rasoa' },
    { id: 12, firstName: 'Naly', lastName: 'Chris' },
  ];

  arrayColumns = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'First name',
      data: 'firstName',
    },
    {
      title: 'Last name',
      data: 'lastName',
    },
  ];
}
