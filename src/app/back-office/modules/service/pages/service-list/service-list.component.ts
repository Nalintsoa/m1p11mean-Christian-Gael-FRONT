import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ServiceCreateComponent } from '../service-create/service-create.component';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FontAwesomeModule,
    CommonModule,
    ServiceCreateComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  @ViewChild('openModal') openModal?: ElementRef;

  mode = 'create';
  dataToUpdate?: IService;

  pathsArray: INavigationItem[] = [
    {
      label: 'Service',
      path: `${PATH_BACKOFFICE}/service`,
    },
    {
      label: 'Liste',
    },
  ];

  services: IService[] = []

  constructor(public serviceService: ServiceService) { }

  ngOnInit() {
    this.getServices();
  }

  onCloseModal() {
    this.mode = "create";
  }

  getServices() {
    this.services = [];
    this.serviceService.getServices().subscribe(data => { this.services = data; this.mode = "create" });
  };

  getService(data: IService) {
    this.mode = "update";
    this.dataToUpdate = data;
    this.openModal?.nativeElement.click();
  }

  // TODO: Delete service
}
