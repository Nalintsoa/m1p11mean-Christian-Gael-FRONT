import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { CommonListComponent } from '../../../../common/common-list/common-list.component';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FontAwesomeModule,
    DataTablesModule,
    CommonModule,
    CommonListComponent
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  faPlus = faPlus;
  dtOptions: DataTables.Settings = {};

  pathsArray: INavigationItem[] = [
    {
      label: 'Service',
      path: `${PATH_BACKOFFICE}/service`,
    },
    {
      label: 'Liste',
    },
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
